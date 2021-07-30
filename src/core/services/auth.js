import router from "../router";

class Auth {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }

  loggedIn() {
    return !!this.getToken();
  }

  getHeaders(multy = false) {
    const token = this.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (multy) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  }
}

export const auth = new Auth();
