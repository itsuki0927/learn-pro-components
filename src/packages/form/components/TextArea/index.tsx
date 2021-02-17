import ProField from '@/packages/field';
import type { TextAreaProps } from 'antd/lib/input';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'textarea';

const ProFormTextArea: React.ForwardRefRenderFunction<
  any,
  ProFormItemProps<TextAreaProps>
> = React.forwardRef(({ proFieldProps, fieldProps }, ref) => (
  <ProField
    valueType={valueType}
    mode="edit"
    ref={ref}
    text={fieldProps?.value}
    fieldProps={fieldProps}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<TextAreaProps>>(ProFormTextArea);
