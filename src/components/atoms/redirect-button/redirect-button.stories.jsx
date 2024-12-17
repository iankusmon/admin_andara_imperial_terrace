import React from 'react'
import RedirectButton from './redirect-button'
import { MemoryRouter } from 'react-router-dom'


export default {
  title      : 'Library/Atoms/RedirectButton',
  component  : RedirectButton,
  decorators : [
    (Story) => (
      <MemoryRouter>
        <div className='d-flex justify-content-center' style={{ width: '1000px' }}>
          <Story/>
        </div>
      </MemoryRouter>
    )
  ],
  argTypes: {
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
    path: {
      disable: true
    }
  }
}

const Template = (args) => <RedirectButton { ...args } />

export const Basic = Template.bind({})

Basic.args = {
  text : 'Go to the detail',
  path : window.location.href
}
