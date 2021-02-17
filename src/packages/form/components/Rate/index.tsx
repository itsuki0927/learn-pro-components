import ProField from '@/packages/field';
import type { RateProps } from 'antd/lib/rate';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'rate';
/**
 * 评分组件
 * @param
 */
const ProFormRate: React.ForwardRefRenderFunction<any, ProFormItemProps<RateProps>> = (
  { fieldProps, proFieldProps },
  ref,
) => {
  return (
    <ProField
      valueType={valueType}
      mode="edit"
      fieldProps={fieldProps}
      ref={ref}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormItemProps<RateProps>>(React.forwardRef(ProFormRate));
