import React, { FC } from 'react';
import ProField from '@/packages/field';
import type { DatePickerProps } from 'antd/lib/date-picker';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

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
