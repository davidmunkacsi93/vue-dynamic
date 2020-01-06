<template>
  <div id="menu-bar" :class="{ active: isNavOpen }">
    <slot>
      <button
        type="button"
        class="fa fa-bars menu-item"
        title="Menu"
        @click.prevent="toggle"
      ></button>
      <button
        type="button"
        class="menu-item fa fa-plus add-panel-button"
      ></button>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isNavOpen: state => state.menu.isNavOpen
    })
  },
  methods: {
    toggle() {
      this.$store.dispatch("toggleNav");
    }
  }
};
</script>

<style>
.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.menu-item {
  position: relative;
  display: inline;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
}

.add-panel-button {
  float: right !important;
  right: 0;
}
</style>
