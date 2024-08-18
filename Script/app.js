// Define routes. Each route map to a component.
const routes = [
    {path: '/', component: home},
    {path: '/project', component: project},
    {path: '/login', component: login},
    {path: '/register', component: register}
  ]

// Create the router instance and pass the `routes` option
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  })

// Create app instance
const app = Vue.createApp({
    data() {
      return {
      }
    },
    methods: {
    }
  })
  
// Nav component
import nav_template from './Components/nav.js'
app.component('app-nav', 
{
    template: nav_template
}
)
  
  // 4. Mount the root instance.
  app.use(router)
  app.mount('#app')