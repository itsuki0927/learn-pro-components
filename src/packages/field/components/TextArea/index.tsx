import { useIntl } from '@/packages/provider';
import { Input } from 'antd';
import React from 'react';

import type { ProFieldFC } from '../../index';

const FieldTextArea: ProFieldFC<{ text: string }> = (
  { text, mode, render, renderFormItem, fieldProps },
  ref,
) => {
  const intl = useIntl();
  if (mode === 'read') {
    const dom = <span ref={ref}>{text || '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Input.TextArea
        rows={3}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.stopPropagation();
        }}
        placeholder={intl.getMessage('tableForm.inputPlaceholder', '请输入')}
        ref={ref}
        {...fieldProps}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldTextArea);
