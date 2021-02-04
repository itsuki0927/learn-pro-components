import React from 'react';
import { Upload, Button } from 'antd';
import type { UploadProps } from 'antd/lib/upload';
import type { ButtonProps } from 'antd/lib/button';
import { UploadOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormDraggerProps = ProFormItemProps<UploadProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  listType?: UploadProps['listType'];
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
  max?: number;
  buttonProps?: ButtonProps;
  disabled?: ButtonProps['disabled'];
};

const ProFormUploadButton: React.ForwardRefRenderFunction<
  any,
  ProFormDraggerProps
> = React.forwardRef(
  (
    {
      fieldProps,
      action,
      accept,
      listType,
      title = '单击上传',
      max,
      icon = <UploadOutlined />,
      value,
      buttonProps,
      onChange,
      disabled,
      proFieldProps,
    },
    ref,
  ) => {
    const showUploadButton =
      (max === undefined || !value || value?.length < max) && proFieldProps?.mode !== 'read';

    return (
      <Upload
        accept={accept}
        action={action}
        ref={ref}
        name="fileList"
        listType={listType || 'picture'}
        fileList={value}
        {...fieldProps}
        onChange={(info) => {
          if (onChange) {
            onChange(info);
          }
          if (fieldProps?.onChange) {
            fieldProps.onChange(info);
          }
        }}
      >
        {showUploadButton && (
          <Button disabled={disabled || fieldProps?.disabled} {...buttonProps}>
            {icon}
            {title}
          </Button>
        )}
      </Upload>
    );
  },
);

export default createField<ProFormDraggerProps>(ProFormUploadButton, {
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
