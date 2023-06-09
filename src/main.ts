import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { routes } from './config/router'
import { App } from './App'
import { history } from './shared/history'



const router = createRouter({
    history,
    routes,
})

const app = createApp(App)
app.use(router)
    .mount('#app')
