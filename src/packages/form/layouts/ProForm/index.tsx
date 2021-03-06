import { Form } from 'antd';
import type { FormProps } from 'antd/lib/form/Form';
import React, { FC } from 'react';
import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';
import Group from '../../components/Group';

export type ProFormProps = Omit<FormProps, 'onFinish'> & CommonFormProps;

const ProForm: FC<ProFormProps> & {
  Group: typeof Group;
  useForm: typeof Form.useForm;
} = (props) => (
  <BaseForm
    layout="vertical"
    submitter={{ render: (_, dom) => dom.reverse() }}
    contentRender={(items, submitter) => (
      <>
        {items}
        {submitter}
      </>
    )}
    {...props}
  />
);

ProForm.Group = Group;
ProForm.useForm = Form.useForm;

export default ProForm;
