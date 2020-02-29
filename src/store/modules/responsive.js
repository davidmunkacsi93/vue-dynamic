import { SET_SCREEN_INFORMATION } from "../../types/action-types";

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

function getCurrentBreakpointFromWidth(width) {
  const sorted = sortBreakpoints(breakpoints);
  let matching = sorted[0];
  for (let i = 1, len = sorted.length; i < len; i++) {
    const breakpointName = sorted[i];
    if (width > breakpoints[breakpointName]) matching = breakpointName;
  }
  return matching;
}

function sortBreakpoints(breakpoints) {
  const keys = Object.keys(breakpoints);
  return keys.sort(function(a, b) {
    return breakpoints[a] - breakpoints[b];
  });
}

const state = {
  screenWidth: null,
  screenClass: null
};

const mutations = {
  setScreenInformation(state, screenWidth) {
    state.screenWidth = screenWidth;
    state.screenClass = getCurrentBreakpointFromWidth(state.screenWidth);
  }
};

const actions = {
  setScreenInformation({ commit }, screenWidth) {
    commit(SET_SCREEN_INFORMATION, screenWidth);
    console.log(state.screenWidth);
    console.log(state.screenClass);
  }
};

export default {
  state,
  mutations,
  actions
};
