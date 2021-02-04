import React from 'react';
import type { InputNumberProps } from 'antd/lib/input-number';
import ProField from '@/packages/field';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'digit';

type ProFormDigitProps = ProFormItemProps<InputNumberProps> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};

const ProFormDigit: React.ForwardRefRenderFunction<
  any,
  ProFormDigitProps
> = React.forwardRef(({ fieldProps, min, proFieldProps, max }, ref) => (
  <ProField
    ref={ref}
    mode="edit"
    valueType={valueType}
    fieldProps={{ max, min, ...fieldProps }}
    {...proFieldProps}
  />
));

export default createField<ProFormDigitProps>(ProFormDigit);
