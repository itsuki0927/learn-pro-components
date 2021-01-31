import type { FormItemProps } from 'antd/lib/form';

export type GroupProps = {
  title?: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  titleRender?: (title: React.ReactNode, props: GroupProps) => React.ReactNode;
};

export type FieldProps = {
  style?: React.CSSProperties;
};

export type ProFormItemProps<T = {}> = {
  fieldProps?: FieldProps & T;
  placeholder?: string | string[];
  secondary?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  proFieldProps?: {
    light?: boolean;
    label?: React.ReactNode;
    mode?: 'read';
  };
} & FormItemProps;
