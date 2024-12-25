import { InputSelectOptions, InputField } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { OCCUPATION, PAYMENT_METHOD, PAYMENT_TYPE, CASH_TEMPO_PERIOD, KPR_TENOR_PERIOD, STATUS  } from 'domains/booking-fee/constants/booking-fee-constant';

const propTypes = {
  booking_fee : PropTypes.shape({
    booking_fee_number                              : PropTypes.integer,
    order_number                                    : PropTypes.integer,
    payment_type                                    : PropTypes.integer,
    payment_method                                  : PropTypes.integer,
    cash_tempo_period                               : PropTypes.integer,
    fullname                                        : PropTypes.string,
    nik                                             : PropTypes.integer,
    occupation                                      : PropTypes.integer,
    scan_ktp_url                                    : PropTypes.string,
    scan_kk_url                                     : PropTypes.string,
    scan_npwp_url                                   : PropTypes.string,
    scan_buku_nikah_url                             : PropTypes.string,
    scan_last_3_months_slip_gaji_url                : PropTypes.string,
    scan_last_3_months_rekening_koran_url           : PropTypes.string,
    scan_sk_pekerjaan_url                           : PropTypes.string,
    scan_fc_legal_usaha_url                         : PropTypes.string,
    scan_laporan_keuangan_url                       : PropTypes.string,
    scan_last_3_months_rekening_koran_usaha_url     : PropTypes.string,
    status                                          : PropTypes.integer,
    payment_receipt_url                             : PropTypes.integer,
     kpr_tenor_period                               : PropTypes.integer
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmitForm : PropTypes.func.isRequired
}

const defaultProps = {
  booking_fee: {
    booking_fee_number                              : '',
    order_number                                    : '',
    payment_type                                    : '',
    payment_method                                  : '',
    cash_tempo_period                               : '',
    fullname                                        : '',
    nik                                             : '',
    occupation                                      : '',
    scan_ktp_url                                    : '',
    scan_kk_url                                     : '',
    scan_npwp_url                                   : '',
    scan_buku_nikah_url                             : '',
    scan_last_3_months_slip_gaji_url                : '',
    scan_last_3_months_rekening_koran_url           : '',
    scan_sk_pekerjaan_url                           : '',
    scan_fc_legal_usaha_url                         : '',
    scan_laporan_keuangan_url                       : '',
    scan_last_3_months_rekening_koran_usaha_url     : '',
    status                                          : '',
    payment_receipt_url                             : '',
    kpr_tenor_period                                : ''
  },
  buttonText       : 'Submit',
  handleSubmitForm : () => {}
}

const BookingFeeForm = ({
  booking_fee,
  buttonText,
  handleSubmitForm
}) => {
  return (
    <div>
      <Formik
        enableReinitialize= { true }
        initialValues={ booking_fee }
        onSubmit={ (values, formikBag) => handleSubmitForm(values, formikBag) }
      >
        {
          (formikBag) => (
            <Form>
              <Row>
                <Col>
                  <InputField
                    type='number'
                    name='booking_fee_number'
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
                    type='select'
                    name='payment_type'
                    label='Tipe Pembayaran'
                    required={ true }
                    >
                    <InputSelectOptions options={ PAYMENT_TYPE } keyPrefix={ 'payment_type' } />
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
                    type='select'
                    name='cash_tempo_period'
                    label='Periode Cash Tempo'
                    required={ true }
                    >
                    <InputSelectOptions options={ CASH_TEMPO_PERIOD } keyPrefix={ 'cash_tempo_period' } />
                  </InputField>
                  <InputField
                    type='select'
                    name='kpr_tenor_period'
                    label='Tenor KPR'
                    required={ true }
                    >
                    <InputSelectOptions options={ KPR_TENOR_PERIOD } keyPrefix={ 'kpr_tenor_period' } />
                  </InputField>
                  <InputField
                    type='text'
                    name='fullname'
                    label='Nama Lengkap'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='payment_receipt_url'
                    label='Bukti Pembayaran'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='nik'
                    label='NIK'
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
                   <InputField
                    type='text'
                    name='scan_kk_url'
                    label='URL Scan KK'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='scan_npwp_url'
                    label='URL Scan NPWP'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='scan_buku_nikah_url'
                    label='URL Scan Buku Nikah'
                    required={ true }
                  />
                     <InputField
                    type='text'
                    name='scan_last_3_months_slip_gaji_url'
                    label='URL Scan Slip Gaji 3 Bulan Terakhir'
                    required={ true }
                  />
                   <InputField
                    type='text'
                    name='scan_last_3_months_rekening_koran_url'
                    label='URL Scan Rekening Koran 3 Bulan Terakhir'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='scan_sk_pekerjaan_url'
                    label='URL Scan SK Pekerjaan'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='scan_fc_legal_usaha_url'
                    label='URL Scan FotoCopy Legal Usaha'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='scan_laporan_keuangan_url'
                    label='URL Scan Laporan Keuangan'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='scan_last_3_months_rekening_koran_usaha_url'
                    label='URL Scan Rekening Koran Usahan 3 Bulan Terakhir'
                    required={ true }
                  />
                  <InputField
                    type='text'
                    name='payment_receipt_url'
                    label='URL Nota Pembayaran'
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

BookingFeeForm.propTypes    = propTypes
BookingFeeForm.defaultProps = defaultProps

export default BookingFeeForm