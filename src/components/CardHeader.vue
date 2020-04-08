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
        <md-menu-item v-if="!isEditModeEnabled" @click="enableEditMode">
          <span>Edit Form Layout</span>
          <md-icon>edit</md-icon>
        </md-menu-item>
        <md-menu-item v-if="isEditModeEnabled" @click="saveFormLayout">
          <span>Save Form Layout</span>
          <md-icon>save</md-icon>
        </md-menu-item>
        <md-menu-item @click="removeGridItem">
          <span>Remove</span>
          <md-icon>clear</md-icon>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </md-card-header>
</template>

<script>
import EventBus from '../utils/event-bus';
import {
  SAVE_FORM_LAYOUT,
  DISABLE_EDIT_MODE_FORM,
  ENABLE_EDIT_MODE_FORM
} from '../types/event-types';
export default {
  data() {
    return {
      isEditModeEnabled: false
    };
  },
  methods: {
    enableEditMode() {
      this.isEditModeEnabled = true;

      var payload = {
        uuid: this.uuid
      };

      EventBus.$emit(ENABLE_EDIT_MODE_FORM, payload);
    },
    saveFormLayout() {
      this.isEditModeEnabled = false;

      var payload = {
        uuid: this.uuid
      };

      EventBus.$emit(DISABLE_EDIT_MODE_FORM, payload);
      EventBus.$emit(SAVE_FORM_LAYOUT, payload);
    },
    removeGridItem() {
      // TODO: Implement remove grid item.
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

<style>
.md-title {
  overflow-wrap: break-word !important;
}
</style>
