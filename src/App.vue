<template>
  <div id="app">
    <nav class="main-nav">
      <burger />
    </nav>
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
    <grid-layout :layoutItems.sync="layoutItems">
      <grid-item
        v-for="item in layoutItems"
        :key="item.id"
        :id="item.id"
        :x="item.x"
        :y="item.y"
        :width="item.width"
        :height="item.height"
        :draggable="item.draggable"
        @moved="moved"
      ></grid-item>
    </grid-layout>
  </div>
</template>

<script>
import Burger from "./components/Menu/Burger.vue";
import Sidebar from "./components/Menu/Sidebar.vue";

import GridItem from "./components/Grid/GridItem.vue";
import GridLayout from "./components/Grid/GridLayout.vue";

let layoutItems = [
  { x: 0, y: 0, width: 100, height: 100, id: 0, draggable: true },
  { x: 200, y: 200, width: 100, height: 100, id: 1, draggable: true }
];

export default {
  name: "app",
  components: {
    Burger,
    Sidebar,
    GridItem,
    GridLayout
  },
  methods: {
    moved: function(id, newX, newY) {
      console.log("Moved " + id + " X=" + newX + ", Y=" + newY);
    }
  },
  data() {
    return {
      layoutItems: JSON.parse(JSON.stringify(layoutItems))
    };
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
