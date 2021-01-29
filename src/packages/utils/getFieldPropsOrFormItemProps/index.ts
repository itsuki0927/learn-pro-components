import type { FormInstance } from 'antd/lib/form';
import runFunction from '../runFunction';

const getFieldPropsOrFormItemProps = (
  fieldProps: any,
  form?: FormInstance<any>,
  extraProps?: any,
): Object & { onChange: any; colSize: number } => {
  if (!form) {
    return {} as any;
  }
  return runFunction(fieldProps, form, extraProps);
};

export default getFieldPropsOrFormItemProps;
