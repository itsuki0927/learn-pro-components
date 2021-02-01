import { useIntl } from '@/packages/provider';
import type {
  ProFieldRequestData,
  ProFieldValueEnumType,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  ProSchemaValueEnumType,
} from '@/packages/utils';
import { useDeepCompareEffect } from '@/packages/utils';
import { Space, Spin } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';
import Select from 'antd/lib/select';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useSWR from 'swr';
import type { ProFieldFC } from '../../index';
import type { ProFieldStatusType } from '../Status';
import TableStatus, { ProFieldBadgeColor } from '../Status';
import LightSelect from './LightSelect';

let testId = 0;
export type FieldSelectProps = {
  text: string;
  // 值的枚举
  valueEnum?: ProSchemaValueEnumType;

  // 从服务器读取选项
  request?: ProFieldRequestData;

  // 重新触发的时机
  params?: any;

  // 组件的全局设置
  fieldProps?: any;
};

const getType = (obj: any) => {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
};
export const ObjectToMap = (value: ProFieldValueEnumType | undefined): ProSchemaValueEnumMap => {
  if (getType(value) === 'map') {
    return value as ProSchemaValueEnumMap;
  }
  return new Map(Object.entries(value || {}));
};

export const proFieldParsingValueEnumToArray = (
  valueEnumParams: ProFieldValueEnumType | undefined = new Map(),
): {
  value: string | number;
  text: string;
}[] => {
  const enumArray: { value: string | number; text: string; disabled?: boolean }[] = [];

  const valueEnum = ObjectToMap(valueEnumParams);

  valueEnum.forEach((_, key) => {
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      text: string;
      disabled?: boolean;
    };

    if (!value) {
      return;
    }

    if (typeof value === 'object' && value?.text) {
      enumArray.push({
        text: value?.text,
        value: key,
        disabled: value?.disabled,
      });
      return;
    }

    enumArray.push({
      text: (value as unknown) as string,
      value: key,
    });
  });

  return enumArray;
};

export const useFieldFetchData = (
  props: FieldSelectProps & {
    proFieldKey?: React.Key;
  },
): [boolean, SelectProps<any>['options'], () => void] => {
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) {
      return props.proFieldKey;
    }
    if (props.request) {
      testId += 1;
      return testId;
    }
    return 'no-fetch';
  });
  const proFieldKeyRef = useRef(cacheKey);

  const getOptionsFormValueEnum = useCallback((valueEnum) => {
    return proFieldParsingValueEnumToArray(ObjectToMap(valueEnum)).map(({ value, text }) => ({
      label: text,
      value,
      key: value,
    }));
  }, []);

  const [options, setOptions] = useMergedState<SelectProps<any>['options']>(
    () => {
      if (props.valueEnum) {
        return getOptionsFormValueEnum(props.valueEnum);
      }
      return [];
    },
    {
      value: props.fieldProps?.options,
    },
  );

  useDeepCompareEffect(() => {
    // 优先使用 fieldProps?.options
    if (!props.valueEnum || props.fieldProps?.options) return;
    setOptions(getOptionsFormValueEnum(props.valueEnum));
  }, [props.valueEnum]);

  const [loading, setLoading] = useState(false);

  const { data, mutate } = useSWR(
    [proFieldKeyRef.current, JSON.stringify(props.valueEnum)],
    async () => {
      if (props.request) {
        setLoading(true);
        const fetchData = await props.request(props.params, props);
        setLoading(false);
        return fetchData;
      }
      return [];
    },
    {
      revalidateOnFocus: false,
    },
  );

  return [
    loading,
    props.request ? data : options,
    async () => {
      if (!props.request) return;
      setLoading(true);
      const fetchData = await props.request(props.params, props);
      setLoading(false);
      mutate(fetchData, false);
    },
  ];
};

export const proFieldParsingText = (
  text: string | number | (string | number)[],
  valueEnumParams: ProFieldValueEnumType,
): React.ReactNode => {
  if (Array.isArray(text)) {
    return <Space> {text.map((value) => proFieldParsingText(value, valueEnumParams))}</Space>;
  }

  const valueEnum = ObjectToMap(valueEnumParams);

  if (!valueEnum.has(text) || !valueEnum.has(`${text}`)) {
    return text;
  }

  const domText = (valueEnum.get(text) || valueEnum.get(`${text}`)) as {
    text: React.ReactNode;
    status: ProFieldStatusType;
    color?: string;
  };

  if (!domText) {
    return text;
  }

  const { status, color } = domText;
  const Status = TableStatus[status || 'Init'];

  if (Status) {
    return <Status> {domText.text}</Status>;
  }

  if (color) {
    return <ProFieldBadgeColor color={color}> {domText.text}</ProFieldBadgeColor>;
  }

  return domText.text || domText;
};

const FieldSelect: ProFieldFC<FieldSelectProps> = (props, ref) => {
  const {
    mode,
    render,
    renderFormItem,
    fieldProps,
    request,
    valueEnum,
    plain,
    children,
    light,
    proFieldKey,
    ...rest
  } = props;
  const inputRef = useRef();
  const intl = useIntl();

  useEffect(() => {
    testId += 1;
  }, []);

  const [loading, options, fetchData] = useFieldFetchData(props);

  const size = useContext(SizeContext);

  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    fetchData: () => fetchData(),
  }));

  if (loading) {
    return <Spin />;
  }

  if (mode === 'read') {
    const optionsValueEnum: ProSchemaValueEnumObj = options?.length
      ? options.reduce((pre: any, cur) => {
          return { ...pre, [cur.value]: cur.label };
        }, {})
      : undefined;
    // @ts-ignore
    if (rest.text?.label) {
      // @ts-ignore
      return rest.text?.label;
    }
    const dom = (
      <>
        {proFieldParsingText(
          rest.text,
          (ObjectToMap(valueEnum || optionsValueEnum) as unknown) as ProSchemaValueEnumObj,
        )}
      </>
    );
    if (render) {
      return render(rest.text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const renderDom = () => {
      if (light) {
        <LightSelect
          size={size}
          loading={loading}
          ref={inputRef}
          allowClear
          {...rest}
          options={options}
          {...fieldProps}
        />;
      }
      return (
        <Select
          style={{ minWidth: 100 }}
          loading={loading}
          ref={inputRef}
          allowClear
          options={options}
          placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
          {...rest}
          {...fieldProps}
        />
      );
    };
    const dom = renderDom();
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldSelect);
