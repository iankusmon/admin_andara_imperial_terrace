// exports all components in all the subfolders inside /src/components
const req = require.context('.', true, /\.\/[^/]+\/[^/]+\/index\.js$/)

req.keys().forEach((key) => {
  // gets 'required-badge' from './src/components/atoms/required-badge'
  const componentFolderName = key.replace(/^.+\/([^/]+)\/index\.js/, '$1')

  // capitalize to become RequiredBadge
  const componentFolderNameSplit = componentFolderName.split('-')
  var componentName              = ''
  componentFolderNameSplit.forEach((token) => {
    componentName += token.charAt(0).toUpperCase() + token.substring(1)
  })

  // set to the module export
  // componentName: componentFunction
  // RequiredBadge: (prop) => {..}
  module.exports[componentName] = req(key).default
})