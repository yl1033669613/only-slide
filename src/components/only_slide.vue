<template>
  <div class="o-sldie-container" :style="{width:option.slideViewWidth + 'px'}">
    <ul class="photo-album-btn clear">
      <li v-for="(item,index) in sca" :class="{active:caIdx==index?true:false}" @click="cutAlbum(index)">
        {{item.albumName}}（{{item.photo.length}}）
      </li>
    </ul>
    <div class="only-slide" :style="{height:option.slideViewHeight + 'px'}" @mouseover="hoverPrevNextVisible" @mouseleave="hoverPrevNextHide">
      <div class="o-slide-wapper">
        <transition :name="slideAnimate" tag="div">
          <div class="o-slide-item" :key="isShowing">
            <img :src="currUrl" alt="">
            <span v-if="prevNextVisible">{{option.slideData[caIdx].photo[cpIdx].descr}}</span>
          </div>
        </transition>
      </div>
      <div class="o-prev" @click="cutPage('prev')" v-if="prevNextVisible"><img :src="leftArrow" alt=""></div>
      <div class="o-next" @click="cutPage('next')" v-if="prevNextVisible"><img :src="rightArrow" alt=""></div>
      <div class="pagination">{{cpIdx + 1}}/{{option.slideData[caIdx].photo.length}}</div>
    </div>
    <div class="o-preview">
      <div class="o-preview-wapper">
        <ul :style="{left:previewLeft+'px'}" ref="hidebox">
          <li class="cut-album-btn" v-if="caIdx==0?false:true" @click="cutAlbumInPreview('prev')">上一图集</li><li v-for="(item,index) in option.slideData[caIdx].photo" @click="clickPreview(index)" :style="{opacity:cpIdx==index?1:.4}"><img :src="item.img" alt=""></li><li class="cut-album-btn" v-if="caIdx==option.slideData.length - 1?false:true" @click="cutAlbumInPreview('next')">下一图集</li>
        </ul>
      </div>
      <div class="o-preview-prev" @click="cutPreview('prev')">《</div>
      <div class="o-preview-next" @click="cutPreview('next')">》</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slide',
  components: {

  },
  props: ["option"],
  data () {
    return {
      isShowing: true,
      // transition 动态name
      slideAnimate:"",
      // 图集总数组
      sca:[],
      // 当前图集数组index位置
      caIdx:0,
      // 当前图集图片index位置
      cpIdx:0,
      // 当前图片url
      currUrl:"",
      // preview left
      previewLeft:0,
      // moveable preview box current width
      currWidth:0,
      // prevNextBtn vieible
      prevNextVisible:false,
      // arrow
      leftArrow:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCODNERjI0OTc4RTkxMUU3QjlEQkU0NDIyMTVBRTlCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCODNERjI0QTc4RTkxMUU3QjlEQkU0NDIyMTVBRTlCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0RGMjQ3NzhFOTExRTdCOURCRTQ0MjIxNUFFOUJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI4M0RGMjQ4NzhFOTExRTdCOURCRTQ0MjIxNUFFOUJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/fXlQgAAAZlJREFUeNrs2+GtgkAMB3DOCRjBDXQERmCEcwJXcQNwAzZgBNzEEbCXwCeDHHetaXttcnnJi3m5/y96Qulz8zxXJdepKrwMwAAMwAAMwAAMwACSyzmHuqDusCZYb1gdrHr5PU2FS+GchbyXbv6uCWOfm/vnArARfi1PBcDiDAjh4Yf/8ZKz2kMwInyoQSVAZPgnHIIvdYfgzmd+rR5rn6wOwaPhVQGkhFcDkBpeBUBOePEAueFFA2CEFwuAFV4kAGZ4cQDY4UUBUIQXA0AVXgQAZXj2ANThWQPAaqnDUwJg9AOaiPt5XzGtfzRELiBdawbYe3tfYY1cETCeC4R21U0sAuLXoI84DKdUBCkXQmQIki6FSRCk3QyhI0i8HUZFkNoQQUOQ3BJDQZDeFM1G0NAWz0LQ8mAkGUHTo7EkBG0PRw8jqBuROYqgckYoEmFUPSQViXBVOyTlnOsj+gmt2iGpSASyISlug5J+q6NM9RFwuSGwx1hhP80yORZmAwf4+48VgOTdZ/81VngZgAEYgAEYgAEYQLn1EWAAQFrgEZNBEzkAAAAASUVORK5CYII=",
      rightArrow:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMzA5Mzc1Njc4RTkxMUU3OUM5RUJCQUI2ODQ1RDNERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMzA5Mzc1Nzc4RTkxMUU3OUM5RUJCQUI2ODQ1RDNERiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEzMDkzNzU0NzhFOTExRTc5QzlFQkJBQjY4NDVEM0RGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEzMDkzNzU1NzhFOTExRTc5QzlFQkJBQjY4NDVEM0RGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bVSsJwAAAaFJREFUeNrsmoFtwkAMRXOoAzAKHYEN2KDpBO1GMEI3aDYANmCDdoOrUwWpagWBO//K32dLlqUkSu4/InOxnXLOXcu26Bq3ABAAAkAACAABIAC0aw+oG6eUvqPsNF8lbMRP4js5Pmg+p3onO94A4dO9d/mv9doAqtaJAiC+ypettwIAmQM2V85ttd8Ei0nwbea8CQgLYBI8SBjMQwAnwaX4Ps9b7y4J/lggFIJ5AGgIFACQEGgAoCBQAUBAoAOgDYESgCYEWgBaEKgBaECgB1ALwQWAGghuAJRCcAWgBELtOhOqO3yuCZZCkPAuvpq59FH84K4qLPA+JaxvEFddSzBbFp8gHJvtC4wVZQlPM5cNGg8ylQSvlNN/29brv8DN4j3uA+4S720neLd4T98CReK9fA0Wi/dQD6gSz14RqhbPXBNUEc9aFVYTz9gXUBXP1hlSF8/UG4SIZ+kOw8SbB4AWzzwkpSKeeUiqm2YGnz0PSZ2si/+PGaE94rVnSoJjjX+cBPuYYLxY+wFhfQEWi3H5ABAAAkAACAABIAA0a18CDAB6UWSzZ1MpswAAAABJRU5ErkJggg=="
    }
  },
  mounted (){
    let self = this;
    self.sca = self.option.slideData;
    // 页面初始化获取图片url
    self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
    // 初始获取预览可移动区域宽度
    self.moveablePreviewResetWidth();
  },
  methods:{
    // 切换图片 逻辑
    cutPage (type){
      let self = this;
      switch (type){
        case "prev":
          if (self.cpIdx == 0) {
            if (self.caIdx == 0) {
              self.caIdx = self.sca.length - 1;
            }else{
              self.caIdx--;
            }
            self.moveablePreviewResetWidth();
            self.cpIdx = self.sca[self.caIdx].photo.length - 1;
            self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
          }else{
            self.cpIdx --;
            self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
          }
          self.isShowing = !self.isShowing;
          self.slideAnimate = "slideright";
          break;
        case "next":
          if (self.cpIdx == self.sca[self.caIdx].photo.length - 1) {
            self.cpIdx = 0;
            if (self.caIdx == self.sca.length - 1) {
              self.caIdx = 0;
            }else{
              self.caIdx++;
            }
            self.moveablePreviewResetWidth();
            self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
          }else{
            self.cpIdx ++;
            self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
          }
          self.isShowing = !self.isShowing;
          self.slideAnimate = "slideleft";
          break;
      }
    },
    // 切换图集 按钮逻辑
    cutAlbum (index){
      let self = this;
      self.caIdx = index;
      self.cpIdx = 0;
      self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
      self.moveablePreviewResetWidth();
    },
    // 预览区图片滚动
    cutPreview (type){
      let self = this;
      let pvw = self.option.slideViewWidth - 70;
      let sw = 85;
      let hideBoxWidth = self.$refs.hidebox.getBoundingClientRect().width;
      switch (type){
        case 'prev':
          if (self.previewLeft == 0) return;
          self.previewLeft+=sw;
          self.currWidth+=sw;
          break;
        case 'next':
          if (self.currWidth - pvw <= 5) return;
          self.previewLeft-=sw;
          self.currWidth-=sw;
          break;
      };
    },
    // 点击预览图片
    clickPreview (index) {
      let self = this;
      if (self.cpIdx == index) return;
      if (self.cpIdx < index) {
        self.slideAnimate = "slideleft";
      }else{
        self.slideAnimate = "slideright";
      }
      self.isShowing = !self.isShowing;
      self.cpIdx = index;
      self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
    },
    // 预览区图集切换
    cutAlbumInPreview(type){
      let self =this;
      if (type=="prev") {
        self.caIdx --;
        self.cpIdx = 0;
        self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
        self.moveablePreviewResetWidth();
      }else{
        self.caIdx ++;
        self.cpIdx = 0;
        self.currUrl = self.sca[self.caIdx].photo[self.cpIdx].img;
        self.moveablePreviewResetWidth();
      }
    },
    // reset width
    moveablePreviewResetWidth(){
      let self = this;
      self.previewLeft = 0;
      self.$nextTick(function(){
        self.currWidth = self.$refs.hidebox.getBoundingClientRect().width;
      })
    },
    // prevNextBtn vieible
    hoverPrevNextVisible (){
      this.prevNextVisible = true;
    },
    hoverPrevNextHide (){
      this.prevNextVisible = false;
    }
  }
}
</script>

<style lang="less" scoped>
  ul{
    list-style: none;
  }
  .clear:after{
      content:"";
      height: 0;
      display:block;
      clear:both;
  }
  .only-slide,
  .o-slide-item{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .o-sldie-container{
    margin-bottom: 100px;
  }
  .only-slide{
    overflow: hidden;
  }
  .o-slide-wapper{
    width: auto;
    height: 100%;
    white-space: nowrap;
  }
  .o-slide-item{
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    vertical-align: top;
    img{
      width: 100%;
      height: 100%;
    }
    span{
      position: absolute;
      left: 10px;
      bottom: 10px;
      display: inline-block;
      padding: 3px 10px;
      background: rgba(0,0,0,.4);
      color: #fff;
      border-radius: 3px;
      max-width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }
  .o-prev,.o-next{
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 55px;
    height: 55px;
    font-size: 20px;
    line-height: 55px;
    color: #fff;
    cursor: pointer;
    background: rgba(0,0,0,.4);
    text-align: center;
    border-radius: 50%;
    transition: all .2s;
    img{
      vertical-align: middle;
      display: inline-block;
      width: 32px;
      height: 32px;
    }
  }
  .o-prev{
    left: 10px;
  }
  .o-next{
    right: 10px;
  }

  .pagination{
    position: absolute;
    right: 6px;
    bottom: 6px;
    font-size: 12px;
    color: #fff;
    text-shadow:0 0 7px rgba(0,0,0,.9);
  }

  .photo-album-btn{
    padding: 0;
    width: 100%;
    line-height: 20px;
    font-size: 16px;
    background: #fff;
    margin-bottom: 10px;
    li{
      float: left;
      padding: 3px 8px;
      margin-right: 5px;
      color: #454545;
      border-radius: 3px;
      cursor:pointer;
    }
    li.active{
      background: #454545;
      color: #fff;
    }
  }

  .o-preview{
    margin-top: 15px;
    width: 100%;
    height: 60px;
    padding: 0 35px;
    line-height: 60px;
    position: relative;
    box-sizing: border-box;
    .o-preview-wapper{
      position: relative;
      width: 100%;
      height: 100%;
      overflow:hidden;
    }
    ul{
      position: absolute;
      top: 0;
      left: 0;
      width: auto;
      height: 100%;
      padding: 0;
      margin: 0;
      white-space: nowrap;
      text-align: left;
      transition: all .3s;
      li{
        vertical-align: top;
        display: inline-block;
        width: 80px;
        height: 100%;
        margin-right: 5px;
        cursor: pointer;
        transition: all .2s;
        &:hover{
          opacity: 1!important;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .o-preview-prev,.o-preview-next{
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 35px;
    height: 100%;
    font-size: 28px;
    line-height: 60px;
    color: #454545;
    cursor: pointer;
    opacity: .5;
    transition: all .2s;
    &:hover{
      opacity: 1;
    }
  }
  .o-preview-prev{
    left: 0;
    text-align: left;
  }
  .o-preview-next{
    right: 0;
    text-align: right;
  }

  .cut-album-btn{
    text-align: center;
    font-size: 12px;
    background: #f9f9f9;
  }

  //过渡 css 
  .slideleft-enter-active {
    animation: slideLeftEnter .5s;
  }
  .slideleft-leave-active {
    animation: slideLeftLeave .5s;
  }
  @keyframes slideLeftEnter {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideLeftLeave {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  .slideright-enter-active {
    animation: slideRightEnter .5s;
  }
  .slideright-leave-active {
    animation: slideRightLeave .5s;
  }
  @keyframes slideRightEnter {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideRightLeave {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
</style>
