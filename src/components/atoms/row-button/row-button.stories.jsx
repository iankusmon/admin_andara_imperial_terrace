import React from 'react'
import RowButton from './row-button'


export default {
  title     : 'Library/Atoms/RowButton',
  component : RowButton,
  argTypes  : {
    onClick: {
      action: 'dismiss the alert'
    },
    data: {
      control: null
    },
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
          'dark',
          'link'
        ]
      }
    },
    size: {
      control: {
        type    : 'radio',
        options : [
          'sm',
          'md',
          'lg'
        ]
      }
    },
    outline: {
      control: {
        type: 'boolean'
      }
    }
  }
}

const Template = (args) => <RowButton { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  data     : {},
  text     : 'Select',
  disabled : false
}
