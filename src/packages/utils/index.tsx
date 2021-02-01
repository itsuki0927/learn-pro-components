import LabelIconTip from './components/LabelIconTip';
import FilterDropdown from './components/FilterDropdown';
import FieldLabel from './components/FieldLabel';
import InlineErrorFormItem from './components/InlineErrorFormItem';

import isBrowser from './isBrowser';
import isImg from './isImg';
import isUrl from './isUrl';
import isNil from './isNil';
import isDropdownValueType from './isDropdownValueType';
import pickProProps from './pickProProps';
import omitUndefined from './omitUndefined';
import omitBoolean from './omitBoolean';
import omitUndefinedAndEmptyArr from './omitUndefinedAndEmptyArr';
import pickProFormItemProps from './pickProFormItemProps';

/**
 * hooks
 */
import useDebounceFn from './hooks/useDebounceFn';
import usePrevious from './hooks/usePrevious';
import conversionSubmitValue from './conversionSubmitValue';
import transformKeySubmitValue from './transformKeySubmitValue';
import parseValueToMoment from './parseValueToMoment';
import useDeepCompareEffect from './hooks/useDeepCompareEffect';
import useDocumentTitle from './hooks/useDocumentTitle';

/**
 * type
 */
import type {
  SearchTransformKeyFn,
  ProFieldValueType,
  ProFieldValueEnumType,
  ProFieldRequestData,
  ProFieldValueObjectType,
  ProFieldTextType,
  ProSchema,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  ProSchemaValueEnumType,
} from './typing';
import getFieldPropsOrFormItemProps from './getFieldPropsOrFormItemProps';
import DropdownFooter from './components/DropdownFooter';
import runFunction from './runFunction';
import type {
  BaseProFieldFC,
  ProFieldFCMode,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '@/packages/provider';

export type {
  SearchTransformKeyFn,
  ProFieldRequestData,
  ProFieldValueType,
  ProRenderFieldPropsType,
  ProFieldFCRenderProps,
  ProFieldFCMode,
  BaseProFieldFC,
  ProFieldValueEnumType,
  ProFieldValueObjectType,
  ProFieldTextType,
  ProSchema,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  ProSchemaValueEnumType,
};

export {
  omitBoolean,
  LabelIconTip,
  FilterDropdown,
  FieldLabel,
  InlineErrorFormItem,
  DropdownFooter,
  // function
  transformKeySubmitValue,
  conversionSubmitValue,
  parseValueToMoment,
  useDocumentTitle,
  isImg,
  isNil,
  isDropdownValueType,
  omitUndefined,
  omitUndefinedAndEmptyArr,
  pickProFormItemProps,
  isUrl,
  isBrowser,
  pickProProps,
  runFunction,
  getFieldPropsOrFormItemProps,
  // hooks
  useDeepCompareEffect,
  usePrevious,
  useDebounceFn,
};
