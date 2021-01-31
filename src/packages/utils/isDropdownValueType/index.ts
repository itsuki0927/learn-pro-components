const isDropdownValueType = (valueType: string) =>
  /^date/.test(valueType) || valueType === 'select';

export default isDropdownValueType;
