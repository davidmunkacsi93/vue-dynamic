<template>
  <md-card-header
    class="md-layout-item md-layout md-size-100"
    :class="{ 'title-height': initialized }"
  >
    <md-card-header-text class="md-layout-item md-size-90">
      <div class="md-title" ref="title">{{ path }}</div>
      <div class="md-subhead" v-if="description">{{ description }}</div>
    </md-card-header-text>
    <md-menu
      md-size="big"
      md-direction="bottom-end"
      class="md-layout-item md-size-10"
    >
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item @click="removeGridItem">
          <span>Remove</span>
          <md-icon>clear</md-icon>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </md-card-header>
</template>

<script>
export default {
  methods: {
    removeGridItem() {
      console.log(this.uuid);
    }
  },
  props: {
    description: {
      required: false
    },
    initialized: {
      type: Boolean,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    uuid: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
