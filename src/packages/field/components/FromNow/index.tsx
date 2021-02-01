import { useIntl } from '@/packages/provider';
import { parseValueToMoment } from '@/packages/utils';
import { DatePicker, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import type { ProFieldFC } from '../..';

const FieldFromNow: ProFieldFC<{ text: string; format?: string }> = ({
  text,
  mode,
  render,
  renderFormItem,
  fieldProps,
  format,
}) => {
  const intl = useIntl();

  if (mode === 'read') {
    const dom = (
      <Tooltip title={moment(text).format(format || 'YYYY-MM-DD HH:mm:ss')}>
        {moment(text).fromNow()}
      </Tooltip>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择');
    const momentValue = parseValueToMoment(fieldProps.value) as moment.Moment;
    const dom = <DatePicker placeholder={placeholder} {...fieldProps} value={momentValue} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldFromNow;
