import Vue from "vue";
import Vuex from "vuex";
import menu from "./modules/menu";
import mainLayout from "./modules/main-layout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu: menu,
    mainLayout: mainLayout
  }
});
