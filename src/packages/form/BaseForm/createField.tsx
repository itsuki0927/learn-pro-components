import React, { useEffect, useContext, FC } from 'react';
import { Form } from 'antd';
import type { ProFieldValueType, SearchTransformKeyFn } from '@/packages/utils';
import { pickProFormItemProps } from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd/lib/form';
import classnames from 'classnames';
import { noteOnce } from 'rc-util/lib/warning';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import FieldContext from '../FieldContext';
// import LightWrapper from './LightWrapper';
import type { ProFormItemProps } from '../interface';
import LightWrapper from './LightWrapper';

export type ProFormItemCreatorProps = {
  valueType?: ProFieldValueType;
  customLightMode?: boolean;
  lightFilterLabelFormatter?: (value: any) => string;
} & FormItemProps;

const WIDTH_SIZE_ENUM = {
  // 适用于短数字，短文本或者选项
  xs: 104,
  s: 216,
  // 适用于较短字段录入、如姓名、电话、ID 等。
  sm: 216,
  m: 328,
  // 标准宽度，适用于大部分字段长度。
  md: 328,
  l: 440,
  // 适用于较长字段录入，如长网址、标签组、文件路径等。
  lg: 440,
  // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
  xl: 552,
};

type ProFormComponent<P, Extends> = React.ComponentType<Omit<P & Extends, 'proFieldProps'>>;

export type ExtendsProps = {
  secondary?: boolean;
  bordered?: boolean;
  allowClear?: boolean;
  colSize?: number;
  params?: any;
  ignoreFormItem?: boolean;
  readonly?: boolean;
  transform?: SearchTransformKeyFn;
  formItemProps?: FormItemProps;
};

function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreatorProps,
) {
  const FieldWithContext: FC<P> = (props: P & ExtendsProps) => {
    console.group('==========createField==========');
    const size = useContext(SizeContext);
    const {
      label,
      tooltip,
      placeholder,
      width,
      proFieldProps,
      messageVariables,
      bordered,
      ignoreFormItem,
      transform,
      readonly,
      allowClear,
      colSize,
      formItemProps: propsFormItemProps,
      ...rest
    } = props;
    const {
      valueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      ...defaultFormItemProps
    } = config || {};
    console.log('props:', props);
    const { fieldProps, formItemProps, setFieldValueType } = useContext(FieldContext);
    console.log('config:', config);
    const restFormItemProps = pickProFormItemProps(rest);
    console.log('restFormItemProps:', restFormItemProps);
    const formNeedProps = {
      value: (rest as any).value,
      onChange: (rest as any).onChange,
    };
    const realFieldProps = {
      ...(ignoreFormItem ? formNeedProps : {}),
      disabeld: props.disabled,
      placeholder: proFieldProps?.light ? placeholder || label : placeholder,
      ...(fieldProps || {}),
      ...(rest.fieldProps || {}),
      style: {
        ...rest.fieldProps?.style,
        ...fieldProps?.style,
      },
    } as any;
    console.log('realFieldProps:', realFieldProps);
    const otherProps = {
      messageVariables,
      ...defaultFormItemProps,
      ...formItemProps,
      ...restFormItemProps,
      ...propsFormItemProps,
    };
    console.log('otherProps:', otherProps);
    noteOnce(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      !rest['defaultValue'],
      '请不要在 Form 中使用 defaultXXX。如果需要默认值请使用 initialValues 和 initialValue。',
    );

    console.groupEnd();
    useEffect(() => {
      if (!setFieldValueType || !props.name) {
        return;
      }
      setFieldValueType(props.name, {
        valueType: valueType || (rest as any).valueType || 'text',
        transform,
      });
    }, [props.name, transform, valueType]);

    const field = (
      <Field
        {...(rest as P)}
        fieldProps={{
          allowClear,
          ...realFieldProps,
          className: classnames(realFieldProps?.className, {
            [`pro-field-${width}`]: width && WIDTH_SIZE_ENUM[width],
          }),
        }}
        proFieldProps={{
          mode: readonly ? 'read' : 'edit',
          params: rest.params,
          proFieldKey: otherProps?.name,
          ...proFieldProps,
        }}
      />
    );

    // 被放到 FormSet 的时候
    if (ignoreFormItem) {
      return field;
    }

    return (
      <Form.Item
        label={label && proFieldProps?.light !== true ? label : undefined}
        tooltip={proFieldProps?.light !== true && tooltip}
        {...otherProps}
        messageVariables={{
          label: label as string,
          ...otherProps?.messageVariables,
        }}
      >
        <LightWrapper
          {...realFieldProps}
          allowClear={allowClear}
          bordered={bordered}
          size={size}
          light={proFieldProps?.light}
          customLightMode={customLightMode}
          label={label}
          labelFormatter={lightFilterLabelFormatter}
          valuePropName={valuePropName}
        >
          {field}
        </LightWrapper>
      </Form.Item>
    );
  };
  return FieldWithContext as ProFormComponent<P, ExtendsProps>;
}

export default createField;
