<script>
import { REMOVE_FORM } from "../types/action-types";

export default {
  props: {
    apiVersion: {
      type: String
    },
    baseURL: {
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
    callApiMethod() {
      var configuration = {
        baseURL: this.baseURL,
        url: this.path,
        method: this.httpMethod.toLowerCase()
      };
      this.$http
        .request(configuration)
        .then(response => console.log(response))
        .catch(reason => console.error(reason));
      console.log(this.httpMethod);
      console.log(this.baseURL + this.path);
    },
    removeGridItem() {
      this.$store.dispatch(REMOVE_FORM, this.id);
    }
  }
};
</script>

<style></style>
