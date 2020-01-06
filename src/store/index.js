import Vue from "vue";
import Vuex from "vuex";
import menu from "./modules/menu";
import layout from "./modules/layout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu: menu,
    layout: layout
  }
});
