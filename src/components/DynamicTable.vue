<template>
  <md-table class="dynamic-table">
    <draggable v-model="headers" tag="tr">
      <md-table-head
        class="color-green"
        v-for="header in headers"
        :key="header"
        scope="col"
      >
        {{ header }}
      </md-table-head>
    </draggable>
    <md-table-row v-for="item in model" :key="item.name">
      <md-table-cell v-for="header in headers" :md-label="header" :key="header">
        {{ item[header] }}
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: { draggable },
  props: {
    model: {
      required: true
    }
  },
  data() {
    return {
      headers: []
    };
  },
  beforeMount() {
    this.headers = Object.keys(this.model[0]);
  }
};
</script>

<style>
.dynamic-table {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.color-green {
  color: #ffffff !important;
  background: #212121;
}
</style>
