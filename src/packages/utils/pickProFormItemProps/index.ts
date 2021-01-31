const antdFormItemPropsList = [
  // https://ant.design/components/form-cn/#Form.Item
  'colon',
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'htmlFor',
  'initialValue',
  'noStyle',
  'label',
  'labelAlign',
  'labelCol',
  'name',
  'preserve',
  'normalize',
  'required',
  'rules',
  'shouldUpdate',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',
  'hidden',
];

const pickProFormItemProps = (props: Object) => {
  const attr = {};
  antdFormItemPropsList.forEach((key) => {
    if (props[key] !== undefined) {
      attr[key] = props[key];
    }
  });
  return attr;
};

export default pickProFormItemProps;
