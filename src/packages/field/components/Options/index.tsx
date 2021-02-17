import { ConfigProvider, Space } from 'antd';
import React, { useContext } from 'react';
import type { ProFieldFC } from '../../index';

const FieldOptions: ProFieldFC<{}> = ({ text, mode, render, fieldProps }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-field-option');

  if (render) {
    const dom = (render(text, { mode, ...fieldProps }, <></>) as unknown) as React.ReactNode[];
    if (!dom || dom?.length < 1) {
      return null;
    }

    return (
      <Space size={16} className={className}>
        {dom}
      </Space>
    );
  }

  if (!text || !Array.isArray(text)) {
    return text as JSX.Element;
  }

  return (
    <Space size={16} className={className}>
      {text}
    </Space>
  );
};

export default FieldOptions;
