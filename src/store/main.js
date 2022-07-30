import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => {
  return {
    darkMode: false,

    // auth
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
    roles: JSON.parse(localStorage.getItem("roles")) || [],
    permissions: JSON.parse(localStorage.getItem("permissions")) || [],
    usAddress: JSON.parse(localStorage.getItem("usAddress")) || [],

    // permissions
    permissionsAll: [],

    // roles
    rolesAll: []
  };
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
