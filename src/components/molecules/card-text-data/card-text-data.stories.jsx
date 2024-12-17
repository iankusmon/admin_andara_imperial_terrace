import React from 'react'
import CardTextData from './card-text-data'
import StatusBadge from 'components/atoms/status-badge'

export default {
  title     : 'Library/Molecules/CardTextData',
  component : CardTextData
}

const Template = (args) => <CardTextData { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  label : 'Inbound Code',
  value : 'IN-14294'
}

export const WithoutValue = Template.bind({})
WithoutValue.args = {
  ...Basic.args,
  value: null
}

export const ValueAsComponent = Template.bind({})
ValueAsComponent.args = {
  ...Basic.args,
  label : 'Curation Status',
  value : <StatusBadge color='success' label='Accepted' />
}