import React from 'react'
import Button from './Button'
import { Div } from './spacing'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type CopyButtonProps = React.ComponentProps<typeof Div> & {
  text: string
  buttonProps: React.ComponentProps<typeof Button>
  label?: string
}

const CopyButton = ({
  text,
  label,
  buttonProps,
  ...divProps
}: CopyButtonProps) => {
  return (
    <CopyToClipboard text={text}>
      <Div {...divProps}>
        <Button>{label || 'Copy'}</Button>
      </Div>
    </CopyToClipboard>
  )
}

export default CopyButton
