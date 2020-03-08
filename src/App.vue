<template>
  <div id="app" class="page-container">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <md-app>
      <md-app-content>
        <grid-layout
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
              :static="item.static"
              :key="item.id"
              :uuid="item.i"
            >
              <menu-bar v-if="item.layoutItemType === MENU" :type="MENU" />
              <dynamic-content
                v-else-if="item.layoutItemType === CONTENT"
                :x="item.x"
                :y="item.y"
                :type="CONTENT"
                :id="item.id"
              />
              <navigation-bar
                v-else-if="item.layoutItemType === NAVIGATION_BAR"
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

import routes from "./routes";

import {
  LOAD_MAIN_LAYOUT,
  LOAD_APIS,
  SET_SCREEN_INFORMATION,
  SET_SCREEN_CLASS
} from "./types/action-types";
import { CONTENT, MENU, NAVIGATION_BAR } from "./types/layout-item-types";

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
    this.$nextTick(function() {
      window.addEventListener("resize", this.onWindowResize);
      this.onWindowResize();
    });

    this.$store.dispatch(
      SET_SCREEN_INFORMATION,
      document.documentElement.clientWidth
    );
    this.$store.dispatch(
      LOAD_MAIN_LAYOUT,
      this.$store.state.responsive.screenClass
    );
    this.$store.dispatch(LOAD_APIS);
  },
  created() {
    this.loadMainLayout();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    onWindowResize() {
      this.screenClass = this.$store.state.responsive.screenClass;
      this.$store.dispatch(
        SET_SCREEN_INFORMATION,
        document.documentElement.clientWidth
      );

      var screenClassChanged =
        this.screenClass !== this.$store.state.responsive.screenClass;
      if (screenClassChanged) {
        this.screenClass = this.$store.state.responsive.screenClass;
        this.$store.dispatch(SET_SCREEN_CLASS, this.screenClass);
        this.loadMainLayout();
      }
    },
    loadMainLayout() {
      this.mainLayout = this.$store.state.mainLayout.mainLayouts[
        this.$store.state.responsive.screenClass
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
