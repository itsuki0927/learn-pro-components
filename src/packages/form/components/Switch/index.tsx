import React, { FC } from 'react';
import ProField from '@/packages/field';
import type { SwitchProps } from 'antd/lib/switch';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

const valueType = 'switch';

export type ProFormSwitchProps = ProFormItemProps<SwitchProps> & {
  checkedChildren?: SwitchProps['checkedChildren'];
  unCheckedChildren?: SwitchProps['unCheckedChildren'];
};

const ProFormSwitch: FC<ProFormSwitchProps> = React.forwardRef(
  ({ fieldProps, checkedChildren, unCheckedChildren, proFieldProps }, ref) => (
    <ProField
      ref={ref}
      mode="edit"
      valueType={valueType}
      fieldProps={{
        ...fieldProps,
        unCheckedChildren,
        checkedChildren,
      }}
      text={fieldProps?.checked}
      {...proFieldProps}
    />
  ),
);

export default createField<ProFormItemProps<ProFormSwitchProps>>(ProFormSwitch);
