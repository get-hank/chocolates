import React from "react";
import styled from "styled-components";
import { Text, TextProps } from "./typography";
import { space } from "../util/layout";
import { colors } from "../util/colors";

export type PillProps = TextProps & {
  pillColor?: string;
};

const Wrapper = styled.span<PillProps>`
  background-color: ${({ pillColor }) =>
    pillColor ? pillColor : colors.gray50};
  padding: 0 ${space(1)};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${space(3)};
`;

const Pill: React.FC<PillProps> = ({ pillColor, children, ...rest }) => (
  <Wrapper pillColor={pillColor}>
    <Text {...rest}>{children}</Text>
  </Wrapper>
);

export default Pill;
