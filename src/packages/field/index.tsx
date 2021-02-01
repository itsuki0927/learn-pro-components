import type { BaseProFieldFC, ProRenderFieldPropsType, ProFieldFCRenderProps } from '../provider';
import React, { useContext } from 'react';
import { Avatar } from 'antd';

import { pickProProps, omitUndefined } from '@/packages/utils';
import ConfigContext, { useIntl } from '@/packages/provider';
import FieldPercent from './components/Percent';
import FieldIndexColumn from './components/IndexColumn';
import FieldProgress from './components/Progress';
import FieldMoney from './components/Money';
import FieldDatePicker from './components/DatePicker';
import FieldFromNow from './components/FromNow';
import FieldRangePicker from './components/RangePicker';
import FieldCode from './components/Code';
import FieldTimePicker from './components/TimePicker';
import FieldText from './components/Text';
import FieldTextArea from './components/TextArea';
import FieldPassword from './components/Password';
import FieldStatus from './components/Status';
import FieldOptions from './components/Options';
import FieldSelect, {
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
} from './components/Select';
import FieldCheckbox from './components/Checkbox';
import FieldRate from './components/Rate';
import FieldSwitch from './components/Switch';
import FieldDigit from './components/Digit';
import FieldSecond from './components/Second';
import FieldRadio from './components/Radio';

import type { ProFieldValueObjectType, ProFieldValueType, ProFieldTextType } from '../utils';

export type ProFieldEmptyText = string | false;

// 默认的Field需要实现的功能
export type ProFieldFC<T> = React.ForwardRefRenderFunction<
  any,
  BaseProFieldFC & ProRenderFieldPropsType & T
>;

export type ProFieldValueTypeFunction<T> = (item: T) => ProFieldValueType | ProFieldValueObjectType;

type RenderProps = Omit<ProFieldFCRenderProps, 'text'> &
  ProRenderFieldPropsType & {
    emptyText?: React.ReactNode;
    visible?: boolean;
    onVisible?: (visible: boolean) => void;
    [key: string]: any;
  };

const defaultRenderTextByObject = (
  text: ProFieldTextType,
  valueType: ProFieldValueObjectType,
  props: RenderProps,
) => {
  const pickFormItemProps = pickProProps(props.fieldProps);
  if (valueType.type === 'progress') {
    return (
      <FieldProgress
        {...props}
        text={text as number}
        fieldProps={{ status: valueType.status || undefined, ...pickFormItemProps }}
      />
    );
  }
  if (valueType.type === 'money') {
    return (
      <FieldMoney
        locale={valueType.locale}
        {...props}
        fieldProps={pickFormItemProps}
        text={text as number}
      />
    );
  }
  if (valueType.type === 'percent') {
    return (
      <FieldPercent
        {...props}
        text={text as number}
        showSymbol={valueType.showSymbol}
        precision={valueType.precision}
        fieldProps={pickFormItemProps}
        showColor={valueType.showColor}
      />
    );
  }
  return text;
};

const defaultRenderText = (
  text: ProFieldTextType,
  valueType: ProFieldValueType | ProFieldValueObjectType,
  props: RenderProps,
  valueTypeMap: Record<string, ProRenderFieldPropsType>,
): React.ReactNode => {
  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(text, valueType, props);
  }
  const { mode = 'read', emptyText = '-' } = props;

  const customValueTypeConfig = valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    // eslint-disable-next-line no-param-reassign
    delete props.ref;

    if (mode === 'read') {
      return customValueTypeConfig.render?.(text, { text, ...props, mode }, <>{text}</>);
    }

    if (mode === 'edit' || mode === 'update') {
      return customValueTypeConfig.renderFormItem?.(text, { text, ...props }, <>{text}</>);
    }
  }

  if (emptyText !== false && mode === 'read' && valueType !== 'option' && valueType !== 'switch') {
    if (typeof text !== 'boolean' && typeof text !== 'number' && !text) {
      const { fieldProps, render } = props;
      if (render) {
        return render(text, { mode, ...fieldProps }, <>{emptyText}</>);
      }
      return <>{emptyText}</>;
    }
  }

  // eslint-disable-next-line no-param-reassign
  delete props.emptyText;

  /**
   * 如果是金额的值
   */
  if (valueType === 'money') {
    return <FieldMoney {...props} text={text as number} />;
  }

  /**
   *如果是日期的值
   */
  if (valueType === 'date') {
    return <FieldDatePicker text={text as string} format="YYYY-MM-DD" {...props} />;
  }

  /**
   *如果是周的值
   */
  if (valueType === 'dateWeek') {
    return <FieldDatePicker text={text as string} format="YYYY-wo" picker="week" {...props} />;
  }

  /**
   *如果是月的值
   */
  if (valueType === 'dateMonth') {
    return <FieldDatePicker text={text as string} format="YYYY-MM" picker="month" {...props} />;
  }

  /**
   *如果是季度的值
   */
  if (valueType === 'dateQuarter') {
    return <FieldDatePicker text={text as string} format="YYYY-\QQ" picker="quarter" {...props} />;
  }

  /**
   *如果是年的值
   */
  if (valueType === 'dateYear') {
    return <FieldDatePicker text={text as string} format="YYYY" picker="year" {...props} />;
  }

  /**
   *如果是日期范围的值
   */
  if (valueType === 'dateRange') {
    return <FieldRangePicker text={text as string[]} format="YYYY-MM-DD" {...props} />;
  }

  /**
   *如果是日期加时间类型的值
   */
  if (valueType === 'dateTime') {
    return (
      <FieldDatePicker text={text as string} format="YYYY-MM-DD HH:mm:ss" showTime {...props} />
    );
  }

  /**
   *如果是日期加时间类型的值的值
   */
  if (valueType === 'dateTimeRange') {
    // 值不存在的时候显示 "-"
    return (
      <FieldRangePicker text={text as string[]} format="YYYY-MM-DD HH:mm:ss" showTime {...props} />
    );
  }

  /**
   *如果是时间类型的值
   */
  if (valueType === 'time') {
    return <FieldTimePicker text={text as string} format="HH:mm:ss" {...props} />;
  }

  if (valueType === 'fromNow') {
    return <FieldFromNow text={text as string} {...props} />;
  }

  if (valueType === 'index') {
    return <FieldIndexColumn>{(text as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'indexBorder') {
    return <FieldIndexColumn border>{(text as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'progress') {
    return <FieldProgress {...props} text={text as number} />;
  }
  /** 百分比, 默认展示符号, 不展示小数位 */
  if (valueType === 'percent') {
    return <FieldPercent text={text as number} {...props} />;
  }

  if (valueType === 'avatar' && typeof text === 'string' && props.mode === 'read') {
    return <Avatar src={text as string} size={22} shape="circle" />;
  }

  if (valueType === 'code') {
    return <FieldCode text={text as string} {...props} />;
  }

  if (valueType === 'jsonCode') {
    return <FieldCode text={text as string} language="json" {...props} />;
  }

  if (valueType === 'textarea') {
    return <FieldTextArea text={text as string} {...props} />;
  }

  if (valueType === 'digit') {
    return <FieldDigit text={text as number} {...props} />;
  }

  if (valueType === 'second') {
    return <FieldSecond text={text as number} {...props} />;
  }

  if (valueType === 'select' || (valueType === 'text' && (props.valueEnum || props.request))) {
    return <FieldSelect text={text as string} {...props} />;
  }

  if (valueType === 'checkbox') {
    return <FieldCheckbox text={text as string} {...props} />;
  }

  if (valueType === 'radio') {
    return <FieldRadio text={text as string} {...props} />;
  }

  if (valueType === 'radioButton') {
    return <FieldRadio radioType="button" text={text as string} {...props} />;
  }

  if (valueType === 'rate') {
    return <FieldRate text={text as string} {...props} />;
  }
  if (valueType === 'switch') {
    return <FieldSwitch text={text as boolean} {...props} />;
  }

  if (valueType === 'option') {
    return <FieldOptions text={text} {...props} />;
  }

  if (valueType === 'password') {
    return <FieldPassword text={text as string} {...props} />;
  }

  return <FieldText text={text as string} {...props} />;
};

export { defaultRenderText };

export type ProFieldPropsType = {
  text?: ProFieldTextType;
  valueType?: ProFieldValueType | ProFieldValueObjectType;
} & RenderProps;

const ProField: React.ForwardRefRenderFunction<any, ProFieldPropsType> = (
  { text, valueType = 'text', onChange, value, ...rest },
  ref,
) => {
  const intl = useIntl();
  const context = useContext(ConfigContext);
  const fieldProps = (value || onChange || rest?.fieldProps) && {
    value,
    onChange,
    ...omitUndefined(rest?.fieldProps),
  };

  return (
    <>
      {defaultRenderText(
        text ?? fieldProps?.value ?? '',
        valueType || 'text',
        {
          ...rest,
          mode: rest.mode || 'read',
          ref,
          placeholder: intl.getMessage('tableForm.inputPlaceholder', '请输入'),
          fieldProps: pickProProps(fieldProps),
        },
        context.valueTypeMap,
      )}
    </>
  );
};

export {
  FieldPercent,
  FieldIndexColumn,
  FieldProgress,
  FieldMoney,
  FieldDatePicker,
  FieldRangePicker,
  FieldCode,
  FieldTimePicker,
  FieldText,
  FieldStatus,
  FieldSelect,
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
};

export type { ProFieldValueType };

export default React.forwardRef(ProField) as typeof ProField;
