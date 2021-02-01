import { InputNumber } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';

export type FieldDigitProps = {
  text: number;
};

export function formatSecond(result: number) {
  let formatText = '';
  const h = Math.floor(result / 3600);
  const m = Math.floor((result / 60) % 60);
  const s = Math.floor(result % 60);
  formatText = `${s}秒`;
  if (m) {
    formatText = `${m}分钟${formatText}`;
  }
  if (h) {
    formatText = `${h}小时${formatText}`;
  }
  return formatText;
}

const Second: ProFieldFC<FieldDigitProps> = (
  { text, render, renderFormItem, fieldProps, mode, ...rest },
  ref,
) => {
  if (mode === 'read') {
    const secondText = formatSecond(Number(text));
    const dom = <span ref={ref}> {secondText}</span>;
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

export default React.forwardRef(Second);
