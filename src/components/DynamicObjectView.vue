<template>
  <md-list class="md-double-line">
    <draggable>
      <md-list-item v-for="header in headers" :key="header">
        <div class="md-list-item-text">
          <span>{{ header }}</span>
          <span v-if="Array.isArray(model)">{{ model[0][header] }}</span>
          <span v-else>{{ model[header] }}</span>
        </div>
      </md-list-item>
    </draggable>
  </md-list>
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
  watch: {
    model: function (value) {
      this.model = value;
      this.headers = Object.keys(this.model);
    }
  }
};
</script>

<style></style>
