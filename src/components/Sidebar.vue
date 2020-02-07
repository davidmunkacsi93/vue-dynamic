<template>
  <div>
    <md-toolbar layout="column">
      Navigation
    </md-toolbar>

    <md-list>
      <md-list-item>
        <md-icon>build</md-icon>
        <span class="md-list-item-text">My APIs</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isPanelOpen: state => state.menu.isNavOpen
    })
  },
  methods: {
    closeSidebarPanel() {
      this.$store.dispatch("toggleNav");
    }
  }
};
</script>

<style></style>
