<template>
  <div id="app" class="page-container">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"
    />
    <grid-layout
      :layout.sync="layoutItems"
      :col-num="12"
      :row-height="35"
      :margin="[0, 0]"
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
          <menu-bar v-if="item.layoutItemType === MENU" />
          <dynamic-form
            :id="item.id"
            v-else-if="item.layoutItemType === FORM"
          />
        </grid-item>
      </template>
    </grid-layout>
    <sidebar>
      <ul class="sidebar-panel-nav">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </sidebar>
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DynamicForm from "./components/DynamicForm.vue";
import GridItem from "./components/GridItem.vue";
import GridLayout from "./components/GridLayout.vue";
import MenuBar from "./components/MenuBar.vue";
import Sidebar from "./components/Sidebar.vue";

import { LOAD_MAIN_LAYOUT, SET_MAIN_LAYOUT_ITEMS } from "./types/action-types";
import { FORM, MENU } from "./types/layout-item-types";

Vue.use(VueMaterial);

export default {
  name: "app",
  components: {
    DynamicForm,
    GridItem,
    GridLayout,
    MenuBar,
    Sidebar
  },
  data() {
    return {
      FORM,
      MENU
    };
  },
  beforeCreate() {
    this.$store.dispatch(LOAD_MAIN_LAYOUT);
  },
  computed: {
    layoutItems: {
      get() {
        return this.$store.state.mainLayout.layoutItems;
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

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}
</style>
