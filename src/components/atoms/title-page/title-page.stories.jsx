import React from 'react'
import TitlePage from './title-page'

export default {
  title     : 'Library/Atoms/TitlePage',
  component : TitlePage
}

const Template = (args) => <TitlePage { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  mainTitle : 'Seller Inbound',
  subTitle  : 'Curation Detail'
}

export const WithoutSubtitle = Template.bind({})
WithoutSubtitle.args = {
  ...Basic.args,
  subTitle: ''
}
