import { ConfigProviderWrap } from '@/packages/provider';
import type { ProFieldValueType, SearchTransformKeyFn } from '@/packages/utils';
import {
  conversionSubmitValue,
  transformKeySubmitValue,
  useMountMergeState,
} from '@/packages/utils';
import { Form } from 'antd';
import type { ButtonProps } from 'antd/lib/button';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import type { FormItemProps } from 'antd/lib/form';
import type { FormInstance, FormProps } from 'antd/lib/form/Form';
import namePathSet from 'rc-util/lib/utils/set';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { SubmitterProps } from '../components/Submitter';
import Submitter from '../components/Submitter';
import FieldContext from '../FieldContext';
import type { FieldProps, GroupProps } from '../interface';

export type CommonFormProps = {
  submitter?: SubmitterProps<{ form?: FormInstance<any> }> | false;
  onFinish?: (formData: Record<string, any>) => Promise<boolean | void>;
  formRef?: React.MutableRefObject<FormInstance | undefined>;
};

export type BaseFormProps = {
  contentRender?: (
    items: React.ReactNode[],
    submitter: React.ReactElement<SubmitterProps> | undefined,
    form: FormInstance<any>,
  ) => React.ReactNode;
  fieldProps?: FieldProps;
  onInit?: () => void;
  dateFormatter?: 'number' | 'string' | false;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
} & Omit<FormProps, 'onFinish'> &
  CommonFormProps;

const BaseForm: FC<BaseFormProps> = (props) => {
  const {
    children,
    contentRender,
    submitter,
    fields,
    onInit,
    form: userForm,
    formRef: propsFormRef,
    dateFormatter = 'string',
    // 不知道用处props
    fieldProps,
    groupProps,
    formItemProps,
    ...rest
  } = props;

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(userForm || form);
  const [loading, setLoading] = useMountMergeState<ButtonProps['loading']>(false);
  const fieldsValueType = useRef<Record<string, ProFieldValueType>>({});
  // 保存 transformKeyRef 用来transform
  const transformKeyRef = useRef<Record<string, SearchTransformKeyFn | undefined>>({});
  const [isUpdate, updateState] = useState(false);

  const items = React.Children.toArray(children);
  const submitterProps: SubmitterProps =
    typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const submitterDom =
    submitter === false ? undefined : (
      <Submitter
        key="submitter"
        {...submitterProps}
        form={userForm || form}
        submitButtonProps={{ loading, ...submitterProps.submitButtonProps }}
      />
    );

  // 内容渲染
  const content = contentRender ? contentRender(items, submitterDom, formRef.current) : items;

  const forgetUpdate = () => {
    setTimeout(() => updateState(true));
  };

  useEffect(() => {
    if (isUpdate) {
      onInit?.();
    }
  }, [isUpdate]);

  return (
    <ConfigProviderWrap>
      <FieldContext.Provider
        value={{
          fieldProps,
          formItemProps,
          groupProps,
          setFieldValueType: (name, { valueType = 'text', transform }) => {
            // 保存valueType
            if (Array.isArray(name)) {
              transformKeyRef.current = namePathSet(transformKeyRef.current, name, transform);
              fieldsValueType.current = namePathSet(fieldsValueType.current, name, valueType);
            } else {
              transformKeyRef.current[`${name}`] = transform;
              fieldsValueType.current[`${name}`] = valueType;
            }
          },
        }}
      >
        <SizeContext.Provider value={rest.size}>
          <Form
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                formRef.current?.submit();
              }
            }}
            form={userForm || form}
            {...rest}
            onFinish={async (values) => {
              if (!rest.onFinish) {
                return;
              }
              setLoading({ delay: 100 });
              await rest.onFinish(
                // 然后在进行key的转换
                transformKeySubmitValue(
                  // 先转换value(Moment -> string|number、去除undefined)
                  conversionSubmitValue(values, dateFormatter, fieldsValueType.current),
                  transformKeyRef.current,
                ),
              );
              setLoading(false);
            }}
          >
            <Form.Item noStyle shouldUpdate>
              {(formInstance) => {
                if (propsFormRef && !isUpdate) forgetUpdate();
                if (propsFormRef) propsFormRef.current = formInstance as FormInstance;
                formRef.current = formInstance as FormInstance;
              }}
            </Form.Item>
            {content}
          </Form>
        </SizeContext.Provider>
      </FieldContext.Provider>
    </ConfigProviderWrap>
  );
};

export default BaseForm;
