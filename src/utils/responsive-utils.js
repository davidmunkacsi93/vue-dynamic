const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

export function getCurrentScreenClass() {
  var width = window.innerWidth;
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
