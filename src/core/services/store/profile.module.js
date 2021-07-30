import api from "@/core/api";
import ru from "@/core/locale/ru";

const state = {
  user: {},
};

const getters = {
  user: (state) => state.user,
  getUserRoles: (state) => {
    if (!state.user.data) return [];
    return state.user.data.role;
  },
  getUserRoleNames: (state, getters) => {
    return getters.getUserRoles.reduce((acc, role, i, arr) => {
      let str = acc + ru[role.name];
      if (i + 1 !== arr.length) str += ', ';
      return str;
    }, '')
  },
  userRoleIs: (state) => (role) => {
    return state.getUserRoles.includes(role);
  }
};

const actions = {
  init: async ({ dispatch }) => {
    await dispatch("getUser");
  },
  getUser: async ({ commit }) => {
    try {
      const { data } = await api.getUser();
      commit("setUser", data);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
