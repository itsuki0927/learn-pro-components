import { ConfigProvider, Space, Spin, Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { ProFieldFC } from '../..';
import { FieldSelectProps, ObjectToMap, proFieldParsingText, useFieldFetchData } from '../Select';

export type GroupProps = {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & FieldSelectProps;

const FieldCheckbox: ProFieldFC<GroupProps> = (
  { layout = 'horizontal', renderFormItem, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-checkbox');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const checkBoxRef = useRef();
  useImperativeHandle(ref, () => ({
    ...(checkBoxRef.current || {}),
    fetchData: () => fetchData(),
  }));

  if (loading) {
    return <Spin size="small" />;
  }

  if (mode === 'read') {
    const optionsValueEnum = options?.length
      ? options?.reduce((pre: any, cur) => {
          return { ...pre, [cur.value]: cur.label };
        }, {})
      : undefined;

    const dom = proFieldParsingText(rest.text, ObjectToMap(rest.valueEnum || optionsValueEnum));

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, <>{dom}</>);
    }
    return <Space> {dom}</Space>;
  }

  if (mode === 'edit') {
    const dom = (
      <Checkbox.Group
        {...rest.fieldProps}
        className={classNames(rest.fieldProps?.className, `${layoutClassName}-${layout}`)}
        options={options?.map((option) => {
          if (typeof option === 'string') {
            return { value: option, label: option, key: option };
          }
          return option;
        })}
      />
    );

    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }

    return dom;
  }
  return null;
};

export default React.forwardRef(FieldCheckbox);
