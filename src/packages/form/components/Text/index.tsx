import React from 'react';
import type { InputProps, PasswordProps } from 'antd/lib/input';
import ProField from '@/packages/field';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'text';

const ProFormText = createField<ProFormItemProps<InputProps>>(
  React.forwardRef(({ fieldProps, proFieldProps }, ref) => {
    console.log('--------------------------------');
    console.log('fieldProps:', fieldProps);
    console.log('proFieldProps:', proFieldProps);
    console.log('--------------------------------');
    return (
      <ProField
        mode="edit"
        ref={ref}
        valueType={valueType}
        fieldProps={fieldProps}
        {...proFieldProps}
      />
    );
  }),
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
