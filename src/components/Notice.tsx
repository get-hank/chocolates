import React from 'react'
import { colors } from '../util/colors'
import { Div } from './spacing'

export type Severity = 'info' | 'warn' | 'error'

export const severities: { [key: string]: Severity } = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
}

type NoticeProps = React.ComponentProps<typeof Div> & {
  severity?: Severity
  color?: string
  noticeProps?: React.ComponentProps<typeof Div>
}

const severityColors = {
  info: colors.gray50,
  warn: colors.orange50,
  error: colors.red50,
}

const Notice: React.FC<NoticeProps> = ({
  color,
  severity,
  children,
  noticeProps = {},
  ...rest
}) => (
  <Div {...rest}>
    <Div
      p={2}
      {...noticeProps}
      style={{
        borderRadius: '8px',
        backgroundColor: color || severityColors[severity || 'info'],
        ...noticeProps.style,
      }}
    >
      {children}
    </Div>
  </Div>
)

export default Notice
