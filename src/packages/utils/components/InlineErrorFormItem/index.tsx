import React, { FC, useState } from 'react';
import { Form, Popover } from 'antd';
import type { FormItemProps } from 'antd/lib/form';

const InlineErrorFormItem: FC<FormItemProps> = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Form.Item
      style={{ margin: '-5px 0' }}
      preserve={false}
      // @ts-ignore
      _internalItemRender={{
        mark: 'pro_table_render',
        render: (
          inputProps: FormItemProps & { errors: any[] },
          {
            input,
            errorList,
            extra,
          }: { extra: JSX.Element; input: JSX.Element; errorList: JSX.Element },
        ) => {
          const { errors } = inputProps;
          return (
            <Popover
              trigger={props.trigger}
              placement="topLeft"
              visible={!!errors.length && visible}
              content={<div>{errorList}</div>}
              onVisibleChange={(v) => errors.length && setVisible(v)}
            >
              <div>
                {input}
                {extra}
              </div>
            </Popover>
          );
        },
      }}
    >
      {props.children}
    </Form.Item>
  );
};

export default InlineErrorFormItem;
