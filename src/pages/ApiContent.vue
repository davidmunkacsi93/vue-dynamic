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

const OTHER_TAG_KEY = 'Other';

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
        this.fetchData(apiModelId);
        next();
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
    fetchData(apiModelId) {
      this.fetchModel(apiModelId);
      this.fetchDynamicComponents(apiModelId);
    },

    fetchModel(apiModelId) {
      ApiModelRepository.getApiModelById(apiModelId).then((apiModel) => {
        this.innerApiModel = apiModel;
      });
    },

    fetchDynamicComponents(apiModelId) {
      DynamicComponentRepository.getDynamicComponentsByApiModelId(
        apiModelId
      ).then((dynamicComponents) => {
        this.innerDynamicComponents = dynamicComponents;
        this.setTags();
      });
    },

    setTags() {
      this.tags = this.getTags(this.innerDynamicComponents);
      console.log(this.tags);

      this.tags.forEach((tag) => {
        this.$set(
          this.dynamicComponentsByTags,
          tag,
          this.innerDynamicComponents.filter((dynamicComponent) => {
            if (!dynamicComponent.tags) return false;

            return dynamicComponent.tags.includes(tag);
          })
        );
      });

      var notTagged = this.innerDynamicComponents.filter(
        (dynamicComponent) =>
          !dynamicComponent.tags || dynamicComponent.tags.length === 0
      );
      if (notTagged && notTagged.length > 0) {
        this.$set(this.dynamicComponentsByTags, OTHER_TAG_KEY, notTagged);
      }
    },

    getTags(dynamicComponents) {
      var taggedItems = dynamicComponents
        .map((layoutItem) => layoutItem.tags)
        .filter((tags) => tags);
      if (!taggedItems || taggedItems.length === 0) return [OTHER_TAG_KEY];

      var tags = taggedItems
        .filter((tags) => tags)
        .reduce((acc, val) => [...acc, ...val])
        .filter(
          (value, index, collection) => collection.indexOf(value) === index
        );

      var hasNotTaggedItems = dynamicComponents.some(
        (dynamicComponent) =>
          !dynamicComponent.tags || dynamicComponent.tags.length === 0
      );
      if (hasNotTaggedItems) {
        tags.push(OTHER_TAG_KEY);
      }

      return tags;
    }
  }
};
</script>
<style>
.md-tabs-content {
  height: auto !important;
}

.api-content {
  padding: 10px 10px 0px 10px;
}
</style>
