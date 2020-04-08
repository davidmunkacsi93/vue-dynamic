import {
  DISABLE_EDIT_MODE_API_LAYOUT,
  ENABLE_EDIT_MODE_API_LAYOUT
} from '../../types/action-types';

import EventBus from '../../utils/event-bus';

const state = {
  isEditModeActive: false
};

const mutations = {
  disableEditModeApiLayout(state) {
    state.isEditModeActive = false;
    EventBus.$emit(DISABLE_EDIT_MODE_API_LAYOUT);
  },

  enableEditModeApiLayout(state) {
    state.isEditModeActive = true;
    EventBus.$emit(ENABLE_EDIT_MODE_API_LAYOUT);
  }
};

const actions = {
  disableEditModeApiLayout({ commit }) {
    commit(DISABLE_EDIT_MODE_API_LAYOUT);
  },
  enableEditModeApiLayout({ commit }) {
    commit(ENABLE_EDIT_MODE_API_LAYOUT);
  }
};

export default { state, mutations, actions };
