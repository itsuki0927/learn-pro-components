import { Input } from 'antd';
import React, { useImperativeHandle, useRef } from 'react';
import { useIntl } from '@/packages/provider';
import { ProFieldFC } from '../..';

const FieldText: ProFieldFC<{ text: string }> = (
  { text, mode, render, renderFormItem, fieldProps },
  ref,
) => {
  const intl = useIntl();
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({ ...(inputRef.current || {}) }), [inputRef.current]);

  if (mode === 'read') {
    const dom = text || '-';
    if (render) {
      return render(text, { mode, ...fieldProps }, <> {dom}</>);
    }
    return <>{dom}</>;
  }

  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
    const dom = <Input placeholder={placeholder} allowClear ref={inputRef} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldText);
