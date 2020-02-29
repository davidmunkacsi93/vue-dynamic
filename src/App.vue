<template>
  <div id="app" class="page-container">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <md-app>
      <md-app-content>
        <grid-layout
          :layout.sync="mainLayoutItems"
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
          <template v-for="item in mainLayoutItems">
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
            >
              <menu-bar :type="MENU" v-if="item.layoutItemType === MENU" />
              <dynamic-content
                :x="item.x"
                :y="item.y"
                :type="CONTENT"
                :id="item.id"
                v-else-if="item.layoutItemType === CONTENT"
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
  SET_MAIN_LAYOUT_ITEMS,
  LOAD_APIS,
  SET_SCREEN_INFORMATION
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
    this.$store.dispatch(LOAD_MAIN_LAYOUT);
    this.$store.dispatch(LOAD_APIS);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  computed: {
    mainLayoutItems: {
      get() {
        return this.$store.state.mainLayout.mainLayoutItems;
      },
      set(layoutItems) {
        this.$store.dispatch(SET_MAIN_LAYOUT_ITEMS, layoutItems);
      }
    }
  },
  methods: {
    onWindowResize() {
      this.$store.dispatch(
        SET_SCREEN_INFORMATION,
        document.documentElement.clientWidth
      );
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
