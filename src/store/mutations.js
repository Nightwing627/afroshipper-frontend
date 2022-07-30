import Vue from "vue";
import * as types from "./mutation-types";

// mutations
const mutations = {
  [types.SET_DARK_MODE](state, { darkMode }) {
    state.darkMode = darkMode;
  },

  // auth
  [types.AUTH_REQUEST](state) {
    state.status = "loading";
  },
  [types.AUTH_SUCCESS](state, { token, user, roles, permissions }) {
    state.status = "success";
    if (token) state.token = token;
    if (user) state.user = user;
    if (roles) state.roles = roles;
    if (permissions) state.permissions = permissions;
  },
  [types.AUTH_ERROR](state) {
    state.status = "error";
  },
  [types.LOGOUT](state) {
    state.status = "";
    state.token = "";
    state.user = {};
    state.roles = [];
    state.permissions = [];
  },

  // permissions
  [types.PERMISSIONS](state, permissions) {
    state.permissionsAll = permissions;
  },

  // roles
  [types.ROLES](state, roles) {
    state.rolesAll = roles;
  }
};

export default mutations;
