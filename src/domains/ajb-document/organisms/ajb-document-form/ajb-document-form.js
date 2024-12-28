import { InputSelectOptions, InputField } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { STATUS } from 'domains/ajb-document/constants/ajb-document-constant'

const propTypes = {
  ajb_document : PropTypes.shape({
    ppjb_number                   : PropTypes.integer,
    booking_fee_number            : PropTypes.integer,
    down_payment_number           : PropTypes.integer,
    order_number                  : PropTypes.integer,
    villa_booked_unit             : PropTypes.string,
    villa_booked_cluster          : PropTypes.string,
    villa_booked_street           : PropTypes.string,
    fullname                      : PropTypes.string,
    nik                           : PropTypes.integer,
    occupation                    : PropTypes.integer,
    status                        : PropTypes.integer,
    documentation_photo           : PropTypes.string,
    scan_ajb_document             : PropTypes.string
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const defaultProps = {
  ajb_document: {
    ppjb_number                   : '',
    booking_fee_number            : '',
    down_payment_number           : '',
    order_number                  : '',
    villa_booked_unit             : '',
    villa_booked_cluster          : '',
    villa_booked_street           : '',
    fullname                      : '',
    nik                           : '',
    occupation                    : '',
    status                        : '',
    documentation_photo           : '',
    scan_ajb_document             : ''
  },
  buttonText       : 'Submit',
  handleSubmitForm : () => {}
}

const AjbDocumentForm = ({
  ajb_document,
  buttonText,
  handleSubmitForm
}) => {
  return (
    <div>
      <Formik
        enableReinitialize= { true }
        initialValues={ ajb_document }
        onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
      >
        {
          (formikBag) => (
            <Form>
              <Row>
                <Col>
                  <InputField
                    type='number'
                    name='ppjb_number'
                    label='Nomor ppjb'
                    required={ true }
                  />
                   <InputField
                    type='number'
                    name='booking_fee_number'
                    label='Nomor Booking Fee'
                    required={ true }
                  />
                  <InputField
                    type='number'
                    name='down_payment_number'
                    label='Nomor Down Payment'
                    required={ true }
                  />
                  <InputField
                    type='number'
                    name='order_number'
                    label='Nomor Pesanan'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='villa_booked_unit'
                    label='Unit Villa Yang Dibooking'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='villa_booked_street'
                    label='Jalan Villa Yang Dibooking'
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
                    type='select'
                    name='occupation'
                    label='Pekerjaan'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='documentation_photo'
                    label='Foto Dokumentasi'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='scan_ajb_document'
                    label='Scan Dokumen AJB'
                    required={ true }
                  />
                  <InputField
                    type='select'
                    name='status'
                    label='Status'
                    required={ true }
                  >
                    <InputSelectOptions options={ STATUS } keyPrefix={ 'status' } />
                  </InputField>
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

AjbDocumentForm.propTypes    = propTypes
AjbDocumentForm.defaultProps = defaultProps

export default AjbDocumentForm