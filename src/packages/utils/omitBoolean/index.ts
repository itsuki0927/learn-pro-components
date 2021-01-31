const omitBoolean = <T>(obj: boolean | T): T | undefined => {
  if (obj && obj !== true) {
    return obj;
  }
  return;
};

export default omitBoolean;
