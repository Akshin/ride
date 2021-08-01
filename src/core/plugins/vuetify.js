import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ru from "vuetify/lib/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#3699FF",
        secondary: "#e8ecfa",
        accent: "#5d78ff",
        error: "#fd397a",
        info: "#5578eb",
        success: "#0abb87",
        warning: "#ffb822"
      }
    }
  },
  lang: {
    locales: { ru },
    current: "ru"
  }
});
