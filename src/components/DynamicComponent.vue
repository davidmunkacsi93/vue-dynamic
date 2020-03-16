<script>
import { REMOVE_FORM } from "../types/action-types";

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
    },
    uuid: {
      required: true,
      type: String
    }
  },
  methods: {
    removeGridItem() {
      this.$store.dispatch(REMOVE_FORM, this.id);
    }
  }
};
</script>

<style></style>
