import { Slider } from 'antd';
import type { SliderBaseProps } from 'antd/lib/slider';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormSliderProps = ProFormItemProps<SliderBaseProps> & {
  range?: boolean;
  min?: SliderBaseProps['min'];
  max?: SliderBaseProps['max'];
  step?: SliderBaseProps['step'];
  marks?: SliderBaseProps['marks'];
  vertical?: SliderBaseProps['vertical'];
};

const ProFormSlider: React.ForwardRefRenderFunction<
  any,
  ProFormSliderProps
> = React.forwardRef(({ range, min, max, step, marks, vertical, fieldProps }, ref) => (
  <Slider
    min={min}
    max={max}
    step={step}
    marks={marks}
    vertical={vertical}
    range={range}
    {...fieldProps}
    ref={ref}
  />
));

export default createField<ProFormSliderProps>(ProFormSlider, {
  lightFilterLabelFormatter: (value: any) => {
    if (Array.isArray(value)) {
      return value.join('~');
    }
    return value;
  },
});
