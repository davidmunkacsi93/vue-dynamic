<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"
    />
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
    <grid-layout
      :layout.sync="layoutItems"
      :col-num="12"
      :row-height="40"
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
          <dynamic-form v-else-if="item.layoutItemType === FORM" />
        </grid-item>
      </template>
    </grid-layout>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DynamicForm from "./components/DynamicForm.vue";
import GridItem from "./components/GridItem.vue";
import GridLayout from "./components/GridLayout.vue";
import MenuBar from "./components/MenuBar.vue";
import Sidebar from "./components/Sidebar.vue";

import { LOAD_LAYOUT, SET_LAYOUT_ITEMS } from "./types/action-types";
import { FORM, MENU } from "./types/layout-item-types";

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
      FORM: FORM,
      MENU: MENU
    };
  },
  computed: {
    layoutItems: {
      get: function() {
        return this.$store.state.layout.layoutItems;
      },
      set: function(layoutItems) {
        this.$store.dispatch(SET_LAYOUT_ITEMS, layoutItems);
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch(LOAD_LAYOUT);
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
  font-family: "Lato";
  height: 100%;
  background: rgb(101, 31, 87);
  background: linear-gradient(to right, rgb(58, 123, 213), rgb(58, 96, 115));
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
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
