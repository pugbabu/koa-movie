import Vue from 'vue'
import Router from 'vue-router'

const Test = (resolve) => {
  import('../components/test/test').then(module => {
    resolve(module)
  })
}
const Playing = (resolve) => {
  import('../components/playing/playing').then(module => {
    resolve(module)
  })
}
const Coming = (resolve) => {
  import('../components/coming/coming').then(module => {
    resolve(module)
  })
}
const Popular = (resolve) => {
  import('../components/popular/popular').then(module => {
    resolve(module)
  })
}



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Test        
    },
    {
      path: '/playing',
      name: 'Playing',
      component: Playing
    },
    {
      path: '/coming',
      name: 'Coming',
      component: Coming
    },
    {
      path: '/popular',
      name: 'Popular',
      component: Popular
    },

  ]
})
