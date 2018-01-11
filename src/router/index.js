import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
<<<<<<< HEAD
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
Vue.use(Router)
=======
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
Vue.use(Router) // 引入之后想着注册
>>>>>>> origin/master

export default new Router({
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      component: Recommend
=======
      // component: Recommend 没生效不知道为什
      redirect: '/recommend' // 重定向到
>>>>>>> origin/master
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
<<<<<<< HEAD
      component: Singer
=======
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
>>>>>>> origin/master
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
