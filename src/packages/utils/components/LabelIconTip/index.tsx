import React, { useContext } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Space, ConfigProvider } from 'antd';
import type { TooltipProps } from 'antd/lib/tooltip';
import './index.less';

const LabelIconTip: React.FC<{
  label: React.ReactNode;
  subTitle?: React.ReactNode;
  tooltip?: string | TooltipProps;
}> = (props) => {
  const { label, tooltip, subTitle } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  if (!tooltip && !subTitle) {
    return <>{label}</>;
  }

  const className = getPrefixCls('pro-core-label-tip');
  const tooltipProps = typeof tooltip === 'string' ? { title: tooltip } : (tooltip as TooltipProps);
  return (
    <Space className={className} size={4}>
      {label}
      {subTitle && <div className={`${className}-subtitle`}>{subTitle}</div>}
      {tooltip && (
        <Tooltip {...tooltipProps}>
          <InfoCircleOutlined className={`${className}-icon`} />
        </Tooltip>
      )}
    </Space>
  );
};

export default LabelIconTip;
