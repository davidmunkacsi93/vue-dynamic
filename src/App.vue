<template>
  <div id="app" class="page-container">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <md-app>
      <md-app-content>
        <grid-layout-base
          ref="mainLayout"
          class="main-layout"
          :layout="mainLayout"
          :col-num="12"
          :row-height="30"
          :margin="[0, 0]"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :responsive="true"
          :vertical-compact="true"
          :use-css-transforms="true"
        >
          <template v-for="item in mainLayout">
            <grid-item
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :isDraggable="item.isDraggable"
              :isResizable="item.isResizable"
              :initialized="item.initialized"
              :autoSizeRequired="item.autoSizeRequired"
              :type="item.type"
              :static="item.static"
              :key="item.id"
              :uuid="item.i"
            >
              <menu-bar v-if="item.type === MENU" :type="MENU" />
              <dynamic-content
                v-else-if="item.type === CONTENT"
                :x="item.x"
                :y="item.y"
                :type="CONTENT"
                :id="item.id"
              />
              <navigation-bar
                v-else-if="item.type === NAVIGATION_BAR"
                :apis="apis"
              ></navigation-bar>
            </grid-item>
          </template>
        </grid-layout-base>
      </md-app-content>
    </md-app>
    <speed-dial></speed-dial>
  </div>
</template>

<script>
import Vue from 'vue';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-light.css';

import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueForceNextTick from 'vue-force-next-tick';

import DynamicContent from './components/DynamicContent.vue';
import GridItem from './components/GridItem.vue';
import GridLayoutBase from './components/GridLayoutBase.vue';
import MenuBar from './components/MenuBar.vue';
import NavigationBar from './components/NavigationBar.vue';
import SpeedDial from './components/SpeedDial.vue';

import routes from './routes';

import ApiModelRepository from './repositories/api-model-repsository';
import ConfigurationRepository from './repositories/configuration-repository';

import ApiBootstrapper from './api-bootstrapper';

import { getCurrentScreenClass } from './utils/responsive-utils';

import {
  LOAD_MAIN_LAYOUT,
  LOAD_APIS,
  SET_SCREEN_CLASS
} from './types/action-types';
import { CONTENT, MENU, NAVIGATION_BAR } from './types/layout-item-types';
import EventBus from './utils/event-bus';
import { SCREEN_CLASS_CHANGED, AUTO_SIZE_COMPLETED } from './types/event-types';

Vue.use(VueForceNextTick);
Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

export default {
  name: 'app',
  router,
  components: {
    DynamicContent,
    GridItem,
    GridLayoutBase,
    MenuBar,
    NavigationBar,
    SpeedDial
  },
  data() {
    return {
      screenClass: null,
      mainLayout: [],
      apis: [],
      CONTENT,
      MENU,
      NAVIGATION_BAR
    };
  },
  beforeCreate() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
    });

    this.screenClass = getCurrentScreenClass();
    this.$store.dispatch(LOAD_MAIN_LAYOUT, this.screenClass);

    ConfigurationRepository.initializeConfigurations().then(() => {
      ConfigurationRepository.isApplicationBootstrapped().then((result) => {
        if (!result) {
          ApiBootstrapper.bootstrap(this.$apiIntegrationService).then(() => {
            ConfigurationRepository.setBootstrapped().then(() => {
              this.loadApiModels();
            });
          });
        } else {
          this.loadApiModels();
        }
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    onWindowResize() {
      var currentScreenClass = getCurrentScreenClass();

      var screenClassChanged = this.screenClass !== currentScreenClass;
      if (screenClassChanged) {
        this.screenClass = currentScreenClass;
        this.$store.dispatch(SET_SCREEN_CLASS, this.screenClass);
        EventBus.$emit(SCREEN_CLASS_CHANGED);
        this.loadMainLayout();
      }
    },
    loadApiModels() {
      ApiModelRepository.getApiModels().then((apiModels) => {
        this.apis = apiModels;
      });
    },
    loadMainLayout() {
      this.mainLayout = this.$store.state.mainLayout.mainLayouts[
        this.screenClass
      ];
    }
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  border: 0;
  margin: 0;
  padding: 0;
  height: 100%;
}

.md-app {
  height: 100%;
}

.page-container {
  height: 100%;
}

.main-layout {
  height: 100% !important;
}

.md-content {
  padding: 0px;
}
</style>
