import React, { FC } from 'react';

import ProField from '@/packages/field';
import type { DatePickerProps } from 'antd/lib/date-picker';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'dateTimeRange';

const ProFormDateTimeRangePicker: FC<
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

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDateTimeRangePicker, {
  valueType,
  customLightMode: true,
});