import React from 'react'
import SuccessAlert from './success-alert'
import { Button } from 'reactstrap'

export default {
  title     : 'Library/Atoms/SuccessAlert',
  component : SuccessAlert,
  argTypes  : {
    onDismiss: { action: 'dismiss the alert' }
  }
}

const Template = (args) => <SuccessAlert { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  message : 'Your request has been sent.',
  isOpen  : false
}

export const WithButtonComp = Template.bind({})
WithButtonComp.args = {
  ...Basic.args,
  message    : 'Inbound has been created.',
  buttonComp : <Button>Receive the Inbound</Button>
}
