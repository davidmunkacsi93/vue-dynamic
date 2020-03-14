<template>
  <md-card ref="dynamicForm" class="dynamic-form" md-with-hover>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title" ref="cardTitle">{{ path }}</div>
        <div class="md-subhead">{{ description }}</div>
      </md-card-header-text>
      <md-menu md-size="big" md-direction="bottom-end">
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

    <md-card-content>
      <md-list class="control-list">
        <md-list-item v-for="control in controls" :key="control.order">
          <md-datepicker
            v-model="control.value"
            v-if="control.element === DATE_PICKER"
          >
            <label>{{ control.label }}</label>
          </md-datepicker>
          <md-field v-if="control.element === DROP_DOWN">
            <label>{{ control.label }}</label>
            <md-select v-model="control.value">
              <md-option
                v-for="(value, name, index) in control.values"
                :value="value"
                :key="index"
              >
                {{ value }}
              </md-option>
            </md-select>
          </md-field>
          <md-switch
            v-model="control.value"
            v-if="control.element === SWITCH"
            >{{ control.label }}</md-switch
          >
          <md-field v-if="control.element === FLOAT_INPUT">
            <label>{{ control.label }}</label>
            <md-input
              v-model="control.value"
              type="number"
              step="0.01"
            ></md-input>
          </md-field>
          <md-field v-if="control.element === NUMBER_INPUT">
            <label>{{ control.label }}</label>
            <md-input v-model="control.value" type="number"></md-input>
          </md-field>
          <md-field v-if="control.element === TEXT_INPUT">
            <label>{{ control.label }}</label>
            <md-input v-model="control.value" type="text"></md-input>
          </md-field>
        </md-list-item>
      </md-list>
    </md-card-content>
    <md-card-actions>
      <md-button>{{ httpMethod }}</md-button>
    </md-card-actions>
    <canvas ref="canvas" width="0" height="0"></canvas>
  </md-card>
</template>
<script>
import { mapState } from "vuex";
import {
  REMOVE_FORM,
  SET_API_ITEM_HEIGHT,
  SET_API_ITEM_WIDTH,
  SET_API_ITEM_INTIAILIZED
} from "../types/action-types";
import {
  DROP_DOWN,
  FLOAT_INPUT,
  NUMBER_INPUT,
  TEXT_INPUT,
  PASSWORD_INPUT,
  SWITCH,
  DATE_PICKER
} from "../types/layout-item-types";

export default {
  props: {
    apiName: {
      type: String,
      required: false
    },
    controls: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    httpMethod: {
      type: String,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      DATE_PICKER: DATE_PICKER,
      DROP_DOWN: DROP_DOWN,
      FLOAT_INPUT: FLOAT_INPUT,
      NUMBER_INPUT: NUMBER_INPUT,
      PASSWORD_INPUT: PASSWORD_INPUT,
      TEXT_INPUT: TEXT_INPUT,
      SWITCH: SWITCH,

      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    removeGridItem() {
      this.$store.dispatch(REMOVE_FORM, this.id);
    },
    setGridItemHeight() {
      var gridItem = this.$parent;
      var rowHeight = this.$parent.rowHeight;
      var cardHeight = this.$refs.dynamicForm.$el.clientHeight;
      gridItem.innerH = Math.ceil(cardHeight / rowHeight);
      this.$store.dispatch(SET_API_ITEM_HEIGHT, {
        uuid: gridItem.$attrs.uuid,
        height: gridItem.innerH
      });
    },
    setGridItemWidth() {
      var gridItem = this.$parent;
      var canvas = this.$refs.canvas;
      var context = canvas.getContext("2d");
      context.font = "bold 24px Roboto";

      var textMetrics = context.measureText(this.$refs.cardTitle.innerText);
      var colWidth = gridItem.containerWidth / gridItem.cols;
      var calculatedWidth = Math.ceil(textMetrics.width / colWidth);
      if (calculatedWidth > gridItem.innerW) {
        gridItem.innerW = calculatedWidth;
        this.$store.dispatch(SET_API_ITEM_WIDTH, {
          uuid: gridItem.$attrs.uuid,
          width: gridItem.innerW
        });
      }
    }
  }
};
</script>
<style>
.dynamic-form {
  height: 100%;
  margin: 0px !important;
}
.control-list {
  padding: 0;
}
.md-title {
  height: auto;
  width: auto;
  word-wrap: break-word;
}
</style>
