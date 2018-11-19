# only-slide.js

> a vue slide plugin

一个vue多图集轮播、包含缩略图的pc端插件

## 使用

#### 使用须知  

该插件基于vue因此必须首先引用vue.js

请一定要设置宽高

#### 使用方法

1. 在项目中直接引用

> <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>

> <script src="/your path/only-slide.js"></script>

```javascript
<script>
    Vue.use('onlySlide');
</script>
```

2. 基于vue构建工具（vue-cli）

```javascript
<script>
    import Vue from 'vue'
    import onlySlide from '/your path/only-slide.js'
    Vue.use(onlySlide);
</script>
```

```
<only-slide 
	:slide-view-width="800" 
	:slide-view-height="450"  
	:slide-data="slideData"> <!-- slide-view-width（必须）轮播主视图宽度 slide-view-height（必须）轮播主视图高度 slide-data 图集数据,格式请按照例子中的数据格式 -->
</only-slide>
```
具体示例请参考[demo.html](https://github.com/yl1033669613/vue_slide_component/blob/master/demo/demo.html)

####传入的数据格式

```javascript
[{
    albumName: "图集1", 
    photo: [] 
}, {
    albumName: "图集2",// 图集相册名 (必填)
    photo: [{ //图集内图片数组
        descr: "简介",  //图片单段描述 (可以不填， 但是字段必须有)
        img: './images/aaa.jpg' //图片url (可以不填， 但是字段必须有)
    }]
}]
```
## 查看demo
[demo](https://yl1033669613.github.io/vue_slide_component/demo/demo.html)  




