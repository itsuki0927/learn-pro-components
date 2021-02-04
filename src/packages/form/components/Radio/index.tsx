import React, { FC } from 'react';
import { Radio } from 'antd';
import ProField from '@/packages/field';
import type { ProSchema } from '@/packages/utils';
import type { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormRadioGroupProps = ProFormItemProps<RadioGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  radioType?: 'button' | 'radio';
  options?: RadioGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const RadioGroup: FC<ProFormRadioGroupProps> = React.forwardRef(
  ({ fieldProps, proFieldProps, radioType, options }, ref) => (
    <ProField
      mode="edit"
      ref={ref}
      valueType={radioType === 'button' ? 'radioButton' : 'radio'}
      fieldProps={{ options, ...fieldProps }}
      {...proFieldProps}
    />
  ),
);

const ProFormRadio: FC<ProFormItemProps<RadioProps>> = React.forwardRef(
  ({ fieldProps, children }, ref: any) => (
    <Radio {...fieldProps} ref={ref}>
      {children}
    </Radio>
  ),
);

const Group = createField(RadioGroup, {
  customLightMode: true,
});

const WrappedProFormRadio: React.ComponentType<ProFormItemProps<RadioProps>> & {
  Group: typeof Group;
  Button: typeof Radio.Button;
} = createField<ProFormItemProps<RadioProps>>(ProFormRadio, {
  valuePropName: 'checked',
});
WrappedProFormRadio.Group = Group;
WrappedProFormRadio.Button = Radio.Button;

export default WrappedProFormRadio;
