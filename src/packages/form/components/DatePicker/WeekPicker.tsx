import React, { FC } from 'react';
import ProField from '@/packages/field';
import type { WeekPickerProps } from 'antd/lib/date-picker';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'dateWeek';

const ProFormDatePickerWeek: FC<
  ProFormItemProps<WeekPickerProps>
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

export default createField<ProFormItemProps<WeekPickerProps>>(ProFormDatePickerWeek, {
  valueType,
  customLightMode: true,
});
