<template>
  <div>
    <md-list
      v-if="!Array.isArray(values) || values.length === 1"
      class="md-double-line"
    >
      <draggable>
        <md-list-item v-for="header in headers" :key="header">
          <div class="md-list-item-text">
            <span>{{ header }}</span>
            <span v-if="Array.isArray(values)">{{ values[0][header] }}</span>
            <span v-else>{{ values[header] }}</span>
          </div>
        </md-list-item>
      </draggable>
    </md-list>
    <md-table v-if="Array.isArray(values) && values.length > 1">
      <draggable v-model="headers" tag="tr">
        <md-table-head v-for="header in headers" :key="header" scope="col">
          {{ header }}
        </md-table-head>
      </draggable>
      <md-table-row v-for="item in values" :key="item.name">
        <md-table-cell
          v-for="header in headers"
          :md-label="header"
          :key="header"
        >
          {{ item[header] }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  props: {
    model: {
      type: Object,
      required: false
    },
    values: {
      required: true
    }
  },
  mounted() {
    if (
      !this.model ||
      !this.model.properties ||
      Object.keys(this.model).length === 0
    ) {
      this.runtimeModel = true;
    } else {
      this.staticModel = true;
      this.headers = this.model.properties.map(property => property.name);
    }
  },
  data() {
    return {
      headers: [],
      runtimeModel: false,
      staticModel: false
    };
  },
  watch: {
    values: function(value) {
      console.log(value);
      this.values = value;
    }
  }
};
</script>

<style></style>
