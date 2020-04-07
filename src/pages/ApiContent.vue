<template>
  <div ref="apiContent" class="api-content">
    <div ref="title" class="md-title">
      <h1>{{ innerApiModel.title }} - {{ innerApiModel.apiVersion }}</h1>
    </div>
    <div class="md-subtitle" v-if="innerApiModel.description">
      <h3>{{ innerApiModel.description }}</h3>
    </div>
    <md-tabs
      md-dynamic-height
      :md-active-tab="tags[0] + '-' + innerApiModel.id"
    >
      <md-tab
        v-for="tag in tags"
        :key="tag + '-' + innerApiModel.id"
        :id="tag + '-' + innerApiModel.id"
        :md-label="tag"
      >
        <api-tab-content
          :apiLayout="apiLayoutByTags[tag]"
          :baseURL="innerApiModel.serverURL"
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

import ApiModelRepository from '../repositories/api-model-repsository';
import DynamicComponentRepository from '../repositories/dynamic-component-repository';

export default {
  components: {
    ApiTabContent
  },
  props: {
    apiModel: {
      required: false,
      type: Object
    },
    dynamicComponents: {
      required: false,
      type: Array
    }
  },
  data() {
    return {
      innerApiModel: {},
      apiLayout: [],
      apiLayoutByTags: {},
      tags: []
    };
  },
  created() {
    window.addEventListener('resize', this.onWindowResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },

  mounted() {
    var apiModelId = parseInt(this.$router.currentRoute.params.id);
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
    next();
  },

  methods: {
    fetchData(apiModelId) {
      ApiModelRepository.getApiModelById(apiModelId).then((apiModel) => {
        this.innerApiModel = apiModel;
        console.log(this.innerApiModel);
      });

      DynamicComponentRepository.getDynamicComponentsByApiModelId(
        apiModelId
      ).then((dynamicComponents) => {
        this.apiLayout = dynamicComponents;
        this.setTags();
      });
    },
    
    setTags() {
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
