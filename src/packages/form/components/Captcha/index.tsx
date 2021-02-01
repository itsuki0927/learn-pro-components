import { Button, Input, Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { ButtonProps } from 'antd/lib/button';
import type { InputProps } from 'antd/lib/input';
import React, { useState, useCallback, useEffect } from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormCaptchaProps = ProFormItemProps<InputProps> & {
  countDown?: number;
  phoneName?: NamePath;
  onGetCaptcha: (mobile: string) => Promise<void>;
  captchaTextRender?: (timing: boolean, count: number) => React.ReactNode;
  captchaProps?: ButtonProps;
  value?: any;
  onChange?: any;
};

const ProFormCaptcha: React.FC<ProFormCaptchaProps> = React.forwardRef((props, ref: any) => {
  const [count, setCount] = useState<number>(props.countDown || 60);
  const [timing, setTiming] = useState(false);
  const [loading, setLoading] = useState<ButtonProps['loading']>();

  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    rules,
    name,
    countDown,
    phoneName,
    fieldProps,
    captchaTextRender = (paramsTiming, paramsCount) => {
      return paramsTiming ? `${paramsCount} 秒后重新获取` : '获取验证码';
    },
    captchaProps,
    value,
    onChange,
    ...restProps
  } = props;

  const onGetCaptcha = useCallback(async (mobile: string) => {
    try {
      setLoading({ delay: 100 });
      await restProps.onGetCaptcha(mobile);
      setLoading(false);
      setTiming(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <Form.Item noStyle shouldUpdate>
      {({ validateFields, getFieldValue }) => (
        <div style={{ ...fieldProps?.style, display: 'flex', alignItems: 'center' }} ref={ref}>
          <Input
            {...fieldProps}
            style={{
              flex: 1,
              transition: 'width .3s',
              marginRight: 8,
            }}
            value={value}
            onChange={onChange}
          />
          <Button
            style={{ display: 'block' }}
            disabled={timing}
            loading={loading}
            {...captchaProps}
            onClick={async () => {
              try {
                if (phoneName) {
                  const phone = [phoneName].flat(1) as string[];
                  await validateFields(phone);
                  const mobile = getFieldValue(phone);
                  await onGetCaptcha(mobile);
                } else {
                  await onGetCaptcha('');
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {captchaTextRender(timing, count)}
          </Button>
        </div>
      )}
    </Form.Item>
  );
});

export default createField(ProFormCaptcha);
