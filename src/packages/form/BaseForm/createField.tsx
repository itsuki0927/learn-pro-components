import type { ProFormItemProps } from '../interface';

function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: any,
) {
  console.log(config);
  return Field;
}

export default createField;
