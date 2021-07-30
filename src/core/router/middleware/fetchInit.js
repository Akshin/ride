import { auth } from "@/core/services/auth";
import store from "@/core/services/store";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

let isFirstRequest = true;

export const fetchInit = (to) => {
  if (!isFirstRequest) return;

  store.dispatch(RESET_LAYOUT_CONFIG);

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.loggedIn()) {
      store.dispatch("init");
      isFirstRequest = false;
    }
  }
};
