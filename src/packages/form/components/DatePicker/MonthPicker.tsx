import ProField from '@/packages/field';
import type { MonthPickerProps } from 'antd/lib/date-picker';
import React, { FC } from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'dateMonth';

const ProFormDatePickerMonth: FC<
  ProFormItemProps<MonthPickerProps>
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

export default createField<ProFormItemProps<MonthPickerProps>>(ProFormDatePickerMonth, {
  valueType,
  customLightMode: true,
});
