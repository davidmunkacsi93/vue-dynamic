<script>
import {
  REMOVE_FORM,
  SET_API_ITEM_HEIGHT,
  // SET_API_ITEM_WIDTH,
  SET_API_ITEM_INTIAILIZED
} from "../types/action-types";
import { FORM, HEADER, LIST } from "../types/layout-item-types";

export default {
  props: {
    apiVersion: {
      type: String
    },
    controls: {
      type: Array
    },
    description: {
      type: String
    },
    httpMethod: {
      type: String
    },
    initialized: {
      type: Boolean
    },
    path: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: String
    }
  },
  mounted() {
    if (!this.initialized) {
      this.setGridItemHeight();
      // this.setGridItemWidth();
      this.$store.dispatch(SET_API_ITEM_INTIAILIZED, this.$parent.$attrs.uuid);
    }
  },
  data() {
    return {
      FORM: FORM,
      HEADER: HEADER,
      LIST: LIST,

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
      var cardHeight = this.$refs.dynamicComponent.$el.clientHeight;
      var gridinnerH = Math.ceil(cardHeight / rowHeight);
      this.$store.dispatch(SET_API_ITEM_HEIGHT, {
        uuid: gridItem.$attrs.uuid,
        height: gridinnerH
      });
    }
    // setGridItemWidth() {
    //   var gridItem = this.$parent;
    //   var canvas = this.$refs.canvas;
    //   var context = canvas.getContext("2d");
    //   context.font = "bold 24px Roboto";

    //   var textMetrics = context.measureText(this.$refs.cardTitle.innerText);
    //   var colWidth = gridcontainerWidth / gridcols;
    //   var calculatedWidth = Math.ceil(textMetrics.width / colWidth);
    //   if (calculatedWidth > gridinnerW) {
    //     gridinnerW = calculatedWidth;
    //     this.$store.dispatch(SET_API_ITEM_WIDTH, {
    //       uuid: grid$attrs.uuid,
    //       width: gridinnerW
    //     });
    //   }
    // }
  }
};
</script>

<style></style>
