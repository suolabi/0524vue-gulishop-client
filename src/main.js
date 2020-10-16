import App from '@/App'
// import Vue from 'vue/dist/vue.esm.js' 带解析器的vue版本
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServer' //运行mockServer文件，让mock可以注册上接口
import "swiper/css/swiper.min.css";

import './validate'

//图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})




// import '@/api'  //加载api的index.js 让其能够直接运行
// import {reqCategoryList} from '@/api'
// reqCategoryList()


//element-ui的整体引入方式
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI)


//element-ui的按需引入方式
//1、下载babel的插件
//2、在babel.config.js当中配置插件
//3、引入需要使用的组件并注册
// import {Button,Tag} from 'element-ui'
// Vue.use(Button)
// Vue.use(Tag)

//引入messageBox
import {MessageBox,Message,Pagination,Button} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;  //用来提示错误信息，更漂亮

Vue.use(Pagination)
Vue.use(Button)



import * as API from '@/api'

Vue.config.productionTip = false

//全局注册的各种组件，因为很多地方用到
import TypeNav from '@/components/TypeNav'
import SliderLoop from '@/components/SliderLoop'
import MyPagination from '@/components/MyPagination'

Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)
Vue.component('MyPagination',MyPagination)




// 麻烦写法
//定义组件（本质是定义了一个组件对象的构造函数）
// let VueComponent = Vue.extend({
//   data(){

//   },
//   template:'<h2>你好啊</h2>'
// })

// //注册组件
// Vue.component('myh',VueComponent) //本质给构造函数和一个名字进行关联


// //使用组件  <myh />


// 简单写法
// 定义带注册
// Vue.component('myh',{
//     data(){
  
//     },
//     template:'<h2>你好啊</h2>'
//   })

// 使用
{/* <myh /> */}

// Vue.component('App',App) //定义带注册



new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this//vm  
    Vue.prototype.$API = API//
    //在Vue的原型上添加了一个属性  $bus   $bus指向了一个对象 这个对象就是我们vm对象
    //1、为什么要在Vue原型上添加   
    //（让所有的组件对象都能看到它，找到它）
    // 组件对象原型的原型就是vm的原型
    //2、事件总线对象必须能够使用$on和$emit，$on和$emit 两个是在Vue的原型当中
  },
  el:'#app',
  render: h => h(App), //1、定义带注册  2、使用组件  3、渲染（依赖vue的一个loader去解析的vue-template-compiler）
  router, //让所有的组件当中都可以多两个对象 $router路由器对象 和 $route路由对象 
  store, //让所有的组件当中都可以多一个对象 this.$store

  //1、注册App组件进行使用 不过缺少解析器没法渲染。想用必须导入带解析器的版本js
  // components:{
  //   App:App   //定义带注册  上面导入的App是定义组件所需的配置对象
  // },
  // template:'<App />' 
})
