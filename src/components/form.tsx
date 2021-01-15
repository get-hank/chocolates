import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import styled from "styled-components";
import { Checkbox as CheckboxInput } from "./form/Checkbox";
import { Radio as RadioInput } from "./form/Radio";
import { Select as SelectFormInput, Option } from "./form/Select";
import {
  DatePicker as DatePickerInput,
  DatePickerProps,
} from "./form/DatePicker";
import {
  TimePicker as TimePickerInput,
  TimePickerProps,
} from "./form/TimePicker";
import { Input as FormInput } from "./form/Input";
import { inputStyle, InputProps } from "./form/utils";
import { Container, ContainerProps } from "./grid";
import { Div } from "./spacing";
import { P, TextProps, rulesForTextProps } from "./typography";
import { space } from "../util/layout";
import { colors } from "../util/colors";

export const Select = SelectFormInput;
export const Input = FormInput;
export const Checkbox = CheckboxInput;
export const Radio = RadioInput;
export const DatePicker = DatePickerInput;
export const TimePicker = TimePickerInput;

const TextAreaStyle = styled(Div) <InputProps>`
  textarea {
    ${inputStyle}
    line-height: 150%;
  }
`;

export const TextArea = ({
  styledProps = {},
  nativeProps,
}: {
  styledProps?: InputProps;
  nativeProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
}) => (
    <TextAreaStyle {...styledProps}>
      <textarea {...nativeProps} />
    </TextAreaStyle>
  );

export const Label = styled.label<
  TextProps & LabelHTMLAttributes<HTMLLabelElement>
  >`
  font-family: ${({ theme }) => theme.typography.baseType};
  ${rulesForTextProps}
`;

type FormFieldWrapperProps = ContainerProps & {
  fillBg?: boolean;
};
const FieldWrapper = styled(Container) <FormFieldWrapperProps>`
  ${({ fillBg }) => (fillBg ? `background-color: ${colors.gray50};` : "")}
  border-radius: 8px;
`;

export type FieldEdit = { field: string; value: any };

type FieldProps = Omit<FormFieldWrapperProps, "onChange"> & {
  label: string;
  field: string;
  onChange?: (edit: FieldEdit) => any;
  value?: any;
  checked?: boolean;
  placeholder?: string;
  autoComplete?: string;
  help?: string;
  inputType?:
  | "text"
  | "multiLineText"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "none";
  fillBg?: boolean;
  error?: boolean | string | null;
  disabled?: boolean;
  apiBase?: string;
  options?: Option[];
  pickerProps?: DatePickerProps["pickerProps"];
};

export const FormField: React.FC<FieldProps> = ({
  label,
  field,
  value,
  checked,
  onChange,
  help,
  placeholder,
  apiBase,
  options,
  error,
  autoComplete,
  disabled = false,
  inputType = "text",
  children,
  pickerProps,
  ...wrapperProps
}) => {
  const baseNativeProps = {
    disabled,
    placeholder,
    autoComplete,
    onChange: (e: any) =>
      onChange && onChange({ field, value: e.target.value }),
    name: field,
  };
  const nativeProps = {
    ...baseNativeProps,
    defaultValue: value,
  };

  const styleProps = { error: !!error };
  const selectable = ["radio", "checkbox"].includes(inputType);

  return (
    <FieldWrapper direction="column" {...wrapperProps} grow>
      {!selectable ? (
        <Div pb={1}>
          <Label weight={500}>{label}</Label>
        </Div>
      ) : null}
      {children && !selectable ? children : null}
      {inputType === "text" ? (
        <Input styledProps={styleProps} nativeProps={nativeProps} />
      ) : null}
      {inputType === "select" ? (
        <SelectFormInput
          options={options}
          styledProps={styleProps}
          nativeProps={nativeProps}
        />
      ) : null}
      {inputType === "multiLineText" ? (
        <TextArea styledProps={styleProps} nativeProps={nativeProps} />
      ) : null}
      {inputType === "time" ? (
        <TimePicker
          onTimeChange={(value) => onChange && onChange({ field, value })}
          styledProps={styleProps}
          nativeProps={nativeProps}
        />
      ) : null}
      {inputType === "date" ? (
        <DatePicker
          styledProps={styleProps}
          onDateChange={(value) => onChange && onChange({ field, value })}
          nativeProps={nativeProps}
          pickerProps={pickerProps}
        />
      ) : null}
      {inputType === "checkbox" ? (
        <Container p={wrapperProps.fillBg ? 2 : 0} align="center" grow>
          <Checkbox
            styledProps={styleProps}
            nativeProps={{
              ...baseNativeProps,
              defaultChecked: checked !== undefined ? checked : !!value,
              onChange: (e: any) =>
                onChange && onChange({ field, value: e.target.checked }),
            }}
          >
            {children ? children : <Label>{label}</Label>}
          </Checkbox>
        </Container>
      ) : null}
      {inputType === "radio" ? (
        <Container p={wrapperProps.fillBg ? 2 : 0} align="center" grow>
          <Radio
            styledProps={styleProps}
            nativeProps={{
              ...baseNativeProps,
              value,
              defaultChecked: checked,
              onChange: (e: any) => onChange && onChange({ field, value }),
            }}
          >
            {children ? children : <Label>{label}</Label>}
          </Radio>
        </Container>
      ) : null}
      {help ? (
        <P pt={1} color={colors.gray600}>
          {help}
        </P>
      ) : null}
      {typeof error === "string" ? (
        <P pt={1} error>
          {error}
        </P>
      ) : null}
    </FieldWrapper>
  );
};
