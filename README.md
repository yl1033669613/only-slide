# my_project

> a vue slide component

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 使用

### 使用须知  
该项目使用官方的vue-cli脚手架<br>
js使用了一些es6的特性，ie等浏览器兼容需引用babel-polyfill。<br>
css 使用了less进行预编译<br>
### 使用方法
在 `src`中找到`components`文件夹将其中的`only_slide.vue`文件复制的你项目的components内，<br>
在你的项目里引用<br>
```javascript
import OnlySlide from './components/only_slide'

export default {
  name: 'app',
  components: {
    OnlySlide //注册组件
  },
  data (){
    return {
    	// data 中绑定轮播图的数据
      slideOption:{
        slideViewWidth: 1000, //轮播中主窗口的宽
        slideViewHeight:500, //轮播中主窗口的高
        slideData:[
          {
            albumName:"setTimeout", //图集的title
            photo:[
              {
                descr:"bbb", //图片描述
                img:"/static/head.png" //图片路径
              },
              {
                descr:"bbb",
                img:"/static/aaa.jpg"
              }
            ]
          },
          {
            albumName:"setInterval",
            photo:[
              {
                descr:"bbb",
                img:"/static/head.png"
              }
            ]
          }
        ]
      }
    }
  }
}
```
完成之后便可在template 中使用`only-slide`标签了
<br>

"<only-slide :option="slideOption" class="slide-part" style="margin: 0 auto"></only-slide>"

## 效果图
![效果图](https://github.com/yl1033669613/vue_slide_component/raw/master/static/111.png)  




