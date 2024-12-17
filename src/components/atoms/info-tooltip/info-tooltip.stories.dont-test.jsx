import React from 'react'
import InfoToolTip from './info-tooltip'

export default {
  title     : 'Library/Atoms/InfoToolTip',
  component : InfoToolTip
}

/**
 * ! We name this file as *.dont-test.jsx to exclude from the snapshot testing
 *  since they always fail while doing snapshot testing
 *  due to error: Uncaught [Error: The target 'tooltip-id' could not be identified in the dom, tip: check spelling]
 */

const Template = (args) => <InfoToolTip { ...args } />

export const Basic = Template.bind({})
Basic.args = {
  id      : 'tooltip-id',
  message : 'Tooltip message'
}

export const LongMessages = Template.bind({})
LongMessages.args = {
  ...Basic.args,
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae lorem sed lectus pharetra posuere eget ac felis. Nam vulputate fringilla venenatis. Pellentesque placerat erat vel molestie sodales. In eget metus eu dolor consectetur ultrices nec quis ligula. Nam quis ornare lectus. Donec aliquam dapibus velit, volutpat sollicitudin justo lacinia eget. Nulla facilisi. Integer nibh dolor, luctus vitae feugiat nec, finibus dictum metus. Suspendisse scelerisque orci urna, vitae suscipit mi dignissim ut. Nullam est mi, tristique vel eleifend sed, mollis id ante.'
}
