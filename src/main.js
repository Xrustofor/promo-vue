import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router.js";
import store from "./store"; 

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const documentTitle = to.meta.title;
  document.title = documentTitle;
  next();
});


new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
