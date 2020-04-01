import { SAVE_API_KEYS, ADD_API_KEY } from '../../types/action-types';

const LOCAL_STORAGE_API_KEYS_KEY = 'api-keys';

const state = {
  apiKeys: {}
};

const mutations = {
  addApiKey(payload) {
    apiKeys[payload.baseUrl] = payload.apiKeys;
  },
  saveApiKeys() {
    localStorage.setItem(LOCAL_STORAGE_API_KEYS_KEY, state.apiKeys);
  }
};

const actions = {
  addApiKey({ commit }, payload) {
    commit(ADD_API_KEY, payload);
    commit(SAVE_API_KEYS);
  }
};

export default {
  state,
  mutations,
  actions
};
