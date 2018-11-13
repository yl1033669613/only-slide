# vue_slide_component

> a vue slide plugin

一个vue多图集轮播、包含缩略图的插件

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

具体使用方法请参考[demo.html](https://github.com/yl1033669613/vue_slide_component/raw/master/demo/demo.html)

## 查看demo
[demo](https://github.com/yl1033669613/vue_slide_component/raw/master/static/111.png)  




