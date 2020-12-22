import React from "react";
import styled from "styled-components";
import { space } from "../util/layout";
import { colors } from "../util/colors";
import { Text, TextProps } from "./typography";

const input = (props: TextProps & HTMLInputElement) => (
  <Text {...props} as="input" />
);
export const Input = styled(input)`
  border: 1px solid ${colors.gray100};
  border-radius: 4px;
  padding: ${space(1)};
`;

const textarea = (props: TextProps & HTMLTextAreaElement) => (
  <Text {...props} as="textarea" />
);
export const TextArea = styled(textarea)`
  border: 1px solid ${colors.gray100};
  border-radius: 4px;
  padding: ${space(1)};
  line-height: 150%;
`;

const checkbox = (props: TextProps & HTMLInputElement) => (
  <Text type="checkbox" {...props} as="input" />
);
export const Checkbox = styled(checkbox)`
  border: 1px solid ${colors.gray100};
  color: ${colors.gray100};
`;

const select = (props: TextProps & HTMLSelectElement) => (
  <Text {...props} as="select" />
);
export const Select = styled(select)`
  border: 1px solid ${colors.gray100};
  border-radius: 4px;
  padding: ${space(1)};
  background-color: ${colors.white};
`;

const label = (props: TextProps & HTMLLabelElement) => (
  <Text {...props} as="label" />
);

export const Label = styled(label)``;
