<script>
import { mapState } from 'vuex';

import {
  DISABLE_EDIT_MODE_API_LAYOUT,
  ENABLE_EDIT_MODE_API_LAYOUT,
  DISABLE_EDIT_MODE_MAIN_LAYOUT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  SAVE_API_LAYOUT,
  SAVE_MAIN_LAYOUT
} from '../types/action-types';

import { API_ROUTE_NAME } from '../routes.js';
import EventBus from '../utils/event-bus';

export default {
  computed: {
    ...mapState({
      isApiLayoutEditable: (state) => state.apiLayout.isEditModeActive,
      isMainLayoutEditable: (state) => state.mainLayout.isEditModeActive,
      saveFormsRequired: (state) => state.apiLayout.saveFormsRequired
    })
  },
  data() {
    return {
      API_ROUTE_NAME: API_ROUTE_NAME
    };
  },
  methods: {
    editApiLayout() {
      this.$store.dispatch(ENABLE_EDIT_MODE_API_LAYOUT);
    },
    saveApiLayout() {
      this.$store.dispatch(DISABLE_EDIT_MODE_API_LAYOUT).then(() => {
        EventBus.$emit(SAVE_API_LAYOUT);
      });
    },
    editMainLayout() {
      this.$store.dispatch(ENABLE_EDIT_MODE_MAIN_LAYOUT);
    },
    saveMainLayout() {
      this.$store.dispatch(DISABLE_EDIT_MODE_MAIN_LAYOUT);
      this.$store.dispatch(SAVE_MAIN_LAYOUT);
    }
  }
};
</script>
