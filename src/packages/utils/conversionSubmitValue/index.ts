import moment from 'moment';
import get from 'rc-util/lib/utils/get';
import isNil from '../isNil';

type DateFormatter = 'number' | 'string' | false;

const wrapToArray = <T = any>(value: T | T[]) => (Array.isArray(value) ? value : [value]);

const dateFormatterMap = {
  time: 'HH:mm:ss',
  timeRange: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateWeek: 'YYYY-wo',
  dateMonth: 'YYYY-MM',
  dateQuarter: 'YYYY-QQ',
  dateYear: 'YYYY',
  dateRange: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};

function isObject(o: any) {
  return Object.toString.call(o) === '[object Object]';
}

export function isPlainObject(o: { constructor: any }) {
  if (isObject(o) === false) return false;

  const ctor = o.constructor;
  if (ctor === undefined) return true;

  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  if (prot.hasOwnProperty('isPrototypeOf') === false) return false;

  return true;
}

const convertMoment = (value: moment.Moment, dateFormatter: DateFormatter, valueType: string) => {
  if (moment.isMoment(value)) {
    if (dateFormatter === 'number') {
      return value.valueOf();
    }
    return value.format(dateFormatterMap[valueType] || 'YYYY-MM-DD HH:mm:ss');
  }
  return value;
};

const conversionMoment = (
  value: moment.Moment | moment.Moment[],
  dateFormatter: DateFormatter,
  valueType: string,
) => {
  if (!dateFormatter) {
    return value;
  }

  return wrapToArray(value).map((item) => convertMoment(item, dateFormatter, valueType));
};

const conversionSubmitValue = <T = any>(
  value: T,
  dateFormatter: DateFormatter,
  valueTypeMap: Record<any, any>,
  parentKey?: string,
): T => {
  const tmpValue = {} as T;

  Object.keys(value).forEach((key) => {
    const namePath = parentKey ? [parentKey, key] : [key];
    const valueType = get(valueTypeMap, namePath) || 'text';
    const itemValue = value[key];
    if (isNil(itemValue)) {
      return;
    }
    if (isPlainObject(itemValue)) {
      tmpValue[key] = conversionSubmitValue(itemValue, dateFormatter, valueTypeMap, key);
      return;
    }
    tmpValue[key] = conversionMoment(itemValue, dateFormatter, valueType);
  });
  return tmpValue;
};

export default conversionSubmitValue;
