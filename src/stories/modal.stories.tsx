// @ts-nocheck
import React, { ComponentProps, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Container } from '../components/grid'
import { P } from '../components/typography'
import Modal from '../components/Modal'
import { colors } from '../util/colors'

export default {
  title: 'Modal',
  component: Modal,
} as Meta

const Template: Story<ComponentProps<typeof Modal>> = (args) => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(true)

  return (
    <Container center>
      <P>{message}</P>
      <Modal
        {...args}
        open={open}
        onDismiss={() => {
          setOpen(false)
          setMessage('Canceled!')
        }}
      />
    </Container>
  )
}

export const Wide = Template.bind({})
Wide.args = {
  children: (
    <Container center direction="column">
      <P pb={2}>
        {[...Array(20)]
          .map((_, idx) => (
            <React.Fragment key={idx}>'more text'</React.Fragment>
          ))
          .join(', ')}
      </P>
    </Container>
  ),
  titleText: 'Wide ol modal',
  submitText: 'Submit',
  cancelText: 'Cancel',
  animate: true,
}

export const Long = Template.bind({})
Long.args = {
  children: (
    <Container center direction="column">
      {[...Array(20)].map((_, idx) => (
        <P p={3} key={idx}>
          Hello!!
        </P>
      ))}
    </Container>
  ),
  titleText:
    'Long ol modal with a very long title to show how it adds ellipsis when scrolling off of view. See how it adds ellipsis? Neato!',
  submitText: 'Submit',
  cancelText: 'Cancel',
}

export const Dialog = Template.bind({})
Dialog.args = {
  children: <P>Are you sure?</P>,
  back: false,
  size: 'small',
  titleText: 'Confirm modal',
  submitColor: colors.red600,
  submitText: 'Do it',
  cancelText: 'Nevermind',
}

export const FullScreen = Template.bind({})
FullScreen.args = {
  ...Wide.args,
  size: 'full',
  headerCenterContent: 'Hello!',
}
