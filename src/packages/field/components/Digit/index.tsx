import React from 'react';
import { InputNumber } from 'antd';
import type { ProFieldFC } from '../../index';

export type FieldDigitProps = {
  text: number;
};

const FieldDigit: ProFieldFC<FieldDigitProps> = (
  { mode, render, renderFormItem, text, fieldProps, ...rest },
  ref,
) => {
  if (mode === 'read') {
    const digit = new Intl.NumberFormat().format(Number(text));
    const dom = <span ref={ref}>{digit}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <InputNumber ref={ref} min={0} style={{ width: '100%' }} {...rest} {...fieldProps} />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDigit);
