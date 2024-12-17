import NotifyApiError from 'components/organisms/notify-api-error'
import { ALERT_TYPES } from 'constants/alert-constants'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import NotificationAlert from 'react-notification-alert'


const propTypes = {
  WrappedComponent: PropTypes.element
}

/**
 * HOC that extend Page with Alert logic
 * @param {element} WrappedComponent - Wrapped component
 */
const WithAlert = (WrappedComponent) => {

  const WrapperPageWithAlert = () => {

    const defaultOptions = {
      place       : 'tr',
      message     : '',
      type        : 'default',
      icon        : '',
      autoDismiss : 30
    }

    const alert = useRef(null)

    /**
     * Set Icon by given Alert type
     * @param {string} type - Alert Type
     */
    const alertIcon = (type) => {
      switch (type) {
        case 'success':
          return 'fas fa-check-circle'
        default:
          return 'fas fa-exclamation-circle'
      }
    }

    /**
     * Set message to the generic Alert
     * @param { string | JSX } msg - Alert Message
     * @param {string} alertType - Alert Type. take a look `constants/alert-constants`
     */
    const setAlertMsg = (msg, alertType = ALERT_TYPES.INFO) => {
      const options = {
        ...defaultOptions,
        type    : alertType,
        icon    : alertIcon(alertType),
        message : msg
      }

      alert.current.notificationAlert(options)
    }

    /**
     * Set API error message to show alert.
     * @param {object} apiError - API Error object
     */
    const setApiErrorMsg = (apiError) => {

      // * set the ID to specify the alert
      const totalAlert = alert.current.state.notifyID.length
      const id         = `error-detail-${totalAlert}`

      const options = {
        ...defaultOptions,
        type    : ALERT_TYPES.DANGER,
        icon    : alertIcon(ALERT_TYPES.DANGER),
        message : <NotifyApiError id={ id } apiError={ apiError } />
      }

      alert.current.notificationAlert(options)
    }

    return (
      <>
        { /* Composition: Add the alert to the top of the Component we want to enchance */ }
        <div className="rna-wrapper">
          <NotificationAlert ref={ alert } />
        </div>

        { /* Component that we are enchancing */ }
        <WrappedComponent
          setAlertMsg={ setAlertMsg }
          setApiErrorMsg={ setApiErrorMsg }
        />
      </>
    )
  }

  return WrapperPageWithAlert
}

WithAlert.propTypes = propTypes

export default WithAlert
