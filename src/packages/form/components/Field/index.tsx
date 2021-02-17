import ProField from '@/packages/field';
import type { ProSchema } from '@/packages/utils';
import { runFunction } from '@/packages/utils';
import type { InputProps, SelectProps } from 'antd';
import React, { FC } from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormFieldProps = ProSchema<
  string,
  ProFormItemProps<InputProps & SelectProps<string>> & {
    mode?: 'edit' | 'read' | 'update';
    isDefaultDom?: boolean;
    ref?: any;
    plain?: boolean;
  }
>;

const ProFormField: FC<
  ProFormFieldProps & {
    onChange?: Function;
  }
> = ({
  fieldProps,
  children,
  labelCol,
  label,
  isDefaultDom,
  render,
  proFieldProps,
  renderFormItem,
  valueType,
  initialValue,
  onChange: propOnChange,
  valueEnum,
  ...restProps
}) => {
  const onChange = (...restParams: any) => {
    (fieldProps?.onChange as any)(...restParams);
    propOnChange?.(...restParams);
  };
  if (children) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...restProps,
        onChange,
        ...children.props,
      });
    }
    return children as JSX.Element;
  }

  return (
    <ProField
      text={fieldProps?.value as string}
      mode="edit"
      valueType={(valueType as 'text') || 'text'}
      fieldProps={{
        ...fieldProps,
        onChange,
      }}
      valueEnum={runFunction(valueEnum)}
      {...proFieldProps}
      {...restProps}
    />
  );
};

export default createField<ProFormFieldProps>(ProFormField);
