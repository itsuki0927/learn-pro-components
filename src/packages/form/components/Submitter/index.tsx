import React, { FC } from 'react';
import type { FormInstance } from 'antd/lib/form';
import { Button, Space } from 'antd';
import { useIntl } from '@/packages/provider';
import type { ButtonProps } from 'antd/lib/button';
import { render } from 'react-dom';

export type SearchConfig = {
  resetText?: React.ReactNode;
  submitText?: React.ReactNode;
};

export type SubmitterProps<T = {}> = {
  onSubmit?: () => void;
  onReset?: () => void;
  searchConfig?: SearchConfig;
  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;
  render?:
    | ((
        props: SubmitterProps & T,
        dom: JSX.Element[],
      ) => React.ReactNode[] | React.ReactNode | false)
    | false;
};

const Submitter: FC<SubmitterProps & { form: FormInstance }> = (props) => {
  const intl = useIntl();
  if (props.render === false) {
    return null;
  }

  const { form, onSubmit, onReset, submitButtonProps, resetButtonProps, searchConfig = {} } = props;

  const {
    submitText = intl.getMessage('tableForm.submit', '提交'),
    resetText = intl.getMessage('tableForm.reset', '重置'),
  } = searchConfig;

  const dom = [
    <Button
      {...resetButtonProps}
      key="rest"
      onClick={(e) => {
        form.resetFields();
        onReset?.();
        resetButtonProps?.onClick?.(e);
      }}
    >
      {resetText}
    </Button>,
    <Button
      {...submitButtonProps}
      key="submit"
      type="primary"
      onClick={(e) => {
        form.submit();
        onSubmit?.();
        submitButtonProps?.onClick?.(e);
      }}
    >
      {submitText}
    </Button>,
  ];

  const renderDom = render ? render(props, dom) : dom;
  if (!renderDom) {
    return null;
  }
  if (Array.isArray(renderDom)) {
    if (renderDom?.length < 1) {
      return null;
    }
    return <Space>{renderDom}</Space>;
  }
  return renderDom as JSX.Element;
};

export default Submitter;
