import ProField from '@/packages/field';
import type { DatePickerProps } from 'antd/lib/date-picker';
import React, { FC } from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'dateQuarter';

const ProFormDatePickerQuarter: FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ proFieldProps, fieldProps }, ref) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    valueType={valueType}
    fieldProps={fieldProps}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDatePickerQuarter, {
  valueType,
  customLightMode: true,
});
