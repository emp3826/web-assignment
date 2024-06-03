import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../views/login/index';
import admin from '../views/Admin/index';
import adminHome from '../views/Admin/home';
import studentManage from '../views/Admin/studentManage/index'
import addPlant from "@/views/Admin/studentManage/addPlant";
import plantList from "@/views/Admin/studentManage/plantList";
import editPlant from "@/views/Admin/studentManage/editorPlant";


Vue.use(VueRouter)

const routes = [
  {
    // 随便定义的首页
    path: '/',
    name: 'index',
    component: login,
    redirect: '/login'
  },
  {
    // 登陆页
    path: '/login',
    name: 'login',
    component: login
  },
  {
    // admin 的路由
    path: '/admin',
    name: 'admin',
    redirect: '/adminHome',
    component: admin,
    meta: {requireAuth: true},
    children: [
      {
        path: '/adminHome',
        name: '主页',
        component: adminHome,
        meta: {requireAuth: true},
        children: [
          {
            path: '/adminHome',
            name: '介绍',
            component: adminHome,
            meta: {requireAuth: true},
          }
        ]
      },
      {
        path: '/plantManage',
        name: '植物管理',
        component: studentManage,
        meta: {requireAuth: true},
        children: [
          {
            path: '/plantList',
            name: '植物列表',
            component: plantList,
            meta: {requireAuth: true},
          },
          {
            path: '/addPlant',
            name: '添加植物',
            component: addPlant,
            meta: {requireAuth: true}
          },
      
          {
            path: '/editorPlant',
            name: '编辑植物',
            component: editPlant,
            meta: {requireAuth: true}
          },

        ]
      },
     
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

/*
  session 设置：
    1. token
    2. name
    3. type
    4. tid
    5. sid
    5. 系统信息 info
 */
router.beforeEach((to, from, next) => {
  console.log(from.path + ' ====> ' + to.path)
  if (false) { // 判断该路由是否需要登录权限
  } else {
    // 不需要登陆权限的页面，如果已经登陆，则跳转主页面
    if(false){
    }else{
      next();
    }
  }
});