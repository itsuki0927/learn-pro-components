import ProField from '@/packages/field';
import type { InputNumberProps } from 'antd/lib/input-number';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

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
