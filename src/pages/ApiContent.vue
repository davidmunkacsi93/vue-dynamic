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
          :dynamicComponents="dynamicComponentsByTags[tag]"
          :baseURL="innerApiModel.serverURL"
        ></api-tab-content>
      </md-tab>
    </md-tabs>
  </div>
</template>
<script>
import ApiTabContent from '../components/ApiTabContent';
import { getCurrentScreenClass } from '../utils/responsive-utils';
import { SCREEN_CLASS_CHANGED } from '../types/event-types';

import ApiModelRepository from '../repositories/api-model-repsository';
import DynamicComponentRepository from '../repositories/dynamic-component-repository';
import EventBus from '../utils/event-bus';
import { DISABLE_EDIT_MODE_API_LAYOUT } from '../types/action-types';

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
      innerDynamicComponents: [],
      dynamicComponentsByTags: {},
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
    var apiModelId = parseInt(to.params.id);

    ApiModelRepository.getApiModelById(apiModelId).then((apiModel) => {
      if (apiModel) {
        next((vm) => {
          vm.$store.dispatch(DISABLE_EDIT_MODE_API_LAYOUT);
          vm.fetchData(apiModelId);
        });
      } else {
        next('/');
      }
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(DISABLE_EDIT_MODE_API_LAYOUT);
    var apiModelId = parseInt(to.params.id);

    ApiModelRepository.getApiModelById(apiModelId).then((apiModel) => {
      if (apiModel) {
        this.fetchData(apiModelId).then(() => {
          next();
        });
      } else {
        next('/');
      }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(DISABLE_EDIT_MODE_API_LAYOUT);

    next();
  },

  methods: {
    async fetchData(apiModelId) {
      this.resetData();
      return this.fetchModel(apiModelId).then(() => {
        return this.fetchDynamicComponents(apiModelId);
      });
    },

    fetchModel(apiModelId) {
      return ApiModelRepository.getApiModelById(apiModelId).then((apiModel) => {
        this.innerApiModel = apiModel;
      });
    },

    async fetchDynamicComponents(apiModelId) {
      return DynamicComponentRepository.getDynamicComponentsByApiModelId(
        apiModelId
      ).then((dynamicComponents) => {
        this.innerDynamicComponents = dynamicComponents;
        this.setTags();
      });
    },

    resetData() {
      this.tags = [];
      this.innerApiModel = {};
      this.innerDynamicComponents = {};
      this.dynamicComponentsByTags = {};
    },

    setTags() {
      this.tags = this.getTags(this.innerDynamicComponents);
      this.tags.forEach((tag) => {
        this.dynamicComponentsByTags[tag] = this.innerDynamicComponents.filter(
          (dynamicComponent) => {
            if (!dynamicComponent.tags) return false;

            return dynamicComponent.tags.includes(tag);
          }
        );
      });

      var notTagged = this.innerDynamicComponents.filter(
        (dynamicComponent) =>
          !dynamicComponent.tags || dynamicComponent.tags.length === 0
      );
      if (notTagged && notTagged.length > 0) {
        let otherTagKey = 'Other';
        this.tags.push(otherTagKey);
        this.dynamicComponentsByTags[otherTagKey] = notTagged;
      }
    },

    getTags(dynamicComponents) {
      var taggedItems = dynamicComponents
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
