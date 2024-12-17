import React, { useState, useCallback, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.element
}

const defaultContext = {
  showModal : () => {},
  hideModal : () => {}
}

const ModalContext = createContext(defaultContext)

/**
 * A provider to pass modal data through the component tree.
 * @param {element} children - Children Component
 */
export const ModalProvider = ({ children }) => {
  const [ modal, setModal ] = useState(undefined)

  /**
   * handler to hide the modal
   * Explicitly set `isOpen` props to false.
   */
  const hideModal = useCallback(() => (
    setModal((prevState) => ({
      ...prevState,
      props: {
        ...prevState.props,
        isOpen: false
      }
    }))
  ), [])

  /**
   * Handler to show modal. Explicitly set `isOpen` props to true
   * @param {element} component - Modal dialog component. It should be used Reactstrap modal
   * @param {object} props - Modal dilog props. See the available props here: https://reactstrap.github.io/components/modals/
   */
  const showModal = useCallback((component, props) => {
    setModal({
      component,
      props: {
        ...props,
        isOpen: true
      }
    })
  }, [])

  /** Render the modal  */
  const renderModal = () => {
    /** Skip if modal state is still null */
    if (!modal) return

    const { component: Component, props } = modal

    return (
      <Component
        toggle={ hideModal }
        // splat props at the bottom of the component props to give the flexibility of modifying toggle
        { ...props }
      />
    )
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        showModal,
        hideModal
      }}
    >
      { children }
      { renderModal() }
    </ModalContext.Provider>
  )
}

ModalProvider.propTypes = propTypes

/**
 * A custom hook to show/hide the modal.
 * @example
 *  const { showModal } = useModal()
 *
 *   const SimpleModal = ({ ...props }) => (
 *   <Modal { ...props }>
 *     { ... }
 *   </Modal>
 * )
 *
 * <Button onClick={ () => showModal(SimpleModal) }>Click me!</Button>
 *
 */
export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within an AuthProvider')
  }

  return context
}
