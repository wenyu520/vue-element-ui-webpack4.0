
import Vue from 'vue'
import {Message} from 'element-ui'
import Router from 'vue-router'
import store from '@/store'


import index from '@/components/index'

// buildingPage
import buildingPage from '@/components/page404'
// home
import home from '@/components/HOME/homeImage.vue'


// 登录
import login from '@/components/login'
// 注册
import register  from '@/components/register'


const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}

let RouterArr = [

    {
        path: '/home',
        component: home,
        name: 'home'
    },
    {
        path: '/memberHomePage',
        component: memberHomePageList,
        name: 'memberHomePage'
    },
    {
        path: '/importFile/:id/:backRouterName',
        component: importFile,
        name: 'importFile'

    }
]



Vue.use(Router)

const router = new Router({
    // mode: 'history',
    // base: process.env.NODE_ENV === "development"?"/basic.html?" :'/basic/index.html',
    routes: [
        {
            path: '/buildingPage',
            component: buildingPage
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login,
            name: 'login'
        },
        {
            path: '/register',
            component: register,
            name: 'register'
        },
        {
            path: '/index',
            component: index,
            name: 'index',
            redirect: '/home',
            children: RouterArr
        }
    ]
})


router.beforeEach((to, from, next) => {

})
router.afterEach((to, from) => {

})
export default router
