import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';
import { parseValueToMoment } from '@ant-design/pro-utils';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import type { DatePickerProps } from 'antd/lib/date-picker';
import type { ProFieldFC } from '../../index';
import './index.less';

const FieldDatePicker: ProFieldFC<{
  text: string | number;
  format: string;
  showTime?: boolean;
  bordered?: boolean;
  picker?: DatePickerProps['picker'];
}> = (
  {
    mode,
    text,
    label,
    format,
    render,
    renderFormItem,
    light,
    plain,
    showTime,
    fieldProps,
    picker,
    bordered,
  },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [open, setOpen] = useState(false);

  if (mode === 'read') {
    const dom = <span ref={ref}>{text ? moment(text).format(format || 'YYYY-MM-DD') : '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, <span> {dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const {
      disabled,
      value,
      onChange,
      allowClear,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;
    const momentValue = parseValueToMoment(value) as moment.Moment;
  }
};

export default React.forwardRef(FieldDatePicker);
