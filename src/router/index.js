import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

// 错误
import NotFound from '@/components/Error/404' // 404

// 正式
import Login from '@/components/Login'

import daping from "@/components/layer/layer"

// 基础信息
// import Jzgl from '@/components/Master/Jian_Zhu_Guan_Li' // 建筑管理
// import Xfss from '@/components/Master/Xiao_Fang_She_Shi' // 建筑管理
// import Pmtbz from '@/components/Master/Ping_Mian_Tu_Biao_Zhu' // 平面图标注
// import Zcgl from '@/components/Master/Zi_Chan_Guan_Li' // 资产管理
//
// // 权限管理
// import Zzjg from '@/components/Auth/Zu_Zhi_Ji_Gou' // 组织机构
// import Qxgl from '@/components/Auth/Quan_Xian_Guan_Li' // 权限管理
// import Lwdw from '@/components/Auth/Lian_Wang_Dan_Wei' //联网单位
// import Yhgl from '@/components/Auth/Yong_Hu_Guan_Li' // 用户管理
// import An from '@/components/Auth/An_Niu' // 按钮
// import Cd from '@/components/Auth/Cai_Dan' // 菜单
//
// // 信息展示
// import Bjjk from '@/components/Info/Bao_Jing_Jian_Kong' // 报警监控
// import Zl from '@/components/Info/pandect' // 总览
// import video from '@/components/video/video'

Vue.use(Router)

const router = new Router({
  base: '/firemen/',
  mode: 'history',
  routes: [{
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    }, {
      path: '/daping',
      component: daping,
      name: '大屏',
      iconCls: 'menu-icon icon-jichuxinxi', //图标样式class
      children: [{
        path: '/daping',
        component: daping,
        name: '大屏展示'
      }]
    },
    // {
    //   path: '/',
    //   name: '基础信息',
    //   component: Home,
    //   iconCls: 'menu-icon icon-jichuxinxi',//图标样式class
    //   children: [
    //     {
    //       path: '/Jian-Zhu-Guan-Li', component: Jzgl, name: '建筑管理'
    //     },
    //     {
    //       path: '/Xiao-Fang-She-Shi', component: Xfss, name: '消防设施'
    //     },
    //     {
    //       path: '/Pian-Mian-Tu-Biao-Zhu', component: Pmtbz, name: '平面图标注'
    //     },
    //     {
    //       path: '/Zi-Chan-Guan-Li', component: Zcgl, name: '资产管理'
    //     },
    //     {
    //       path: '/shipin', component: video, name: '视频管理'
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '权限管理',
    //   component: Home,
    //   iconCls: 'menu-icon icon-quanxian',//图标样式class
    //   children: [
    //     {
    //       path: '/Zu-Zhi-Ji-Gou', component: Zzjg, name: '组织机构'
    //     },
    //     {
    //       path: '/Lian-Wang-Dan-Wei', component: Lwdw, name: '联网单位'
    //     },
    //     {
    //       path: '/Yong-Hu-Guan-Li', component: Yhgl, name: '用户管理'
    //     },
    //     {
    //       path: '/Quan-Xian-Guan-Li',  component: Qxgl, name: '权限管理'
    //     },
    //     {
    //       path: '/Cai-Dan', component: Cd, name: '菜单'
    //     },
    //     {
    //       path: '/An-Niu', component: An, name: '按钮'
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '信息展示',
    //   component: Home,
    //   iconCls: 'menu-icon icon-xinxizhanshi',//图标样式class
    //   children: [
    //
    //     {
    //       path: '/Bao-Jing-Jian-Kong', component: Bjjk, name: '报警监控'
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '隐患管理',
    //   component: Home,
    //   iconCls: 'menu-icon icon-yinghuanguanli',//图标样式class
    //   children: [
    //     {
    //       path: '/Ying-Huan', name: '隐患'
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '巡检管理',
    //   component: Home,
    //   iconCls: 'menu-icon icon-xunjianguanli',//图标样式class
    //   children: [
    //     {
    //       path: '/Xuan-Jian', name: '巡检'
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '保养',
    //   component: Home,
    //   iconCls: 'menu-icon icon-baoyang',//图标样式class
    //   children: [
    //     {
    //       path: '/Bao-Yang', name: '保养'
    //     }
    //   ]
    // }
    // ,
    // {
    //     path: '/',
    //     hidden: true,
    //     redirect: { path: '/404' }
    // }
  ]
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   if (to.path == '/') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

export default router
