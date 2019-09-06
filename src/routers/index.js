import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL, // 修改会使index.html中的BASE_URL发生变化
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
      path: '/*',
      redirect: 'movie'
    }
  ]
})
