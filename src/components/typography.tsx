import React from "react";
import styled from "styled-components";
import { SpacingProps, SpacingContainer } from "./spacing";
import { passThroughRule, rem } from "../util/helpers";
import { breakPoint } from "../util/layout";
import { colors } from "../util/colors";

export const fontSize = (size = 1, base = 1) =>
  `font-size: ${rem(size, base)};`;

export type TextProps = SpacingProps & {
  center?: boolean;
  color?: string;
  weight?: 200 | 300 | 400 | 500 | 600 | 700;
  lineHeight?: number; // percentage
  theme: any;
};

const colorRule = (color: string | undefined) =>
  color ? `color: ${color};` : "";

const lineHeightRule = (lineHeight: number | undefined) =>
  lineHeight ? `line-height: ${lineHeight}%;` : "";

const rulesForTextProps = ({
  center,
  color,
  lineHeight,
  weight,
}: TextProps) => `
  margin: 0;
  ${center ? "text-align: center;" : ""}
  ${colorRule(color)}
  ${lineHeightRule(lineHeight)}
  ${passThroughRule("font-weight", weight)}
`;

const tagMap: any = {};
const nativeTags = ["h1", "h2", "h3", "h4", "h5", "h5", "p"];
const components = nativeTags.reduce((memo = {}, tag) => {
  // @ts-ignore
  memo[tag] = (props: SpacingProps) => <SpacingContainer {...props} as={tag} />;
  return memo;
}, tagMap);

export const H1 = styled(components.h1) <TextProps>`
  color: ${colors.text};
  ${({ theme }) => fontSize(3, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.headingType)}
  font-weight: 300;

  @media (max-width: ${breakPoint("sm")}px) {
    ${({ theme }) => fontSize(2, theme.typography.baseSize)}
    font-weight: 400;
  }

  ${rulesForTextProps}
`;

export const H2 = styled(components.h2) <TextProps>`
  color: ${colors.text};
  ${({ theme }) => fontSize(2, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.headingType)}
  font-weight: 400;

  @media (max-width: ${breakPoint("sm")}px) {
    ${({ theme }) => fontSize(1.75, theme.typography.baseSize)}
  }

  ${rulesForTextProps}
`;

export const H3 = styled(components.h3) <TextProps>`
  color: ${colors.text};
  ${({ theme }) => fontSize(1.5, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.headingType)}
  font-weight: 400;

  @media (max-width: ${breakPoint("sm")}px) {
    ${({ theme }) => fontSize(1.375, theme.typography.baseSize)}
  }

  ${rulesForTextProps}
`;

export const H4 = styled(components.h4) <TextProps>`
  color: ${colors.text};
  ${({ theme }) => fontSize(1.25, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.headingType)}
  font-weight: 400;

  @media (max-width: ${breakPoint("sm")}px) {
    ${({ theme }) => fontSize(1.125, theme.typography.baseSize)}
  }

  ${rulesForTextProps}
`;

export const H5 = styled(components.h5) <TextProps>`
  color: ${colors.text};
  ${({ theme }) => fontSize(0.75, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.headingType)}
  font-weight: 400;
  letter-spacing: 1px;

  ${rulesForTextProps}
`;

export const P = styled(components.p) <TextProps>`
  color: ${colors.text};
  ${({ theme }) => fontSize(1, theme.typography.baseSize)}
  ${({ theme }) => passThroughRule("font-family", theme.typography.baseType)}

  ${rulesForTextProps}
`;
