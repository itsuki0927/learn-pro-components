import { FieldLabel, parseValueToMoment } from '@/packages/utils';
import { ConfigProvider, DatePicker } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import type { ProFieldFC } from '../../index';

const FieldTimePicker: ProFieldFC<{ text: string | number; format: string }> = (
  { text, mode, light, format, label, render, renderFormItem, plain, fieldProps },
  ref,
) => {
  const [open, setOpen] = useState(false);
  const size = useContext(SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');

  if (mode === 'read') {
    const dom = <span ref={ref}> {text ? moment(text).format(format || 'HH:mm:ss') : '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const { disabled, onChange, placeholder, allowClear, value } = fieldProps;
    const momentValue = parseValueToMoment(value) as moment.Moment;
    if (light) {
      const valueStr = (momentValue && momentValue.format(format || 'HH:mm:ss')) || '';
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker.TimePicker
            value={momentValue}
            ref={ref}
            format={format}
            onOpenChange={setOpen}
            open={open}
            onChange={(v) => {
              if (onChange) {
                onChange(v);
              }
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
          />
          <FieldLabel
            label={label}
            size={size}
            value={valueStr}
            disabled={disabled}
            placeholder={placeholder}
            expanded={open}
            allowClear={allowClear}
            onClear={() => {
              if (onChange) {
                onChange(null);
              }
            }}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker.TimePicker
          ref={ref}
          format={format}
          bordered={plain === undefined ? true : !plain}
          {...fieldProps}
          value={momentValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldTimePicker);
