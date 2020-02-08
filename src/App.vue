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

      <!-- <md-app-content>
        <grid-layout
          :layout.sync="layoutItems"
          :col-num="12"
          :row-height="30"
          :margin="[3, 3]"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :responsive="true"
          :vertical-compact="true"
          :use-css-transforms="true"
        >
          <template v-for="item in layoutItems">
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
              <dynamic-form
                :type="FORM"
                :id="item.id"
                v-else-if="item.layoutItemType === FORM"
              />
              <navigation-bar
                v-else-if="item.layoutItemType === NAVIGATION_BAR"
              ></navigation-bar>
            </grid-item>
          </template>
        </grid-layout>
      </md-app-content> -->
    </md-app>
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import DynamicContent from "./components/DynamicContent.vue";
import GridItem from "./components/GridItem.vue";
import GridLayout from "./components/GridLayout.vue";
import MenuBar from "./components/MenuBar.vue";
import NavigationBar from "./components/NavigationBar.vue";

import { LOAD_MAIN_LAYOUT, SET_MAIN_LAYOUT_ITEMS } from "./types/action-types";
import { CONTENT, MENU, NAVIGATION_BAR } from "./types/layout-item-types";

Vue.use(VueMaterial);

export default {
  name: "app",
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
    this.$store.dispatch(LOAD_MAIN_LAYOUT);
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
