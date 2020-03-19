<template>
  <div ref="apiContent">
    <div ref="title" class="md-title">
      <h1>{{ title }} - {{ apiVersion }}</h1>
    </div>
    <div class="md-subtitle" v-if="description">
      <h3>{{ description }}</h3>
    </div>
    <md-tabs>
      <md-tab
        v-for="(tag, index) in tags"
        :key="index"
        :id="'tab-' + tag"
        :md-label="tag"
      >
        {{ tag }}
      </md-tab>
    </md-tabs>
  </div>
</template>
<script>
import {
  LOAD_API_LAYOUT,
  SAVE_API_LAYOUT,
  SET_CONTENT_HEIGHT
} from "../types/action-types";

import ApiTabContent from "../components/ApiTabContent";
import EventBus from "../utils/event-bus";
import { getCurrentScreenClass } from "../utils/responsive-utils";

import { FORM, HEADER, LIST } from "../types/layout-item-types";
import {
  DYNAMIC_CONTENT_HEIGHT_UPDATED,
  LAYOUT_UPDATED
} from "../types/event-types";

export default {
  components: {
    ApiTabContent
  },
  data() {
    return {
      currentApiId: 0,
      rowHeight: 30,

      FORM: FORM,
      HEADER: HEADER,
      LIST: LIST,

      apiLayout: [],
      tags: [],
      apiModel: {},

      apiVersion: null,
      baseURL: null,
      description: null,
      title: null
    };
  },
  created() {
    EventBus.$on(LAYOUT_UPDATED, this.setDynamicContentHeight);
    window.addEventListener("resize", this.onWindowResize);
  },

  beforeDestroy() {
    EventBus.$off(LAYOUT_UPDATED, this.setDynamicContentHeight);
    window.removeEventListener("resize", this.onWindowResize);
  },

  mounted() {
    this.currentApiId = this.$router.currentRoute.params.apiId;
    this.$store.dispatch(LOAD_API_LAYOUT, this.currentApiId);
    this.setDynamicContentHeight();
    this.onWindowResize();
  },

  beforeUpdate() {
    this.setDynamicContentHeight();
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.apiLayouts.apis) next("/addApi");

      vm.currentApiId = to.params.apiId;
      vm.$store.dispatch(LOAD_API_LAYOUT, vm.currentApiId);
      vm.loadCurrentApiLayout();
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (!this.$store.state.apiLayouts.apis) {
      next("/addApi");
    }

    this.currentApiId = to.params.apiId;
    this.$store.dispatch(SAVE_API_LAYOUT);
    this.$store.dispatch(LOAD_API_LAYOUT, this.currentApiId);
    this.loadCurrentApiLayout();
    next();
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SAVE_API_LAYOUT);
    next();
  },

  methods: {
    onWindowResize() {
      var currentScreenClass = getCurrentScreenClass();

      var screenClassChanged = this.screenClass !== currentScreenClass;
      if (screenClassChanged) {
        this.screenClass = currentScreenClass;
        this.$store.dispatch(SAVE_API_LAYOUT);
        this.loadCurrentApiLayout();
        // EventBus.$emit(SCREEN_CLASS_CHANGED);
      }
    },

    loadCurrentApiLayout() {
      var currentApiId = this.$store.state.apiLayouts.currentApiId;
      this.apiModel = this.$store.state.apiLayouts.apis[currentApiId];
      this.apiLayout = this.apiModel.apiLayouts[this.screenClass];
      this.tags = this.getTags(this.apiLayout);

      console.log(this.tags);

      this.apiVersion = this.apiModel.apiVersion;
      this.baseURL = this.apiModel.serverURL;
      this.description = this.apiModel.description;
      this.title = this.apiModel.title;

      this.setDynamicContentHeight();
    },

    getTags(apiLayout) {
      return apiLayout
        .map(layoutItem => layoutItem.tags)
        .filter(tags => tags)
        .reduce((acc, val) => [...acc, ...val])
        .filter(
          (value, index, collection) => collection.indexOf(value) === index
        );
    },

    setDynamicContentHeight() {
      var dynamicContent = this.$parent.$parent.$parent;
      console.log(dynamicContent);
      var rowHeight = this.$parent.$parent.$parent.$parent.rowHeight;
      var apiContentHeight = this.$refs.apiContent.clientHeight;
      dynamicContent.innerH = Math.ceil(apiContentHeight / rowHeight);

      this.$store.dispatch(SET_CONTENT_HEIGHT, dynamicContent.innerH);
      EventBus.$emit(DYNAMIC_CONTENT_HEIGHT_UPDATED, dynamicContent.innerH);
    }
  }
};
</script>
<style></style>
