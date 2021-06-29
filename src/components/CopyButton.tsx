import React from 'react'
import Button from './Button'
import { Link } from './Link'
import { Div } from './spacing'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type CopyButtonProps = React.ComponentProps<typeof Div> & {
  text: string
  buttonProps?: React.ComponentProps<typeof Button>
  linkProps?: React.ComponentProps<typeof Link>
  label?: string
  variant?: 'button' | 'link'
}

const CopyButton = ({
  text,
  label,
  buttonProps,
  linkProps,
  variant = 'link',
  ...divProps
}: CopyButtonProps) => {
  return (
    <CopyToClipboard text={text}>
      <Div {...divProps}>
        {variant === 'button' && (
          <Button {...buttonProps}>{label || 'Copy'}</Button>
        )}
        {variant === 'link' && <Link {...linkProps}>{label || 'Copy'}</Link>}
      </Div>
    </CopyToClipboard>
  )
}

export default CopyButton
