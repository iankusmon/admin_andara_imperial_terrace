import React from 'react'
import TextColumnFilter from './text-column-filter'


export default {
  title     : 'Library/Atoms/TextColumnFilter',
  component : TextColumnFilter,
  argTypes  : {
    column: {
      control: {
        type: null
      }
    }
  }
}


const Template = (args) => <TextColumnFilter { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  column: {
    filterValue : '',
    setFilter   : (e) => e
  }
}
