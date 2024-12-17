import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const propTypes = {
  isOpen   : PropTypes.bool.isRequired,
  toggle   : PropTypes.func.isRequired,
  title    : PropTypes.string,
  children : PropTypes.any,
  props    : PropTypes.object
}

/**
 * Generic Modal that can be filled with any components (with the children param)
 * @param {bool} isOpen - State to open  the modal
 * @param {bool} toggle - Toggle function to open/close the modal
 * @param {string} title - Title of the modal
 * @param {any} children - Can be message or component
 * @param {any} props - Can be modal tag attribute (size, className, style, etc.)
 */
const GenericModal = ({
  title,
  isOpen,
  toggle,
  children,
  ...props
}) => (
  <Modal isOpen={ isOpen } toggle={ toggle } { ...props } zIndex={ 800 }>
    <ModalHeader toggle={ toggle }>
      { title }
    </ModalHeader>
    <ModalBody>
      { children }
    </ModalBody>
  </Modal>
)

GenericModal.propTypes = propTypes

export default GenericModal
