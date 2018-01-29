// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import OrderListPage from './pages/orderList'
import DetailAnaPage from './pages/detail/analysis'
import DetailPubPage from './pages/detail/publish'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    //  主页上的router-view即是IndexPage组件
    },
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        },
        {
          path: 'analysis',
          component: DetailAnaPage
        }
      ]
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
