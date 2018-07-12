import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/articleManager/articleSimulation',
    component: Layout,
    redirect: '/articleManager/articleSimulation/articleSimulation',
    name: 'articleManager',
    meta: { title: '发文管理', icon: 'example' },
    children: [
      {
        path: 'articleSimulation',
        name: 'articleSimulation',
        component: () => import('@/views/articleManager/articleSimulation/articleSimulation'),
        meta: { title: '拟发公文', icon: 'table' }
      },
      {
        path: 'alreadyArticle',
        name: 'alreadyArticle',
        component: () => import('@/views/articleManager/alreadyArticle/alreadyArticle'),
        meta: { title: '已发公文', icon: 'tree' }
      },
      {
        path: 'alreadyMessage',
        name: 'alreadyMessage',
        component: () => import('@/views/articleManager/alreadyMessage/alreadyMessage'),
        meta: { title: '已发信息', icon: 'tree' }
      },
      {
        path: 'followArticle',
        name: 'followArticle',
        component: () => import('@/views/articleManager/followArticle/followArticle'),
        meta: { title: '发文跟踪', icon: 'tree' }
      },
      {
        path: 'followArticleOfWuJiang',
        name: 'followArticleOfWuJiang',
        component: () => import('@/views/articleManager/followArticleOfWuJiang/followArticleOfWuJiang'),
        meta: { title: '吴江发文跟踪', icon: 'tree' }
      }
    ]
  },
  {
    path: '/receiveArticleManager/receivedDocument',
    component: Layout,
    redirect: '/receiveArticleManager/receivedDocument/collectedDocument',
    name: 'receivedDocument',
    meta: { title: '收文管理', icon: 'example' },
    children: [
      {
        path: 'collectedDocument',
        name: 'collectedDocument',
        component: () => import('@/views/receiveArticleManager/collectedDocument/collectedDocument'),
        meta: { title: '待收文件', icon: 'table' }
      },
      {
        path: 'wuJiangDocument',
        name: 'wuJiangDocument',
        component: () => import('@/views/receiveArticleManager/wuJiangDocument/wuJiangDocument'),
        meta: { title: '吴江文件', icon: 'table' }
      },
      {
        path: 'receivedDocument',
        name: 'receivedDocument',
        component: () => import('@/views/receiveArticleManager/receivedDocument/receivedDocument'),
        meta: { title: '已收文件', icon: 'table' }
      },
      {
        path: 'receivedMessage',
        name: 'receivedMessage',
        component: () => import('@/views/receiveArticleManager/receivedMessage/receivedMessage'),
        meta: { title: '已收信息', icon: 'table' }
      },
      {
        path: 'overDocument',
        name: 'overDocument',
        component: () => import('@/views/receiveArticleManager/overDocument/overDocument'),
        meta: { title: '归档文件', icon: 'table' }
      }
    ]
  },

  {
    path: '/readAndDoSomething/waitReadDocument',
    component: Layout,
    redirect: '/readAndDoSomething/waitReadDocument/waitReadDocument',
    name: 'waitReadDocument',
    meta: { title: '阅办事项', icon: 'example' },
    children: [
      {
        path: 'waitReadDocument',
        name: 'waitReadDocument',
        component: () => import('@/views/readAndDoSomething/waitReadDocument/waitReadDocument'),
        meta: { title: '待阅文件', icon: 'table' }
      },
      {
        path: 'alreadyReadDocument',
        name: 'alreadyReadDocument',
        component: () => import('@/views/readAndDoSomething/alreadyReadDocument/alreadyReadDocument'),
        meta: { title: '已阅文件', icon: 'table' }
      },
      {
        path: 'collectionFolder',
        name: 'collectionFolder',
        component: () => import('@/views/readAndDoSomething/collectionFolder/collectionFolder'),
        meta: { title: '收藏夹', icon: 'table' }
      },
      {
        path: 'documentSearch',
        name: 'documentSearch',
        component: () => import('@/views/readAndDoSomething/documentSearch/documentSearch'),
        meta: { title: '文件查询', icon: 'table' }
      },
      {
        path: 'documentDatabase',
        name: 'documentDatabase',
        component: () => import('@/views/readAndDoSomething/documentDatabase/documentDatabase'),
        meta: { title: '文件数据库', icon: 'table' }
      },
      {
        path: 'historyDatabase',
        name: 'historyDatabase',
        component: () => import('@/views/readAndDoSomething/historyDatabase/historyDatabase'),
        meta: { title: '历史数据库', icon: 'table' }
      }
    ]
  },

  {
    path: '/systemManager/articleClassManager',
    component: Layout,
    redirect: '/systemManager/articleClassManager/articleClassManager',
    name: 'articleClassManager',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'articleClassManager',
        name: 'articleClassManager',
        component: () => import('@/views/systemManager/articleClassManager/articleClassManager'),
        meta: { title: '文种管理', icon: '' }
      },
      {
        path: 'approvalOpinionSet',
        name: 'approvalOpinionSet',
        component: () => import('@/views/systemManager/approvalOpinionSet/approvalOpinionSet'),
        meta: { title: '审批意见预设', icon: '' }
      },
      {
        path: 'flowAndFormManager',
        name: 'flowAndFormManager',
        component: () => import('@/views/systemManager/flowAndFormManager/flowAndFormManager'),
        meta: { title: '表单管理', icon: '' }
      },
      {
        path: 'systemSet',
        name: 'systemSet',
        component: () => import('@/views/systemManager/systemSet/systemSet'),
        meta: { title: '系统设置', icon: '' }
      },
      {
        path: 'historyDbManager',
        name: 'historyDbManager',
        component: () => import('@/views/systemManager/historyDbManager/historyDbManager'),
        meta: { title: '历史库管理', icon: '' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'form',
        component: () => import('@/views/form/index'),
        meta: { title: 'form', icon: 'form' }
      }
    ]
  },

  {
    path: '/internetOa',
    component: Layout,
    children: [
      {
        path: 'internetOa',
        name: 'InternetOa',
        component: () => import('@/views/oa/internetOa'),
        meta: { title: '网上办公', icon: 'form' }
      }
    ]
  },

  {
    path: '/oaOne/internetOa',
    component: Layout,
    redirect: '/oaOne/internetOa',
    name: 'oaOne',
    meta: { title: '多个子菜单', icon: 'example' },
    children: [
      {
        path: 'oaOne',
        name: 'oaOne',
        component: () => import('@/views/oaOne/internetOa'),
        meta: { title: 'oaOne', icon: 'table' }
      },
      {
        path: 'oaTwo',
        name: 'oaTwo',
        component: () => import('@/views/oaTwo/internetOa'),
        meta: { title: 'oaTwo', icon: 'tree' }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard'),
        name: 'keyboardChart',
        meta: { title: 'keyboardChart', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line'),
        name: 'lineChart',
        meta: { title: 'lineChart', noCache: true }
      },
      {
        path: 'mixchart',
        component: () => import('@/views/charts/mixChart'),
        name: 'mixChart',
        meta: { title: 'mixChart', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

