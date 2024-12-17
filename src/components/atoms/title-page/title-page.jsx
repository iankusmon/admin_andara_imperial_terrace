import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  /** Main title of the page, i.e Domain */
  mainTitle: PropTypes.string.isRequired,

  /** Sub title of the page, i.e Resource */
  subTitle: PropTypes.string
}

const defaultProps = {
  mainTitle : '',
  subTitle  : ''
}

/** Title of the page component */
const TitlePage = ({ mainTitle, subTitle }) => (
  <h1 className='mb-4'>{ mainTitle } <small>{ subTitle }</small></h1>
)

TitlePage.propTypes    = propTypes
TitlePage.defaultProps = defaultProps

export default TitlePage
