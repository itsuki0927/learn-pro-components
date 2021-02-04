import React, { FC } from 'react';
import ProField from '@/packages/field';
import type { DatePickerProps } from 'antd/lib/date-picker';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'dateYear';

const ProFormDatePickerYear: FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    valueType={valueType}
    fieldProps={fieldProps}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDatePickerYear, {
  valueType,
  customLightMode: true,
});
