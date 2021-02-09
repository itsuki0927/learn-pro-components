import React from 'react';
import { message } from 'antd';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@/packages/form';
import { UserOutlined } from '@ant-design/icons';

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter',
      }}
    >
      <ProForm.Group>
        <ProFormText
          fieldProps={{ prefix: <UserOutlined /> }}
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="contract" width="md" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker width="md" name={['contract', 'createTime']} label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          readonly
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止',
            },
            {
              value: 'time2',
              label: '履行完终2止',
            },
            {
              value: 'time3',
              label: '履行完终止3',
            },
          ]}
          fieldProps={{
            onChange: (value) => {
              console.log('onSelect:', value);
            },
          }}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText name="project" width="md" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
    </ProForm>
  );
};
