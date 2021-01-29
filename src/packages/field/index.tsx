import { BasicProFieldFC, ProRenderFieldPropsType, ProFieldFCRenderProps } from '../provider';
import React, { useContext } from 'react';
import { Avatar } from 'antd';

import { useIntl } from '@/packages/provider';
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
import FiledSelect, {
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
} from './components/Select';
import FiledCheckbox from './components/Checkbox';
import FiledRate from './components/Rate';
import FiledSwitch from './components/Switch';
import FieldDigit from './components/Digit';
import FieldSecond from './components/Second';

import FieldRadio from './components/Radio';
import type { ProFieldValueObjectType, ProFieldValueType } from '../utils';

export type ProFieldEmptyText = string | false;

// 默认的Field需要实现的功能
export type ProFieldFC<T> = React.ForwardRefRenderFunction<
  any,
  BasicProFieldFC & ProRenderFieldPropsType & T
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
        text={text}
        fieldProps={{ status: valueType.status || undefined, ...pickFormItemProps }}
      />
    );
  }
};
