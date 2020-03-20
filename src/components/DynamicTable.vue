<template>
  <md-table v-model="list">
    <draggable v-model="headers" tag="tr">
      <md-table-head v-for="header in headers" :key="header" scope="col">
        {{ header }}
      </md-table-head>
    </draggable>

    <md-table-row v-for="item in list" :key="item.name">
      <md-table-cell v-for="header in headers" :md-label="header" :key="header">
        {{ item[header] }}
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  props: {
    tableModel: {
      type: Object,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: ["id", "name", "sport"],
      list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ]
    };
  }
};
</script>

<style></style>
