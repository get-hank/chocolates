import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import styled from "styled-components";
import { Checkbox as CheckboxInput } from "./form/Checkbox";
import { Select as SelectFormInput, Option } from "./form/Select";
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
  placeholder?: string;
  autoComplete?: string;
  help?: string;
  inputType?: "text" | "multiLineText" | "select" | "checkbox" | "none";
  fillBg?: boolean;
  error?: boolean | string | null;
  disabled?: boolean;
  apiBase?: string;
  options?: Option[];
};

export const FormField: React.FC<FieldProps> = ({
  label,
  field,
  value,
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
  ...wrapperProps
}) => {
  const nativeProps = {
    disabled,
    placeholder,
    autoComplete,
    onChange: (e: any) =>
      onChange && onChange({ field, value: e.target.value }),
    defaultValue: value,
    name: field,
  };
  const styleProps = { error: !!error };
  return (
    <FieldWrapper direction="column" {...wrapperProps}>
      {inputType !== "checkbox" ? (
        <Div pb={1}>
          <Label weight={500}>{label}</Label>
        </Div>
      ) : null}
      {children ? children : null}
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
      {inputType === "checkbox" ? (
        <Container p={wrapperProps.fillBg ? 2 : 0} align="center">
          <Checkbox
            styledProps={styleProps}
            nativeProps={{
              ...nativeProps,
              defaultChecked: !!value,
              onChange: (e: any) =>
                onChange && onChange({ field, value: e.target.checked }),
            }}
          />
          <Div pl={1}>
            <Label>{label}</Label>
          </Div>
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
