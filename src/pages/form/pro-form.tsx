import React from 'react';
import { message } from 'antd';
import ProForm, { ProFormFieldSet, ProFormSwitch, ProFormText } from '@/packages/form';

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log('onFinish:', values);
        message.success('提交成功');
      }}
    >
      <ProFormFieldSet
        name="list"
        label="组件列表"
        transform={(value: any) => ({ startTime: value[0], endTime: value[2] })}
      >
        <ProFormText width="md" />
        <ProFormText width="md" />
        <ProFormText width="md" />
      </ProFormFieldSet>
      <ProFormText
        fieldProps={{
          onChange: (e) => {
            console.log('onChange:', e.target.value);
          },
        }}
        name="unusedMode"
        label="合同约定失效效方式"
      />
      <ProFormSwitch name="fd" label="cc" />
    </ProForm>
  );
};
