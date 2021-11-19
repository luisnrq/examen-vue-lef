import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Peliculas from './components/Peliculas.vue';
import BuscarPelicula from './components/BuscarPelicula.vue';

Vue.use(VueRouter);

const routes = [
  {path: "/", component: Home},
  {path: '/home', component: Home},
  {path: '/peliculas/:idpelicula', component: Peliculas},
  {path: '/peliculas/genero/:idgenero', component: Peliculas},
  {path: '/peliculas/nacionalidad/:idnacionalidad', component: Peliculas},
  {path: "/buscarpelicula/:nombre?", component: BuscarPelicula }
]

const router = new VueRouter ({
  routes,
  mode: "history"
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
