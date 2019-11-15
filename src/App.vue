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
    <grid-layout>
      <grid-item
        :id="'First Test Item'"
        :x="100"
        :y="100"
        :width="100"
        :height="100"
        :draggable="true"
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
  background: linear-gradient(
    45deg,
    rgb(241, 4, 4) 0%,
    rgba(225, 113, 87, 1) 48%,
    rgba(249, 248, 113, 1) 100%
  );
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
