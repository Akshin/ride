import { auth } from "@/core/services/auth";

export const authGuard = (to, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
