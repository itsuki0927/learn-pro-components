import ProField from '@/packages/field';
import type { DatePickerProps } from 'antd/lib/date-picker';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'dateTime';

/**
 * 时间日期选择组件
 * @param
 */
const ProFormDateTimePicker: React.FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDateTimePicker, {
  valueType,
  customLightMode: true,
});
