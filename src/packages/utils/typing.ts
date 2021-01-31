import { ProSchemaValueEnumMap, ProSchemaValueEnumObj } from '../provider';

/**
 * password 密码框
 * money 金额
 * option 操作 需要返回一个数组
 * date 日期 YYYY-MM-DD
 * dateRange 日期范围 YYYY-MM-DD[]
 * dateTime 日期和时间 YYYY-MM-DD HH:mm:ss
 * dateTimeRange 范围日期和时间 YYYY-MM-DD HH:mm:ss[]
 * time: 时间 HH:mm:ss
 * index：序列
 * progress: 进度条
 * percent: 百分比
 * digit 数值
 * avatar 头像
 * code 代码块
 * jsonCode json 的代码块，格式化了一下
 */
export type ProFieldValueType =
  | 'password'
  | 'money'
  | 'textarea'
  | 'option'
  | 'date'
  | 'dateWeek'
  | 'dateMonth'
  | 'dateQuarter'
  | 'dateYear'
  | 'dateRange'
  | 'dateTimeRange'
  | 'dateTime'
  | 'time'
  | 'text'
  | 'select'
  | 'checkbox'
  | 'rate'
  | 'radio'
  | 'radioButton'
  | 'index'
  | 'indexBorder'
  | 'progress'
  | 'percent'
  | 'digit'
  | 'second'
  | 'avatar'
  | 'code'
  | 'switch'
  | 'fromNow'
  | 'jsonCode';

export type ProFieldRequestData<U = any> = (
  params: U,
  props: any,
) => Promise<
  {
    label: React.ReactNode;
    value: React.ReactText;
    [key: string]: any;
  }[]
>;

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

export type ProFieldValueObjectType = {
  type: 'progress' | 'money' | 'percent';
  status?: 'normal' | 'actice' | 'success' | 'exception' | undefined;
  locale?: string;
  showSymbol?: boolean;
  showColor?: boolean;
  precision?: number;
  request?: ProFieldRequestData;
};

export type SearchTransformKeyFn = (
  value: any,
  field: any,
  object: any,
) => string | Record<string, any>;
