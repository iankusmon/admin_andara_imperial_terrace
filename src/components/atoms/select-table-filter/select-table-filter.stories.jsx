import React from 'react'
import SelectTableFilter from './select-table-filter'


export default {
  title     : 'Library/Atoms/SelectTableFilter',
  component : SelectTableFilter,
  argTypes  : {
    reactTableColumn: {
      control: {
        type: null
      }
    }
  }
}

const Template = (args) => <SelectTableFilter { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  reactTableColumn: {
    filterValue : '',
    setFilter   : (e) => e
  },
  options: [
    {
      label : 'pending',
      value : 'pending'
    },
    {
      label : 'complete',
      value : 'complete'
    },
    {
      label : 'failed',
      value : 'failed'
    }
  ]
}
