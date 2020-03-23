<script>
import EventBus from "../utils/event-bus";
import { REQUEST_SUCCESSFUL, REQUEST_FAILED } from "../types/event-types";

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
        .then(response => {
          console.log(response);
          EventBus.$emit(REQUEST_SUCCESSFUL, {
            successMessage: response.toString()
          });
        })
        .catch(reason => {
          console.log(reason);
          EventBus.$emit(REQUEST_FAILED, { errorMessage: reason.toString() });
        });
    }
  }
};
</script>

<style>
.dynamic-component {
  height: auto;
  width: auto;
  margin: 0px !important;
}
.component-height {
  height: 100%;
}

.content-height {
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow-y: auto;
  height: 60%;
}

.title-height {
  height: auto;
}

.actions-height {
  height: auto;
}
</style>
