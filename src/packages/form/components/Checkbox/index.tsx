import ProField from '@/packages/field';
import type { ProSchema } from '@/packages/utils';
import { runFunction } from '@/packages/utils';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormCheckboxGroupProps = ProFormItemProps<CheckboxGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, proFieldProps, valueEnum, ...rest }, ref) => (
    <ProField
      ref={ref}
      valueType="checkbox"
      mode="edit"
      valueEnum={runFunction<[any]>(valueEnum, undefined)}
      {...rest}
      fieldProps={{
        options,
        ...fieldProps,
      }}
      {...proFieldProps}
    />
  ),
);

export type ProFormCheckboxProps = ProFormItemProps<CheckboxProps>;

const ProFormCheckbox: React.FC<ProFormCheckboxProps> = React.forwardRef<any, ProFormCheckboxProps>(
  ({ fieldProps, children }, ref) => (
    <Checkbox ref={ref} {...fieldProps}>
      {children}
    </Checkbox>
  ),
);

const Group = createField(CheckboxGroup);

const WrappedProFormCheckbox: React.ComponentType<ProFormCheckboxProps> & {
  Group: typeof Group;
} = createField<ProFormCheckboxProps>(ProFormCheckbox, {
  valuePropName: 'checked',
}) as any;

WrappedProFormCheckbox.Group = Group;

export default WrappedProFormCheckbox;
