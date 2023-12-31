import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { routes } from './config/router'
import { App } from './App'
import { history } from './shared/history'
import '@svgstore';
import { useMeStore } from './stores/useMeStore';
import { createPinia } from 'pinia';


const router = createRouter({
    history,
    routes,
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

const meStore = useMeStore()
meStore.fetchMe()

const whiteList: Record<string, 'exact' | 'startsWith'> = {
    '/': 'exact',
    '/items': 'exact',
    '/welcome': 'startsWith',
    '/sign_in': 'startsWith',
  }
  
  router.beforeEach((to, from) => {
    for (const key in whiteList) {
      const value = whiteList[key]
      if (value === 'exact' && to.path === key) {
        return true
      }
      if (value === 'startsWith' && to.path.startsWith(key)) {
        return true
      }
    }
    return meStore.mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + from.path
    )
})


