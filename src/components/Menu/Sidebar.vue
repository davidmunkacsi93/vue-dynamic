<template>
  <div>
    <div>
      <div @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    </div>
    <transition name="slide">
      <div v-if="isPanelOpen">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>