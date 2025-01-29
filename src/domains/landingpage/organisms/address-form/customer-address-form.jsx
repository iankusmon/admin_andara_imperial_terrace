import {
  ProvinceSelectField,
  CitySelectField,
  DistrictSelectField,
  SubDistrictSelectField,
  InputField,
  CheckboxField
} from 'components'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Button, Row, Col } from 'reactstrap'
import LoaderButton from 'components/molecules/loader-button'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

const propTypes = {
  handleSubmit : PropTypes.func.isRequired,
  address      : PropTypes.object
}

const validationSchema = Yup.object().shape({
  street_address     : Yup.string().required('Cannot be blank'),
  tl_province_id     : Yup.string().required('Cannot be blank'),
  tl_city_id         : Yup.string().required('Cannot be blank'),
  tl_district_id     : Yup.string().required('Cannot be blank'),
  tl_sub_district_id : Yup.string().required('Cannot be blank'),
  postal_code        : Yup.string().required('Cannot be blank')
})

/**
 * Print simple text label
 * @param {string} value
 */
/* eslint-disable react/prop-types */
const currentValue = (value) => `Current Value: ${ value || '-' }`

/**
 * Form to edit customer address
 * @param {func} handleSubmit Handler for submitting the form
 * @param {object} address initial address
 */
const CustomerAddressForm = ({
  handleSubmit,
  address
}) => {
  const history = useHistory()

  const getProvinceValue = (formikBag, provinceKey) => {
    const keys                     = provinceKey.split('.')
    const { values: formikValues } = formikBag
    let newValues                  = formikValues
    keys.map((k) => newValues = newValues[ k ])
    return newValues
  }

  return (
    <Formik
      enableReinitialize={ true }
      initialValues={{
        street_address      : address?.street_address ?? '',
        tl_province_id      : address?.tl_province?.id ?? '',
        tl_city_id          : address?.tl_city?.id ?? '',
        tl_district_id      : address?.tl_district?.id ?? '',
        tl_sub_district_id  : address?.tl_sub_district?.id ?? '',
        postal_code         : address?.postal_code ?? '',
        recipient_name      : address?.recipient_name ?? '',
        telephone           : address?.telephone ?? '',
        alias               : address?.alias ?? '',
        is_customer_default : address?.is_customer_default ?? true,
        is_seller_default   : address?.is_seller_default ?? true
      }}
      onSubmit={ handleSubmit }
      validationSchema={ validationSchema }
    >
      {
        (formikBag) => (
          <Form>
            <Row>
              <Col md={ 6 }>
                <InputField
                  type='text'
                  name='street_address'
                  label='Jalan'
                  required={ true }
                  formText={ currentValue(address.street_address) }
                />
                <ProvinceSelectField
                  label='Provinsi'
                  required={ true }
                  name='tl_province_id'
                  formText={ currentValue(address.province) }
                />
                <CitySelectField
                  name='tl_city_id'
                  label='Kota'
                  required={ true }
                  provinceValue={ getProvinceValue(formikBag,'tl_province_id') }
                  formText={ currentValue(address.city) }
                />
                <DistrictSelectField
                  name='tl_district_id'
                  label='Kecamatan'
                  required={ true }
                  formikBag={ formikBag }
                  provinceKey='tl_province_id'
                  cityKey='tl_city_id'
                  formText={ currentValue(address.district) }
                />
                <SubDistrictSelectField
                  name='tl_sub_district_id'
                  label='Kelurahan'
                  required={ true }
                  formikBag={ formikBag }
                  provinceKey='tl_province_id'
                  cityKey='tl_city_id'
                  districtKey='tl_district_id'
                  formText={ currentValue(address.sub_district) }
                />
                <InputField
                  type='text'
                  name='postal_code'
                  label='Kode Pos'
                  required={ true }
                  formText={ currentValue(address.postal_code) }
                />
              </Col>
              <Col md={ 6 }>
                <InputField
                  type='text'
                  name='alias'
                  label='Alias'
                  required={ true }
                  formText={ 'Contoh Kantor, Rumah, Apartemen' }
                />
                <InputField
                  type='text'
                  name='recipient_name'
                  label='Recipient Name'
                  formText={ 'Jika kosong maka `recipient name` akan otomatis mengikuti customer name' }
                />
                <InputField
                  type='number'
                  name='telephone'
                  label='Telephone'
                  formText={ 'jika kosong maka `telephone` akan otomatis mengikuti customer mobile number' }
                />
                <CheckboxField
                  name='is_customer_default'
                  required={ false }
                  label='Use as default shipping address'
                />
                <CheckboxField
                  name='is_seller_default'
                  required={ false }
                  label='Use as default pickup address'
                />
              </Col>
            </Row>

            <div className='text-right'>
              <Button
                color="danger"
                onClick={ () => history.goBack() }
              >
                { 'Back' }
              </Button>
              <LoaderButton
                isLoading={ formikBag.isSubmitting }
                block={ false }
                color='success'
                text="SAVE"
                type='submit'
              />
            </div>
          </Form>
        )
      }
    </Formik>
  )}


CustomerAddressForm.propTypes = propTypes

export default CustomerAddressForm