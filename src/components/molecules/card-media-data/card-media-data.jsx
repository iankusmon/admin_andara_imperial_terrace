import React from 'react'
import PropTypes from 'prop-types'
import PhotoPendingImg from 'assets/img/product/photo_pending.png'
import { Media } from 'reactstrap'

const propTypes = {
  label : PropTypes.string,
  value : PropTypes.string
}

/**
 * Present nice look for media object properties in the Card
 * @param {object} props - CardMediaData props
 * @param {string} props.label - label
 * @param {*} props.value - value
 */
const CardMediaData = ({ label, value }) => (
  <Media body>
    <Media heading className="small text-uppercase text-light font-weight-bolder">
      { label }
    </Media>
    <Media bottom object src={ value ? value : PhotoPendingImg } alt={ PhotoPendingImg } />
  </Media>
)


CardMediaData.propTypes = propTypes

export default CardMediaData