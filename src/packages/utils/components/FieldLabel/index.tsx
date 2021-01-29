import React, { useContext } from 'react';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ConfigProvider } from 'antd';
import { useIntl } from '@/packages/provider';
import './index.less';

export type FieldLabelProps = {
  label?: React.ReactNode;
  placeholder?: React.ReactNode;
  value?: any;
  className?: string;
  bordered?: boolean;
  allowClear?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
  size?: SizeType;
  style?: React.CSSProperties;
  onClear?: () => void;
  formatter?: (value: any) => string;
};

const FieldLabel: React.FC<FieldLabelProps> = (props) => {
  const {
    label,
    onClear,
    value,
    bordered,
    placeholder,
    size = 'middle',
    ellipsis,
    disabled,
    expanded,
    allowClear = true,
    formatter,
    className,
    style,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-label');
  const intl = useIntl();

  const getTextByValue = (
    aLabel?: React.ReactNode | React.ReactNode[],
    aValue?: string | string[],
  ) => {
    if (aValue !== undefined) {
      let str: string;
      if (formatter) {
        str = formatter(aValue);
      } else {
        str = Array.isArray(aValue) ? aValue.join(',') : String(aValue);
      }
      const prefix = aLabel ? (
        <>
          {aLabel}
          {': '}
        </>
      ) : (
        ''
      );
      if (!ellipsis) {
        return (
          <span>
            {prefix}
            {str}
          </span>
        );
      }
      const tail =
        str.length > 16
          ? `...${
              Array.isArray(aValue) && aValue.length
                ? `${aValue.length}${intl.getMessage('form.lightFilter.itemUnit', '项')}`
                : ''
            }`
          : '';
      return (
        <span title={str}>
          {prefix}
          {str.substr(0, 16)}
          {tail}
        </span>
      );
    }
    return placeholder || aLabel;
  };

  return (
    <span
      className={classNames(
        prefixCls,
        `${prefixCls}-${size}`,
        {
          [`${prefixCls}-active`]: !!value || value === 0,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-allow-clear`]: allowClear,
        },
        className,
      )}
      style={style}
    >
      {getTextByValue(label, value)}
      {(value || value === 0) && allowClear && (
        <CloseOutlined
          className={classNames(`${prefixCls}-icon`, `${prefixCls}-close`)}
          onClick={(e) => {
            if (onClear && !disabled) {
              onClear();
            }
            e.stopPropagation();
          }}
        />
      )}
      <DownOutlined className={classNames(`${prefixCls}-icon`, `${prefixCls}-arrow`)} />
    </span>
  );
};

export default FieldLabel;
