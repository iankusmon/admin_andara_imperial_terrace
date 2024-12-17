import React from 'react'
import SkeletonLoader from './skeleton-loader'

export default {
  title     : 'Library/Atoms/SkeletonLoader',
  component : SkeletonLoader,
  argTypes  : {
    theme: {
      control: {
        type    : 'radio',
        options : [
          'dark',
          'light'
        ]
      }
    },
    width: {
      control: {
        type : 'range',
        min  : 50,
        max  : 1200,
        step : 50
      }
    },
    height: {
      control: {
        type : 'range',
        min  : 50,
        max  : 1200,
        step : 50
      }
    }
  }
}

const Template = (args) => <SkeletonLoader { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  theme  : 'dark',
  width  : 100,
  height : 100
}

export const Inverse = Template.bind({})
Inverse.parameters = {
  backgrounds: { default: 'dark' }
}

Inverse.args = {
  ...Basic.args,
  theme: 'light'
}
