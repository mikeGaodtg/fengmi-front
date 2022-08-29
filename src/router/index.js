import Vue from 'vue'
import VueRouter from "vue-router"
import store from '@/store/index'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/views/Index')
        },
        {
            path: '/login',
            component: () => import('@/views/Login')
        },
        {
            path: '/reg',
            component: () => import('@/views/Register')
        },
        {
            path: '/my-order',
            component: () => import('@/views/MyOrder')
        },
        {
            path: '/my-cart',
            component: () => import('@/views/MyShoppingCart')
        },
        {
            path: '/settle',
            component: () => import('@/views/Settle')
        },
        {
            path: '/search',
            component: () => import('@/views/Search')
        },
        {
            path: '/detail',
            component: () => import('@/views/Detail')
        },
        {
            path: '/orderPay',
            component: () => import('@/views/OrderPay')
        }
    ]
})
const whiteList =['/reg','/login','/search','/detail','/']
router.beforeEach((to,from,next)=>{
    let token =localStorage.getItem("token");

    if(token){
        if(to.path=='/login'){
            next('/')
        }else{
            next()
        }
    }else{
        if(whiteList.indexOf(to.path)!=-1){
         
            next()
        }else{
            store.commit("toggleLogin")
            // this.$store.commit('toggleLogin')
            next('/login')
        }
    }
})
export default router