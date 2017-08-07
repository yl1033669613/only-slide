<template>
  <div id="app">
    <only-slide :option="slideOption" class="slide-part" style="margin: 0 auto"></only-slide>
    <!-- <hello></hello> -->
  </div>
</template>

<script>
import Hello from './components/Hello'
import OnlySlide from './components/only_slide'

export default {
  name: 'app',
  components: {
    Hello,
    OnlySlide
  },
  data (){
    return {
      slideOption:{
        slideViewWidth: 1000,
        slideViewHeight:500,
        slideData:[
          {
            albumName:"setInterval",
            photo:[
              {
                descr:"bbb",
                img:"/static/head.png"
              },
              {
                descr:"aaaaaa",
                img:"/static/aaa.jpg"
              },
              {
                descr:"是的是的",
                img:"/static/aaa.jpg"
              },
              {
                descr:"是的是的",
                img:"/static/aaa.jpg"
              },
              {
                descr:"是的是的",
                img:"/static/head.png"
              },
              {
                descr:"啊啊啊啊大撒啊啊啊啊大撒啊啊啊啊大撒啊啊啊啊大撒啊啊啊啊大撒啊啊啊啊",
                img:"/static/aaa.jpg"
              },
              {
                descr:"bbb",
                img:"/static/head.png"
              },
              {
                descr:"bbb",
                img:"/static/aaa.jpg"
              },
              {
                descr:"bbb",
                img:"/static/head.png"
              },
              {
                descr:"bbb",
                img:"/static/aaa.jpg"
              },
              {
                descr:"bbb",
                img:"/static/head.png"
              },
              {
                descr:"bbb",
                img:"/static/aaa.jpg"
              }
            ]
          },
          {
            albumName:"setTimeout",
            photo:[
              {
                descr:"bbb",
                img:"/static/head.png"
              },
              {
                descr:"bbb",
                img:"/static/aaa.jpg"
              }
            ]
          },
          {
            albumName:"object",
            photo:[
              {
                descr:"bbb",
                img:"/static/head.png"
              },
              {
                descr:"bbb",
                img:"/static/aaa.jpg"
              }
            ]
          }
        ]
      }
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
</style>
