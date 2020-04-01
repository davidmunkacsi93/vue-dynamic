import Vue from 'vue';
import Vuex from 'vuex';

import apiKeys from './modules/api-keys';
import apiLayouts from './modules/api-layouts';
import mainLayout from './modules/main-layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    apiKeys: apiKeys,
    apiLayouts: apiLayouts,
    mainLayout: mainLayout
  }
});
