import { Input } from 'antd';
import React from 'react';

import type { ProFieldFC } from '../../index';

const languageFormat = (text: string, language: string) => {
  if (typeof text !== 'string') {
    return text;
  }
  try {
    if (language === 'json') {
      return JSON.stringify(text, null, 2);
    }
  } catch (error) {}
  return text;
};

const FieldCode: ProFieldFC<{ text: string; language?: 'json' | 'text' }> = (
  { text, mode, render, language = 'text', renderFormItem, plain, fieldProps },
  ref,
) => {
  const code = languageFormat(text, language);
  if (mode === 'read') {
    const dom = (
      <pre
        ref={ref}
        {...fieldProps}
        style={{
          padding: 16,
          overflow: 'auto',
          fontSize: '85%',
          lineHeight: 1.45,
          backgroundColor: '#f6f8fa',
          borderRadius: 3,
          width: 'min-content',
          ...fieldProps.style,
        }}
      >
        <code> {code}</code>
      </pre>
    );
    if (render) {
      return render(code, { mode, ...fieldProps, ref }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom = <Input.TextArea rows={5} {...fieldProps} ref={ref} />;
    if (plain) {
      dom = <Input {...fieldProps} ref={ref} />;
    }
    if (renderFormItem) {
      return renderFormItem(code, { mode, ...fieldProps, ref }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldCode);