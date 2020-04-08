import Vue from 'vue';
import Vuex from 'vuex';

import apiLayout from './modules/api-layout';
import mainLayout from './modules/main-layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    apiLayout: apiLayout,
    mainLayout: mainLayout
  }
});
