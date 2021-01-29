const runFunction = <T extends any[]>(valueEnum: any, ...rest: T) => {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest);
  }
  return valueEnum;
};

export default runFunction;
