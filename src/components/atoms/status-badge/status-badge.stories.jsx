import React from 'react'
import StatusBadge from './status-badge'

export default {
  title     : 'Library/Atoms/StatusBadge',
  component : StatusBadge,
  argTypes  : {
    color: {
      control: {
        type    : 'radio',
        options : [
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
          'info',
          'light',
          'dark'
        ]
      }
    }
  }
}

const Template = (args) => <StatusBadge { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  color : 'primary',
  label : 'Status'
}
