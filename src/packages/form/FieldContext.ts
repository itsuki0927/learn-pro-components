import React from 'react';
import type { FormItemProps } from 'antd/lib/form';
import type { NamePath } from 'antd/lib/form/interface';
import type { ProFieldValueType, SearchTransformKeyFn } from '@/packages/utils';
import type { GroupProps, FieldProps } from './interface';

export type FieldContextProps = {
  fieldProps?: FieldProps;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProFieldValueType;
      transform?: SearchTransformKeyFn;
    },
  ) => void;
};

const FieldContext = React.createContext<FieldContextProps>({});

export default FieldContext;
