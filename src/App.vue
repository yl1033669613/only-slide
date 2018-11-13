<template>
    <div id="app">
        <div style="width: 800px; margin: 50px auto">
            <only-slide :slideViewWidth="800" :slideViewHeight="450" :slideData.sync="slideData"></only-slide>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import onlySlide from './lib/index.js'
Vue.use(onlySlide)

export default {
    name: 'app',
    data() {
        return {
            slideData: [{
                albumName: "图集1",
                photo: []
            }, {
                albumName: "图集2",
                photo: [{
                    descr: "简介",
                    img: './static/aaa.jpg'
                }]
            }]
        }
    },
    mounted() {
        let self = this;
        setTimeout(() => {
            self.slideData.push({
                albumName: "图集3",
                photo: []
            }, {
                albumName: "图集4",
                photo: [{
                    descr: "这是描述1",
                    img: './static/aaa.jpg'
                }, {
                    descr: "这是描述2",
                    img: './static/bbb.jpg'
                }, {
                    descr: "这是描述3",
                    img: './static/aaa.jpg'
                }, {
                    descr: "",
                    img: './static/bbb.jpg'
                }]
            }, {
                albumName: "图集5",
                photo: []
            }, {
                albumName: "图集6",
                photo: [{
                    descr: "简介",
                    img: './static/bbb.jpg'
                }, {
                    descr: "",
                    img: './static/aaa.jpg'
                }]
            })
        }, 2000)
    }
}
</script>
<style lang="scss">
</style>
