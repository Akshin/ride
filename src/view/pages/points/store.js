import api from "@/api";
import router from "@/router";

const state = {
  address: {},
};

const getters = {
  address: (state) => state.address,
};

const actions = {
  getObject: ({ commit }) => {
    const id = router.currentRoute.params.id;

    api.getObjects().then((resp) => {
      const currentObject = resp.data.find((obj) => obj.id === id);
      commit("setObject", currentObject);
    });
  },
};

const mutations = {
  setObject: (state, currentObject) => {
    state.address = currentObject;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
