import { Badge } from 'antd';
import type { CSSProperties } from 'react';
import React from 'react';
import './index.less';

type StatusProps = {
  className?: string;
  style?: CSSProperties;
};

const Status: {
  Success: React.FC<StatusProps>;
  Error: React.FC<StatusProps>;
  Processing: React.FC<StatusProps>;
  Default: React.FC<StatusProps>;
  Warning: React.FC<StatusProps>;
  success: React.FC<StatusProps>;
  error: React.FC<StatusProps>;
  processing: React.FC<StatusProps>;
  default: React.FC<StatusProps>;
  warning: React.FC<StatusProps>;
} = {
  Success: ({ children }) => <Badge status="success" text={children} />,
  Error: ({ children }) => <Badge status="error" text={children} />,
  Processing: ({ children }) => <Badge status="processing" text={children} />,
  Default: ({ children }) => <Badge status="default" text={children} />,
  Warning: ({ children }) => <Badge status="warning" text={children} />,
  success: ({ children }) => <Badge status="success" text={children} />,
  error: ({ children }) => <Badge status="error" text={children} />,
  processing: ({ children }) => <Badge status="processing" text={children} />,
  default: ({ children }) => <Badge status="default" text={children} />,
  warning: ({ children }) => <Badge status="warning" text={children} />,
};

export type ProFieldStatusType = keyof typeof Status;

export const ProFieldBadgeColor: React.FC<StatusProps & { color: string }> = ({
  color,
  children,
}) => <Badge color={color} text={children} />;

export default Status;
