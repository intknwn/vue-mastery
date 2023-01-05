import Vue from 'vue'
import VueRouter from 'vue-router'
import nProgress from 'nprogress'
import EventCreate from '../views/EventCreate.vue'
import EventShow from '../views/EventShow.vue'
import EventList from '../views/EventList.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter: async (routeTo, routeFrom, next) => {
      const event = await store.dispatch(
        'event/fetchEventById',
        routeTo.params.id
      )
      routeTo.params.event = event
      next()
    },
  },
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  nProgress.start()
  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
