// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import vuex from 'vuex'
import store from './store'
import router from './router'//路由
import ElementUI from 'element-ui'//UI组件http://element-cn.eleme.io

import 'element-ui/lib/theme-chalk/index.css'
import SimpleVueValidation from 'simple-vue-validator'//表单验证http://simple-vue-validator.maijin.info
import App from './App'
import axios from './axios'//ajax封装
import 'jquery'
import 'jqueryui'

import 'vuescroll/dist/vuescroll.css';

import vuescroll from 'vuescroll'//火狐无法更改滚动条样式，引入虚拟滚动条https://github.com/wangyi7099/vuescroll
const $ = require('jquery')
window.$ = $
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(SimpleVueValidation);
Vue.use(vuescroll);
Vue.prototype.$axios = axios;
Vue.prototype.Validator  = SimpleVueValidation.Validator;
SimpleVueValidation.extendTemplates({//表单验证全局配置
    error: '错误.',
    required: '必填',
    float: '必须是浮点数',
    integer: '必须是整数',
    number: '必须是数字',
    lessThan: '必须小于 {0}.',
    lessThanOrEqualTo: '必须小于或等于 {0}.',
    greaterThan: '必须大于{0}.',
    greaterThanOrEqualTo: '必须大于或等于 {0}.',
    between: 'Must between {0} and {1}.',
    size: 'Size must be {0}.',
    length: 'Length must be {0}.',
    minLength: '最小长度为 {0} 字节',
    maxLength: '最大长度为 {0} 字节',
    lengthBetween: 'Length must between {0} and {1}.',
    in: 'Must be {0}.',
    notIn: 'Must not be {0}.',
    match: 'Not matched.',
    regex: 'Invalid format.',
    digit: 'Must be digit.',
    email: 'Invalid email.',
    url: 'Invalid url.',
    // same:'必须相同',
});

new Vue({
    el: '#app',
    store,
    router,
    axios,
    render: h => h(App),
    template: '<App/>',
    components: { App },
})

