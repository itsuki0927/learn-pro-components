import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import { InputNumber } from 'antd';
import { toNumber } from 'lodash';
import { getColorByRealValue, getSymbolByRealValue, getRealTextWithPrecision } from './util';
import type { ProFieldFC } from '../../index';

export type PercentPropInt = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  text?: number | string;
  precision?: number;
  showColor?: boolean;
  showSymbol?: boolean;
};

const FieldPercent: ProFieldFC<PercentPropInt> = (
  {
    text,
    prefix,
    precision,
    showSymbol,
    suffix = '%',
    mode,
    showColor = false,
    render,
    renderFormItem,
    fieldProps,
    ...rest
  },
  ref,
) => {
  const realValue = useMemo(
    () =>
      typeof text === 'string' && (text as string).includes('%')
        ? toNumber((text as string).replace('%', ''))
        : toNumber(text),
    [text],
  );

  if (mode === 'read') {
    const style = showColor ? { color: getColorByRealValue(realValue) } : {};

    const dom = (
      <span style={style} ref={ref}>
        {prefix && <span> {prefix}</span>}
        {showSymbol && <> {getSymbolByRealValue(realValue)}</>}
        {getRealTextWithPrecision(Math.abs(realValue), precision)}
        {suffix && suffix}
      </span>
    );
    if (render) {
      return render(text, { mode, ...fieldProps, precision, prefix, showSymbol, suffix }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <InputNumber
        ref={ref}
        formatter={(value) => {
          if (value && prefix) {
            return `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return value;
        }}
        parser={(value) =>
          value ? value.replace(new RegExp(`\\${prefix}\\s?|(,*)`, 'g'), '') : ''
        }
        {...fieldProps}
        {...rest}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldPercent);
