<template>
  <div>
    <div>
      <div @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    </div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    isPanelOpen: true
  }),
  methods: {
    closeSidebarPanel() {
      this.isPanelOpen = false;
    }
  }
};
</script>

<style>
.sidebar-panel {
  overflow-y: auto;
  background-color: #130f40;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}
</style>