import React from 'react';
import type { SelectProps } from 'antd/lib/select';
import ProField from '@/packages/field';
import type { ProSchema } from '@/packages/utils';
import { runFunction } from '@/packages/utils';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'select';

export type ProFormSelectProps = ProFormItemProps<SelectProps<any>> & {
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
  options?: SelectProps<any>['options'];
  mode?: SelectProps<any>['mode'];
  showSearch?: SelectProps<any>['showSearch'];
};

const ProFormSelect = React.forwardRef<any, ProFormSelectProps>(
  ({ fieldProps, proFieldProps, children, mode, request, valueEnum, showSearch, options }, ref) => (
    <ProField
      mode="edit"
      ref={ref}
      valueEnum={runFunction(valueEnum)}
      request={request}
      valueType={valueType}
      fieldProps={{ options, mode, showSearch, ...fieldProps }}
      {...proFieldProps}
    >
      {children}
    </ProField>
  ),
);

export default createField<ProFormSelectProps>(ProFormSelect, {
  customLightMode: true,
});
