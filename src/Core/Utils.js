
export const flatten = arr => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

export const simulateEvent = (target, value) => ({target: { name: target, value } });