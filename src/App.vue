<template>
  <div id="app" class="page-container">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <md-app>
      <md-app-content>
        <grid-layout
          ref="mainLayout"
          :layout="mainLayout"
          :compacted="true"
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
              ></navigation-bar>
            </grid-item>
          </template>
        </grid-layout>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Vue from "vue";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import VueRouter from "vue-router";

import DynamicContent from "./components/DynamicContent.vue";
import GridItem from "./components/GridItem.vue";
import GridLayout from "./components/GridLayout.vue";
import MenuBar from "./components/MenuBar.vue";
import NavigationBar from "./components/NavigationBar.vue";

import EventBus from "./utils/event-bus";

import routes from "./routes";

import { getCurrentScreenClass } from "./utils/responsive-utils";

import {
  LOAD_MAIN_LAYOUT,
  LOAD_APIS,
  SET_SCREEN_CLASS
} from "./types/action-types";
import { CONTENT, MENU, NAVIGATION_BAR } from "./types/layout-item-types";
import { DYNAMIC_CONTENT_HEIGHT_UPDATED } from "./types/event-types";

Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: routes
});

export default {
  name: "app",
  router,
  components: {
    DynamicContent,
    GridItem,
    GridLayout,
    MenuBar,
    NavigationBar
  },
  data() {
    return {
      screenClass: null,
      mainLayout: [],
      CONTENT,
      MENU,
      NAVIGATION_BAR
    };
  },
  beforeCreate() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onWindowResize);
      this.onWindowResize();
    });

    this.screenClass = getCurrentScreenClass();
    this.$store.dispatch(LOAD_MAIN_LAYOUT, this.screenClass);
    this.$store.dispatch(LOAD_APIS);
  },
  created() {
    EventBus.$on(DYNAMIC_CONTENT_HEIGHT_UPDATED, this.onDynamicHeightUpdated);
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
    EventBus.$off(DYNAMIC_CONTENT_HEIGHT_UPDATED, this.onDynamicHeightUpdated);
  },
  methods: {
    onWindowResize() {
      var currentScreenClass = getCurrentScreenClass();

      var screenClassChanged = this.screenClass !== currentScreenClass;
      if (screenClassChanged) {
        this.screenClass = currentScreenClass;
        this.$store.dispatch(SET_SCREEN_CLASS, this.screenClass);
        this.loadMainLayout();
      }
    },
    onDynamicHeightUpdated() {
      this.$refs.mainLayout.updateHeight();
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

.md-content {
  padding: 0px;
}
</style>
