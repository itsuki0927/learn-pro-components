import React, { FC } from 'react';
import { Upload } from 'antd';
import type { DraggerProps, UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormDraggerProps = ProFormItemProps<DraggerProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
  description?: React.ReactNode;
  max?: number;
};

const ProFormUploadDragger: FC<ProFormDraggerProps> = React.forwardRef(
  (
    {
      fieldProps,
      title = '单击或拖动文件到此区域进行上传',
      icon = <InboxOutlined />,
      description = '支持单次或批量上传',
      action,
      accept,
      onChange,
      value,
      children,
      max,
      proFieldProps,
    },
    ref,
  ) => {
    const showUploadButton =
      (max === undefined || !value || value?.length < max) && proFieldProps?.mode === 'read';
    return (
      <Upload.Dragger
        // @ts-ignore
        ref={ref}
        name="files"
        accept={accept}
        action={action}
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
        style={{ ...fieldProps?.style, display: !showUploadButton ? 'none' : undefined }}
      >
        <p className="ant-upload-drag-icon">{icon}</p>
        <p className="ant-upload-text">{title}</p>
        <p className="ant-upload-hint">{description}</p>
        {children}
      </Upload.Dragger>
    );
  },
);

export default createField<ProFormDraggerProps>(ProFormUploadDragger, {
  getValueFromEvent: (value: { fieldList: UploadProps['fileList'] }) => value.fieldList,
});
