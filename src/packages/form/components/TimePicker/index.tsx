import ProField from '@/packages/field';
import type { DatePickerProps } from 'antd/lib/date-picker';
import React, { FC } from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'time';

const ProFormTimePicker: FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
  <ProField
    ref={ref}
    valueType={valueType}
    mode="edit"
    text={fieldProps?.value || ''}
    fieldProps={fieldProps}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormTimePicker, {
  valueType,
});
