import Vue from "vue";
import Vuex from "vuex";
import main from "./main";
import topMenu from "./top-menu";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main: main,
    topMenu: topMenu
  }
});
