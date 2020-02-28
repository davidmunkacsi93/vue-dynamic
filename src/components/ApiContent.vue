<template>
  <div>
    <grid-layout
      :layout.sync="apiLayout"
      :col-num="12"
      :row-height="30"
      :margin="[3, 3]"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <template v-for="item in apiLayout">
        <grid-item
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :isDraggable="item.isDraggable"
          :isResizable="item.isResizable"
          :static="item.static"
          :key="item.i"
        >
          <dynamic-header
            v-if="item.layoutItemType === HEADER"
            :type="HEADER"
            :apiModel="apiModel"
          ></dynamic-header>
          <dynamic-form
            v-else-if="item.layoutItemType === FORM"
            :type="FORM"
          ></dynamic-form>
        </grid-item>
      </template>
    </grid-layout>
  </div>
</template>
<script>
import { v1 as uuid } from "uuid";
import { mapState } from "vuex";
import {
  SET_API_LAYOUT_ITEMS,
  LOAD_API_LAYOUT,
  SAVE_API_LAYOUT
} from "../types/action-types";

import DynamicForm from "../components/DynamicForm";
import DynamicHeader from "../components/DynamicHeader";
import { FORM, HEADER } from "../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../types/event-types";
import EventBus from "../utils/event-bus.js";

export default {
  components: { DynamicForm, DynamicHeader },

  data() {
    return {
      currentApiId: 0,
      FORM: FORM,
      HEADER: HEADER
    };
  },

  beforeUpdate() {
    if (!this.apiModel) {
      console.error("API model could not be read.");
    }
    if (!this.apiLayout || this.apiLayout.length === 0) {
      this.apiLayout = this.getDefaultLayout();
      EventBus.$emit(LAYOUT_UPDATED);
      EventBus.$emit(COMPACT);
    }
  },

  beforeRouteEnter(to, from, next) {
    const nextApiId = to.params.apiId;
    next(vm => {
      vm.$store.dispatch(LOAD_API_LAYOUT, nextApiId);
    });
  },

  beforeRouteUpdate(to, from, next) {
    const nextApiId = to.params.apiId;
    this.$store.dispatch(SAVE_API_LAYOUT);
    this.$store.dispatch(LOAD_API_LAYOUT, nextApiId);
    next();
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SAVE_API_LAYOUT);
    next();
  },

  computed: {
    ...mapState({
      apiModel: state => state.apiLayouts.currentApiModel
    }),
    apiLayout: {
      get() {
        return this.$store.state.apiLayouts.currentApiLayout;
      },
      set(layoutItems) {
        this.$store.dispatch(SET_API_LAYOUT_ITEMS, layoutItems);
      }
    }
  },

  methods: {
    getDefaultLayout() {
      var layout = [];
      layout.push(this.createHeader());
      this.createDynamicComponents().forEach(component =>
        layout.push(component)
      );
      return layout;
    },
    createHeader() {
      return {
        x: this.$parent.$parent.x,
        y: this.$parent.$parent.y,
        w: 12,
        h: 3,
        i: 0,
        uuid: uuid(),
        isDraggable: true,
        isResizable: true,
        static: false,
        layoutItemType: HEADER
      };
    },
    createDynamicComponents() {
      var dynamicComponents = [];
      // TODO: Extend to other dynamic components. Currently only supporting forms.
      this.apiModel.dynamicComponents
        .filter(c => c.type === FORM)
        .forEach((c, index) => {
          var component = {
            x: 3 + index * 3,
            y: 3,
            w: 6,
            h: 3,
            i: index + 1,
            uuid: uuid(),
            isDraggable: true,
            isResizable: true,
            static: false,
            layoutItemType: c.type
          };
          dynamicComponents.push(component);
        });
      return dynamicComponents;
    }
  }
};
</script>
<style></style>
