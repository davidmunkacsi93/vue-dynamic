import {
  SAVE_API_KEYS,
  ADD_API_KEY,
  LOAD_API_KEYS
} from '../../types/action-types';

const LOCAL_STORAGE_API_KEYS_KEY = 'api-keys';

const state = {
  apiKeys: {}
};

const mutations = {
  addApiKey(state, payload) {
    state.apiKeys[payload.url] = payload.apiKey;
  },
  loadApiKeys(state) {
    const apiKeyString = localStorage.getItem(LOCAL_STORAGE_API_KEYS_KEY);
    if (!apiKeyString) {
      return;
    }
    const parsed = JSON.parse(apiKeyString);
    state.apiKeys = parsed;
  },
  saveApiKeys(state) {
    localStorage.setItem(
      LOCAL_STORAGE_API_KEYS_KEY,
      JSON.stringify(state.apiKeys)
    );
  }
};

const actions = {
  addApiKey({ commit }, payload) {
    commit(ADD_API_KEY, payload);
    commit(SAVE_API_KEYS);
  },
  loadApiKeys({ commit }) {
    commit(LOAD_API_KEYS);
  }
};

export default {
  state,
  mutations,
  actions
};
