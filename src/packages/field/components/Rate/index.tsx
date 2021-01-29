import React from 'react';
import { Rate } from 'antd';
import type { ProFieldFC } from '../../index';

const FieldRate: ProFieldFC<{ text: string }> = (
  { text, mode, render, renderFormItem, fieldProps },
  ref,
) => {
  if (mode === 'read') {
    const dom = <Rate allowHalf disabled ref={ref} value={text} {...fieldProps} />;
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = <Rate allowHalf ref={ref} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldRate);
