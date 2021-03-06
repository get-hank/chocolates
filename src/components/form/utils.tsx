import { space } from "../../util/layout";
import { colors } from "../../util/colors";
import { fontSize, Text, TextProps, rulesForTextProps } from "../typography";
import { SpacingProps } from "../spacing";

export type InputProps = SpacingProps & TextProps;

export const inputStyle = (props: InputProps) => `
  box-sizing: border-box;
  width: 100%;
  font-family: ${props.theme.typography.baseType};
  ${fontSize(1, props.theme.typography.baseSize)};
  ${rulesForTextProps(props)}
  border: 1px solid ${props.theme.colors.grayBorder};
  border-radius: 4px;
  padding: ${space(1)};
  background-color: ${props.error ? props.theme.colors.errorLightest : props.theme.colors.white
  };
  border-color: ${props.error ? props.theme.colors.error : props.theme.colors.grayBorder
  };
`;
