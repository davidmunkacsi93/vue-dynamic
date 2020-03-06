<template>
  <div>
    <grid-layout
      :layout="apiLayout"
      :col-num="12"
      :rowHeight="rowHeight"
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
          :margin="[15, 15]"
          :rowHeight="rowHeight"
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
            :model="item"
            :type="FORM"
          ></dynamic-form>
        </grid-item>
      </template>
    </grid-layout>
  </div>
</template>
<script>
import { v1 as uuid } from "uuid";
import {
  SET_API_LAYOUT_ITEMS,
  LOAD_API_LAYOUT,
  SAVE_API_LAYOUT
} from "../types/action-types";

import DynamicForm from "../components/DynamicForm";
import DynamicHeader from "../components/DynamicHeader";
import {
  DROP_DOWN,
  FORM,
  HEADER,
  INPUT,
  SWITCH
} from "../types/layout-item-types";

export default {
  components: { DynamicForm, DynamicHeader },

  data() {
    return {
      currentApiId: 0,
      rowHeight: 30,
      FORM: FORM,
      HEADER: HEADER,
      apiLayout: [],
      apiModel: {}
    };
  },

  beforeUpdate() {
    this.loadCurrentApiLayout(this);
    if (!this.apiLayout || this.apiLayout.length === 0) {
      this.apiLayout = this.getDefaultLayout();
      this.$store.dispatch(SET_API_LAYOUT_ITEMS, this.apiLayout);
    }
  },

  beforeRouteEnter(to, from, next) {
    const nextApiId = to.params.apiId;
    next(vm => {
      console.log(nextApiId);
      vm.$store.dispatch(LOAD_API_LAYOUT, nextApiId);
      this.loadCurrentApiLayout(vm);
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.currentApiId = to.params.apiId;
    this.$store.dispatch(SAVE_API_LAYOUT);
    this.$store.dispatch(LOAD_API_LAYOUT, this.currentApiId);
    this.loadCurrentApiLayout(this);
    next();
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SAVE_API_LAYOUT);
    next();
  },

  // computed: {
  //   ...mapState({
  //     apiModel: state => state.apiLayouts.apis[state.apiLayouts.currentApiId]
  //   }),
  //   apiLayout: {
  //     get() {
  //       console.log("Calling get...");
  //       console.log(
  //         this.$store.state.apiLayouts.apis[
  //           this.$store.state.apiLayouts.currentApiId
  //         ].apiLayout
  //       );
  //       return this.$store.state.apiLayouts.apis[
  //         this.$store.state.apiLayouts.currentApiId
  //       ].apiLayout;
  //     },
  //     set(layoutItems) {
  //       console.log("Calling set");
  //       this.$store.dispatch(SET_API_LAYOUT_ITEMS, layoutItems);
  //     }
  //   }
  // },

  methods: {
    loadCurrentApiLayout(viewModel) {
      viewModel.apiModel =
        viewModel.$store.state.apiLayouts.apis[
          viewModel.$store.state.apiLayouts.currentApiId
        ];
      viewModel.apiLayout = viewModel.apiModel.apiLayout;
    },

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
        h: 4,
        i: 0,
        uuid: uuid(),
        isDraggable: true,
        isResizable: true,
        static: true,
        layoutItemType: HEADER
      };
    },
    createDynamicComponents() {
      var dynamicComponents = [];
      // TODO: Extend to other dynamic components. Currently only supporting forms.
      var forms = this.apiModel.dynamicComponents.filter(
        dynamicComponent => dynamicComponent.type === FORM
      );

      forms.forEach((dynamicComponent, index) => {
        var component = {
          x: 0,
          y: 0,
          w: 6,
          h: this.calculateFormHeight(dynamicComponent.controls),
          i: index + 1,
          uuid: uuid(),
          isDraggable: true,
          isResizable: true,
          static: true,
          layoutItemType: FORM,
          description: dynamicComponent.description,
          path: dynamicComponent.path,
          httpMethod: dynamicComponent.httpMethod,
          controls: dynamicComponent.controls
        };
        dynamicComponents.push(component);
      });
      return dynamicComponents;
    },
    calculateFormHeight(controls) {
      const header = 91.08;
      const actions = 51.96;
      const switchHeight = 48;
      const inputHeight = 83.96;
      const dropDownHeight = 84;

      const countSwitches = controls.filter(
        control => control.element === SWITCH
      ).length;
      const countInput = controls.filter(control => control.element === INPUT)
        .length;
      const countDropDown = controls.filter(
        control => control.element === DROP_DOWN
      ).length;

      var result =
        Math.floor(
          header +
            actions +
            countInput * inputHeight +
            countSwitches * switchHeight +
            countDropDown * dropDownHeight
        ) / this.rowHeight;
      return result;
    }
  }
};
</script>
<style></style>
