import { Image, Input } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';

export type FieldImageProps = {
  text: string;
  width?: number;
  placeholder?: string | string[] | undefined;
};

const FieldImage: ProFieldFC<FieldImageProps> = ({
  text,
  mode,
  render,
  renderFormItem,
  fieldProps,
  placeholder,
  width,
}) => {
  if (mode === 'read') {
    const dom = <Image width={width || 32} src={text} />;
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = <Input placeholder={placeholder} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldImage;
