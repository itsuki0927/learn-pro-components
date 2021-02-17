import ProField from '@/packages/field';
import type { InputProps, PasswordProps } from 'antd/lib/input';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'text';

const ProFormText = createField<ProFormItemProps<InputProps>>(
  React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
    <ProField
      mode="edit"
      ref={ref}
      valueType={valueType}
      fieldProps={fieldProps}
      {...proFieldProps}
    />
  )),
  { valueType },
);

const Password = createField<ProFormItemProps<PasswordProps>>(
  React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
    <ProField
      mode="edit"
      ref={ref}
      valueType="password"
      fieldProps={fieldProps}
      {...proFieldProps}
    />
  )),
);

const WrappedProFormText: typeof ProFormText & {
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

export default WrappedProFormText;
