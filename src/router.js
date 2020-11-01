import Vue from "vue";
import Router from "vue-router";
import store from "./store/index"; 

Vue.use(Router);
Vue.use(store);

import appListPromo from "./pages/appListPromo.vue"
import appUpdatePromo from "./pages/appUpdatePromo.vue"
import appPromoTable from "./pages/appPromoTable.vue"
import appCreatePromo from "./pages/appCreatePromo.vue"

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: appListPromo,
      meta: {title: "Список об'яв"}
    },
    {
      path: "/promo-table",
      name: "promo-table",
      component: appPromoTable,
      meta: {title: "Операції над об'явами"}
    },
    {
      path: "/create/0",
      name: "create",
      component: appCreatePromo,
      meta: {title: "Створення об'яви"},
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: appUpdatePromo,
      meta: {title: "Редагування об'яви"}
    },
  ]
})