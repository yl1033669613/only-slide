<template>
  <div id="app">
    <only-slide :option.sync="slideOption" class="slide-part" style="margin: 0 auto"></only-slide>

    <div class="edit">
      <div class="numb"><span>个数：{{picArr.length}}</span></div>
      <div>{{massage}}</div>
      <img :src="headerImg" v-if="headerImg" style="width: 100%" alt="">
      <div class="input-row" v-if="regLogVis">
        <span>注册:</span>
        <input type="text" v-model="regname" placeholder="name...">
        <input type="password" v-model="regpassword" placeholder="password...">
        <button @click="regBtn">注册</button>
      </div>
      <div class="input-row" v-else>
        <span>登陆:</span>
        <input type="text" v-model="logname" placeholder="name...">
        <input type="password" v-model="logpassword" placeholder="password...">
        <button @click="logBtn">登陆</button>
      </div>
      <div class="input-row"><button @click="cutlogreg()">切换</button></div>
      <div class="input-row">
        <span>编辑:</span>
        <input type="text" v-model="editUser.nickName" placeholder="昵称...">
        <input type="text" v-model="editUser.age" placeholder="年龄...">
        <input type="text" v-model="editUser.sex" placeholder="性别...">
        <button @click="editUserBtn">编辑完成</button>
      </div>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3001/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="add-album-name">
        <div class="input-row">
          <span>albumName:</span>
          <input type="text" v-model="albumName">
        </div>
      </div>
      <div class="add-album-pic">
        <div class="addshow">
          <span v-for="(item,index) in picArr" :key="index">title:{{item.descr}},image:{{item.img}}</span>
        </div>
        <div class="input-row">
          <span>title:</span>
          <input type="text" v-model="picDesc">
        </div>
        <div class="input-row">
          <span>url:</span>
          <input type="text" v-model="picUrl">
          <button @click="addPic()">确定</button>
          <button @click="clearInput()">清空</button>
        </div>
        <div class="input-row"><button @click="submitBtn()">完成</button></div>
        <div class="input-row"><input type="text" v-model="deleteIdx"><button @click="btnDele()">删除</button></div>
        <div class="input-row"><button @click="deletepicPreview()">清除</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import OnlySlide from './components/only_slide'
import qs from 'qs'

export default {
  name: 'app',
  components: {
    OnlySlide
  },
  data (){
    return {
      albumName:"",
      picDesc:"",
      picUrl:"",
      picArr:[],
      deleteIdx:"",
      slideOption:{
        slideViewWidth: 1000,
        slideViewHeight:500,
        slideData:[{
          albumName:"暂无图集",
          photo:[
            {descr:"",img:'./static/aaa.jpg'}
          ]
        }]
      },
      regLogVis:false,
      regname:"",
      regpassword:"",
      logname:"",
      logpassword:"",
      massage:"",
      headerImg:"",
      editUser:{
        avatar: "",
        nickName: "",
        age: "",
        sex: ""
      },
      imageUrl: ''
    }
  },
  mounted (){
    this.getAlbum();
    this.getUserInfo()
  },
  methods:{
    regBtn (){
      let self = this;
      let b = {
        userName:self.regname,
        passwd: self.regpassword
      }
      self.$axios.post('http://localhost:3001/api/register',qs.stringify(b)).then(function(res){
        console.log(res)
        if (res.data.code == 200) {
          alert("注册成功")
          self.regLogVis = !self.regLogVis;
        }else{
          alert("注册失败"+res.data.msg)
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    logBtn (){
      let self = this;
      let b = {
        userName:self.logname,
        passwd: self.logpassword
      }
      self.$axios.post('http://localhost:3001/api/login',qs.stringify(b)).then(function(res){
        self.massage = res.data.msg;
        localStorage.token = res.data.data;
        self.getAlbum();
        self.getUserInfo();
      }).catch(function(err){
        console.log(err)
      })
    },
    cutlogreg (){
      this.regLogVis = !this.regLogVis;
    },
    getUserInfo (){
      const self = this;
      self.$axios.get('http://localhost:3001/api/getuserinfo').then(function(res){
        self.massage = JSON.stringify(res.data.data);
        self.headerImg = 'http://localhost:3001/images/'+ res.data.data.avatar
      }).catch(function(err){
        console.log(err)
      })
    },
    addPic (){
      if (this.picArr.length>10) {
        alert("最多只能传11张");
        return;
      }
      let a = {
        descr: this.picDesc,
        img: this.picUrl
      };
      this.picArr.push(a)
    },
    submitBtn (){
      let self = this;
      if (self.picArr.length == 0) {
        alert("请上传！！");
        return;
      }
      let b = {
        albumName: self.albumName,
        photo: self.picArr
      }
      self.$axios.post('http://localhost:3001/api/putalbum', qs.stringify(b)).then(function (res) {
        if (res.data.code == 200) {
          alert("成功")
          self.getAlbum();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getAlbum (){
      const self = this;
      self.$axios.get('http://localhost:3001/api/getalbum').then(function (res) {
        if (res.data.code == 200) {
          if (res.data.data.length != 0) {
            self.slideOption.slideData = res.data.data
          }
        }else{
          alert("token 过期")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    btnDele (){
      let self = this;
      if (!self.deleteIdx) return;
      self.slideOption.slideData.forEach((a,i) => {
        if (i == self.deleteIdx-1) {
          self.$axios.post('http://localhost:3001/api/deletealbum',qs.stringify({id:a._id})).then(function(res){
            if (res.data.code == 200) {
              self.getAlbum();
              alert("删除成功")
            }
          }).catch(function(err){
            console.log(err)
          })
        }
      })
    },
    clearInput (){
      this.picUrl = "";
    },
    deletepicPreview (){
      this.picArr = [];
    },

    handleAvatarSuccess(res, file) {
      if (res.data) {
        this.editUser.avatar = res.data;
        this.imageUrl = URL.createObjectURL(file.raw);
        alert("上传成功！")
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    editUserBtn (){
      const self = this;
      for(let v in self.editUser){
        if (!self.editUser[v]) {
          alert(v+"不能为空")
          return;
        }
      };
      self.$axios.post('http://localhost:3001/api/edituser',qs.stringify(self.editUser)).then(function(res){
        alert("编辑成功")
        self.getUserInfo();
      }).catch(function(err){
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  box-sizing: border-box;
}
.edit{
  position: relative;
  width: 1000px;
  background: #f1f1f1; 
  margin: 35px auto;
  box-sizing: border-box;
  padding: 10px;
}
.add-album-name,.add-album-pic{
  width: 100%;
  background: #fff;
}
.input-row{
  width: 100%;
  height: 25px;
  line-height: 25px;
  margin: 10px 0;
}
.input-row input{
  height: 100%;
  box-sizing: border-box;
}
.numb{
  position: absolute;
  top: 5px;
  right: 10px;
}
.addshow{
  width: 100%;
  padding: 10px 0;
}
.addshow span{
  background: #eee;
  display: block;
  margin-top: 5px; 
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
