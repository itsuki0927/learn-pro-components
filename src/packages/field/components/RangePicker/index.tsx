import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { FieldLabel, parseValueToMoment } from '@/packages/utils';
import { useIntl } from '@/packages/provider';
import SizeContext from 'antd/lib/config-provider/SizeContext';

import type { ProFieldFC } from '../../index';

const ACTIVE_PICKER_INDEX_LEFT = 0;
const ACTIVE_PICKER_INDEX_RIGHT = 1;

const FieldRangePicker: ProFieldFC<{ text: string[]; format: string; showTime?: boolean }> = (
  { text, format, mode, showTime, plain, render, renderFormItem, light, label, fieldProps },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [startText, endText] = Array.isArray(text) ? text : [];
  const [open, setOpen] = useState<boolean>(false);
  const [activePickerIndex, setActivePickerIndex] = useState<0 | 1>();
  const parsedStartText: string = startText ? moment(startText).format(format || 'YYYY-MM-DD') : '';
  const parsedEndText: string = endText ? moment(endText).format(format || 'YYYY-MM-DD') : '';

  if (mode === 'read') {
    const dom = (
      <div ref={ref}>
        <div>{parsedStartText || '-'}</div>
        <div>{parsedEndText || '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const {
      disabled,
      onChange,
      allowClear,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;
    let dom;
    const momentValue = parseValueToMoment(fieldProps.value) as moment.Moment;
    if (light) {
      const valueStr: string =
        parsedStartText && parsedEndText && `${parsedStartText} ~ ${parsedEndText}`;
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker.RangePicker
            ref={ref}
            {...fieldProps}
            format={format}
            showTime={showTime}
            placeholder={[
              intl.getMessage('tableForm.selectPlaceholder', '请选择'),
              intl.getMessage('tableForm.selectPlaceholder', '请选择'),
            ]}
            bordered={plain === undefined ? true : !plain}
            onChange={(v) => {
              onChange(v);
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
            activePickerIndex={activePickerIndex}
            onOpenChange={setOpen}
            open={open}
            onCalendarChange={(dates) => {
              if (dates && !dates[0]) {
                setActivePickerIndex(ACTIVE_PICKER_INDEX_LEFT);
              } else if (dates && !dates[1]) {
                setActivePickerIndex(ACTIVE_PICKER_INDEX_RIGHT);
              }
            }}
          />
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            expanded={open}
            allowClear={allowClear}
            value={valueStr}
            onClear={() => {
              onChange(null);
              setActivePickerIndex(0);
            }}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker.RangePicker
          ref={ref}
          showTime={showTime}
          format={format}
          bordered={plain === undefined ? true : !plain}
          placeholder={[
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          ]}
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

export default React.forwardRef(FieldRangePicker);
