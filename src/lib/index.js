import onlySlide from './only_slide.vue'
// 导入组件 
const vueOnlySlide = {
    install(Vue, options) {
        Vue.component(onlySlide.name, onlySlide)
    }
}

if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(vueOnlySlide)
}

export default vueOnlySlide
