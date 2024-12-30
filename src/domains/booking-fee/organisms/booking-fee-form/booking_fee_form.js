import { InputSelectOptions, InputField } from 'components'
import LoaderButton from 'components/molecules/loader-button'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { OCCUPATION, PAYMENT_METHOD, PAYMENT_TYPE, CASH_TEMPO_PERIOD, KPR_TENOR_PERIOD, STATUS  } from 'domains/booking-fee/constants/booking-fee-constant';
import axios from 'axios'
import { ALERT_TYPES } from 'constants/alert-constants'
import { Badge, FormGroup, Label } from 'reactstrap'

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
    kpr_tenor_period                                : PropTypes.integer,
    upload_spkb_doc                                 : PropTypes.array
  }),
  buttonText       : PropTypes.string.isRequired,
  handleSubmit : PropTypes.func.isRequired
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
    kpr_tenor_period                                : '',
    upload_spkb_doc                                 : []
  },
  buttonText       : 'Submit',
  handleSubmit : () => {}
}

const BookingFeeForm = ({
  booking_fee,
  buttonText
}) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values, formikBag) => {
    console.log(values)
    // e.preventDefault();
    // Input values to formData
    const formData = new FormData();
    console.log(file)
    formData.append('document[document_type]', 'spkb_document');
    formData.append('document[file]', file);

    formData.append('booking_fee[booking_fee_number]', values.booking_fee_number);
    formData.append('booking_fee[order_number]', values.order_number);
    formData.append('booking_fee[payment_type]', values.payment_type);
    formData.append('booking_fee[payment_method]', values.payment_method);
    formData.append('booking_fee[fullname]', values.fullname);
    formData.append('booking_fee[nik]', values.nik);
    formData.append('booking_fee[occupation]', values.occupation);
    formData.append('booking_fee[scan_ktp_url]', values.scan_ktp_url);
    formData.append('booking_fee[scan_kk_url]', values.scan_kk_url);
    formData.append('booking_fee[scan_npwp_url]', values.scan_npwp_url);
    formData.append('booking_fee[scan_buku_nikah_url]', values.scan_buku_nikah_url);
    formData.append('booking_fee[scan_last_3_months_slip_gaji_url]', values.scan_last_3_months_slip_gaji_url);
    formData.append('booking_fee[scan_last_3_months_rekening_koran_url]', values.scan_last_3_months_rekening_koran_url);
    formData.append('booking_fee[scan_sk_pekerjaan_url]', values.scan_sk_pekerjaan_url);
    formData.append('booking_fee[scan_fc_legal_usaha_url]', values.scan_fc_legal_usaha_url);
    formData.append('booking_fee[scan_laporan_keuangan_url]', values.scan_laporan_keuangan_url);
    formData.append('booking_fee[scan_last_3_months_rekening_koran_usaha_url]', values.scan_last_3_months_rekening_koran_usaha_url);
    formData.append('booking_fee[payment_receipt_url]', values.payment_receipt_url);
    formData.append('booking_fee[kpr_tenor_period]', values.kpr_tenor_period);
    formData.append('booking_fee[status]', values.status);
    formData.append('booking_fee[document_type]', 'spkb_document');
    formData.append('booking_fee[file]', file);
    
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
     }

     const path = `api/admins/booking_fees/${values.id}`
  
    axios.patch(path, formData, config)
    .then(() => {
        alert('The Booking Fee has been edited.', ALERT_TYPES.SUCCESS)
      })
    .finally(() => setIsLoading(false))

    setIsLoading(false)

  };
  
  // Menggunakan nilai `booking_fee` dengan memastikan ID ada
  const formikInitialValues = {
    ...booking_fee,
    id: booking_fee?.id || '',  // Pastikan id ada, atau default ke string kosong
  };

  const dropzoneProps = {
    accept   : 'text/csv, .docx, .pdf ,application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    maxFiles : 1
  }

  return (
    <div>
        <Formik
          enableReinitialize={true}
          initialValues={formikInitialValues}  // Pastikan id sudah ada
          onSubmit={(values, formikBag) => {
            handleSubmit(values, formikBag); // Submit form data ke handler
          }}
        >
        {(formikBag) => (
          <>
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

                {/* <label>Upload Dokumen SPKB:</label> */}
                <Label
                  for={ `Upload SPKB Document` || `Upload SPKB Document here:` }
                  className='text-gray-light text-capitalize'
                >
                  <strong>{ `Upload SPKB Document here:` }</strong>
                </Label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </Col>
              </Row>
              <LoaderButton
                className='float-left'
                color='primary'
                type='submit'
                onSubmit={ formikBag.submitForm }
                disabled={ formikBag.isSubmitting }
                isLoading={ false }
                text={ buttonText }
              />
            </Form>
          </>
          )
        }
      </Formik>
    </div>
  )
}

BookingFeeForm.propTypes    = propTypes
BookingFeeForm.defaultProps = defaultProps

export default BookingFeeForm