import axios from "axios";
import router from "@/router";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default axios;
