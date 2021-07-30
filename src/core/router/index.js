import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

import { getTitle } from "./middleware/getTitle";
import { authGuard } from "./middleware/guards";
import { fetchInit } from "./middleware/fetchInit";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  getTitle(to);
  fetchInit(to);
  authGuard(to, next);
});

export default router;
