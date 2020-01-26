<template>
  <div id="app">
    <menu-bar />
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
      :row-height="30"
      :margin="[0, 0]"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layoutItems"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :static="true"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import MenuBar from "./components/Menu/MenuBar.vue";
import Sidebar from "./components/Menu/Sidebar.vue";

import GridItem from "./components/Layout/GridItem.vue";
import GridLayout from "./components/Layout/GridLayout.vue";

//import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    MenuBar,
    Sidebar,
    GridItem,
    GridLayout
  },
  computed: {
    layoutItems: {
      get: function() {
        return this.$store.state.layout.layoutItems;
      },
      set: function(layoutItems) {
        console.log(layoutItems);
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadLayout");
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
  overflow: hidden;
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
