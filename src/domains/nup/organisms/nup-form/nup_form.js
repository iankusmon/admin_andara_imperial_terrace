import { InputSelectOptions, InputField } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PACKAGE, STATUS, PAYMENT_METHOD, VILLA_DESIRED, OCCUPATION } from 'domains/nup/constants/nup-constant';

const propTypes = {
  nup : PropTypes.shape({
    nup_number          : PropTypes.integer,
    order_number        : PropTypes.integer,
    fullname            : PropTypes.string,
    nik                 : PropTypes.number,
    occupation          : PropTypes.integer,
    scan_ktp_url        : PropTypes.integer,
    package             : PropTypes.integer,
    villa_desired       : PropTypes.integer,
    payment_method      : PropTypes.integer,
    address             : PropTypes.text
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const defaultProps = {
  nup: {
    nup_number            : '',
    order_number          : '',
    fullname              : '',
    nik                   : '',
    occupation            : '',
    scan_ktp_url          : '',
    package               : '',
    villa_desired         : '',
    payment_method        : '',
    villa_rent_id         : '',
    address               : '' 
  },
  buttonText       : 'Submit',
  handleSubmitForm : () => {}
}

const NupForm = ({
  nup,
  buttonText,
  handleSubmitForm
}) => {
  return (
    <div>
      <Formik
        enableReinitialize= { true }
        initialValues={ nup }
        onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
      >
        {
          (formikBag) => (
            <Form>
              <Row>
                <Col>
                  <InputField
                    type='number'
                    name='nup_number'
                    label='NUP Customer'
                    placeholder='Nomor NUP Anda'
                    required={ true }
                  />
                   <InputField
                    type='number'
                    name='order_number'
                    label='Nomor Pesanan'
                    placeholder='Nomor Pesanan Anda'
                    required={ true }
                  />
                  <InputField
                    type='text '
                    name='fullname'
                    label='Nama Lengkap'
                    placeholder='Nama Lengkap Anda'
                    required={ true }
                  />
                  <InputField
                    type='number'
                    name='nik'
                    label='NIK'
                    placeholder='Nomor NIK Anda'
                    required={ true }
                  />
                  <InputField
                    type='select'
                    name='occupation'
                    label='Pekerjaan'
                    required={ true }
                  >
                    <InputSelectOptions options={ OCCUPATION } keyPrefix={ 'occupation' } />
                  </InputField>
                  <InputField
                    type='text'
                    name='scan_ktp_url'
                    label='URL Scan KTP'
                    required={ true }
                  />
                    <div style={{ maxWidth: '350px' }}>
                      <img
                        src={formikBag.values?.scan_ktp_url || 'default-image-url.jpg'}
                        alt="URL Scan KTP"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  <InputField
                    type='text'
                    name='payment_receipt_url'
                    label='Bukti Pembayaran'
                    required={ true }
                  />
                    <div style={{ maxWidth: '250px' }}>
                      <img
                        src={formikBag.values?.payment_receipt_url || 'default-image-url.jpg'}
                        alt="Payment Receipt"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  <InputField
                    type='select'
                    name='package'
                    label='Paket'
                    required={ true }
                  >
                    <InputSelectOptions options={ PACKAGE } keyPrefix={ 'package' } />
                  </InputField>
                  <InputField
                    type='select'
                    name='villa_desired'
                    label='Villa Yang Diinginkan'
                    required={ true }
                  >
                    <InputSelectOptions options={ VILLA_DESIRED } keyPrefix={ 'villa_desired' } />
                  </InputField>
                  <InputField
                    type='select'
                    name='payment_method'
                    label='Metode Pembayaran'
                    required={ true }
                  >
                    <InputSelectOptions options={ PAYMENT_METHOD } keyPrefix={ 'payment_method' } />
                   </InputField>
                   <InputField
                    type='text'
                    name='address'
                    label='Alamat'
                    required={ true }
                  />
                  <InputField
                    type='select'
                    name='status'
                    label='Status Pembayaran'
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

NupForm.propTypes    = propTypes
NupForm.defaultProps = defaultProps

export default NupForm