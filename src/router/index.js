import Vue from 'vue'
import Router from 'vue-router'
import Blogs from "../components/Blogs";
import BlogEdit from "../components/BlogEdit";
import BlogDetail from "../components/BlogDetail";
import Login from "../components/Login";
import UserAdd from "../components/UserAdd";
import Index from "../components/Index";
import BlogsId from "../components/BlogsId";
import Message from "../components/Message"
import Log from "../components/Log";
import Friends from "../components/Friends";
import About from "../components/About";
import User from "../components/User";
import UserUpdate from "../components/UserUpdate";
Vue.use(Router)

export default new Router({

  mode: 'history',
  routes: [
    {path:'/',name:'Index',component:resolve => require(["../components/Index"],resolve)},

    {path:'/blogsAll',name:'Blogs',component:resolve => require(["../components/Blogs"],resolve)},
    {path:'/login',name:'Login',component:resolve => require(["../components/Login"],resolve)},
    {path:'/blogadd',name:'BlogAdd',component:resolve => require(["../components/BlogEdit"],resolve), meta: {requireAuth: true}},
    {path:'/blogDetail/:blogId',name:'BlogDetail',component:resolve => require(["../components/BlogDetail"],resolve)},
    {path:'/blogEdit/:blogId',name:'BlogEdit',component:resolve => require(["../components/BlogEdit"],resolve), meta: {requireAuth: true}},
    {path:'/blogsId/:blogId',name:'BlogsId',component:resolve => require(["../components/BlogsId"],resolve), meta: {requireAuth: true}},
    {path:'/messAge',name:'Message',component:resolve => require(["../components/Message"],resolve)},
    {path:'/userAdd',name:'UserAdd',component:resolve => require(["../components/UserAdd"],resolve)},
    {path:'/log',name:'Log',component:resolve => require(["../components/Log"],resolve)},
    {path:'/friends',name:'Friends',component:resolve => require(["../components/Friends"],resolve)},
    {path:'/about',name:'About',component:resolve => require(["../components/About"],resolve)},
    {path:'/user',name:'User',component:resolve => require(["../components/User"],resolve), meta: {requireAuth: true}},
    {path:'/userUpdate',name:'UserUpdate',component:resolve => require(["../components/UserUpdate"],resolve), meta: {requireAuth: true}},
  ]
})




