import { InputField } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import React from "react";
import ReactDOM from "react-dom";

const propTypes = {
  down_payment : PropTypes.shape({
    down_payment_number     : PropTypes.integer,
    order_number            : PropTypes.integer,
    payment_type            : PropTypes.integer,
    payment_method          : PropTypes.integer,
    payment_amount          : PropTypes.integer,
    tempo_period            : PropTypes.integer,
    fullname                : PropTypes.string,
    nik                     : PropTypes.integer,
    occupation              : PropTypes.integer,
    status                  : PropTypes.integer,
    payment_receipt_url     : PropTypes.string,
    note                    : PropTypes.text
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const defaultProps = {
  down_payment: {
    down_payment_number     : '',
    order_number            : '',
    payment_type            : '',
    payment_method          : '',
    payment_amount          : '',
    tempo_period            : '',
    fullname                : '',
    nik                     : '',
    occupation              : '',
    status                  : '',
    payment_receipt_url     : '',
    note                    : '',
  },
  buttonText       : 'Submit',
  handleSubmitForm : () => {}
}

const DownPaymentForm = ({
  down_payment,
  buttonText,
  handleSubmitForm
}) => {
  return (
    <div>
      <Formik
        enableReinitialize= { true }
        initialValues={ down_payment }
        onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
      >
        {
          (formikBag) => (
            <Form>
              <Row>
                <Col>
                  <InputField
                    type='number'
                    name='down_payment_number'
                    label='Nomor Booking Fee'
                    required={ true }
                  />
                   <InputField
                    type='number'
                    name='order_number'
                    label='Nomor Pesanan'
                    required={ true }
                  />
                  <InputField
                    type='text '
                    name='payment_type'
                    label='Tipe Pembayaran'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='payment_method'
                    label='Metode Pembayaran'
                    required={ true }
                  />
                  <InputField
                    type='number'
                    name='payment_amount'
                    label='Nominal Yang Dibayar'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='tempo_period'
                    label='Tenor'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='fullname'
                    label='Nama Lengkap'
                    required={ true }
                  />
                  <InputField
                    type='number'
                    name='nik'
                    label='NIK'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='occupation'
                    label='Pekerjaan'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='payment_receipt_url'
                    label='URL Kwitansi Pembayaran'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='note'
                    label='Catatan'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='status'
                    label='Status'
                    required={ true }
                  />
                </Col>
              </Row>
              <LoaderButton
                className='float-left'
                color='primary'
                type='submit'
                onSubmit={ formikBag.submitForm }
                disabled={ formikBag.isSubmitting }
                isLoading={ formikBag.isSubmitting }
                text={ buttonText }
              />
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

DownPaymentForm.propTypes    = propTypes
DownPaymentForm.defaultProps = defaultProps

export default DownPaymentForm