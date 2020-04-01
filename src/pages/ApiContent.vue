<template>
  <div ref="apiContent" class="api-content">
    <div ref="title" class="md-title">
      <h1>{{ title }} - {{ apiVersion }}</h1>
    </div>
    <div class="md-subtitle" v-if="description">
      <h3>{{ description }}</h3>
    </div>
    <md-tabs md-dynamic-height :md-active-tab="tags[0] + '-' + currentApiId">
      <md-tab
        v-for="tag in tags"
        :key="tag + '-' + currentApiId"
        :id="tag + '-' + currentApiId"
        :md-label="tag"
      >
        <api-tab-content
          :apiLayout="apiLayoutByTags[tag]"
          :baseURL="baseURL"
        ></api-tab-content>
      </md-tab>
    </md-tabs>
  </div>
</template>
<script>
import { LOAD_API_LAYOUT, SAVE_API_LAYOUT } from '../types/action-types';

import ApiTabContent from '../components/ApiTabContent';
import { getCurrentScreenClass } from '../utils/responsive-utils';
import EventBus from '../utils/event-bus';
import { SCREEN_CLASS_CHANGED } from '../types/event-types';

export default {
  components: {
    ApiTabContent
  },
  data() {
    return {
      currentApiId: 0,
      rowHeight: 30,

      apiLayout: [],
      apiLayoutByTags: {},
      tags: [],
      apiModel: {},

      apiVersion: null,
      baseURL: null,
      description: null,
      title: null
    };
  },
  created() {
    window.addEventListener('resize', this.onWindowResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },

  mounted() {
    this.currentApiId = this.$router.currentRoute.params.apiId;
    this.$store.dispatch(LOAD_API_LAYOUT, this.currentApiId);
    this.onWindowResize();
    this.loadCurrentApiLayout();
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.state.apiLayouts.apis) next('/addApi');

      vm.currentApiId = to.params.apiId;
      vm.$store.dispatch(LOAD_API_LAYOUT, vm.currentApiId);
      vm.loadCurrentApiLayout();
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (!this.$store.state.apiLayouts.apis) {
      next('/addApi');
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
        EventBus.$emit(SCREEN_CLASS_CHANGED);
      }
    },

    loadCurrentApiLayout() {
      var currentApiId = this.$store.state.apiLayouts.currentApiId;

      this.apiModel = this.$store.state.apiLayouts.apis[currentApiId];
      this.apiLayout = this.apiModel.apiLayouts[this.screenClass];

      this.tags = this.getTags(this.apiLayout);
      this.tags.forEach((tag) => {
        this.apiLayoutByTags[tag] = this.apiLayout.filter((layoutItem) => {
          if (!layoutItem.tags) return false;

          return layoutItem.tags.includes(tag);
        });
      });

      var notTagged = this.apiLayout.filter(
        (layoutItem) => !layoutItem.tags || layoutItem.tags.length === 0
      );
      if (notTagged && notTagged.length > 0) {
        let otherTagKey = 'Other';
        this.tags.push(otherTagKey);
        this.apiLayoutByTags[otherTagKey] = notTagged;
      }

      this.apiVersion = this.apiModel.apiVersion;
      this.baseURL = this.apiModel.serverURL;
      this.description = this.apiModel.description;
      this.title = this.apiModel.title;
    },

    getTags(apiLayout) {
      var taggedItems = apiLayout
        .map((layoutItem) => layoutItem.tags)
        .filter((tags) => tags);
      if (!taggedItems || taggedItems.length === 0) return [];

      return taggedItems
        .filter((tags) => tags)
        .reduce((acc, val) => [...acc, ...val])
        .filter(
          (value, index, collection) => collection.indexOf(value) === index
        );
    }
  }
};
</script>
<style>
.md-tabs-content {
  height: auto !important;
}

.api-content {
  padding: 10px;
}
</style>