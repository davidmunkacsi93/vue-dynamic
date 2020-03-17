<script>
import { GridLayout } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { LAYOUT_UPDATED } from "../types/event-types";
import BinPack from "bin-pack";
import { SET_API_LAYOUT_ITEMS } from '../types/action-types';

export default {
  name: "GridLayout",
  extends: GridLayout,
  props: {
    packingRequired: {
      type: Boolean,
      required: true
    }
  },
  created: function() {
    EventBus.$on(LAYOUT_UPDATED, this.handleLayoutUpdated);
  },
  beforeDestroy: function() {
    EventBus.$off(LAYOUT_UPDATED, this.handleLayoutUpdated);
  },
  mounted() {
    setTimeout(() => {
      if (this.packingRequired) {
        this.binPackLayoutItems();
      }
    }, 300);
  },
  methods: {
    handleLayoutUpdated() {
      this.layoutUpdate();
    },
    binPackLayoutItems() {
      if (!this.layout) return;
      var bins = this.layout.map(layoutItem => {
        return {
          height: layoutItem.h,
          width: layoutItem.w,
          uuid: layoutItem.uuid
        };
      });
      var binPackedLayout = BinPack(bins);

      if (!binPackedLayout) return;
      binPackedLayout.items.forEach(bin => {
        var uuid = bin.item.uuid;
        var layoutItem = this.layout.find(item => item.uuid == uuid);
        layoutItem.x = bin.x % this.colNum;
        layoutItem.y = bin.y;
      });
      this.$store.dispatch(SET_API_LAYOUT_ITEMS, this.layout);
    }
  }
};
</script>
