import {
  ProvinceSelectField,
  CitySelectField,
  DistrictSelectField,
  SubDistrictSelectField,
  InputField
} from 'components'
import PropTypes from 'prop-types'
import React from 'react'


const proptypes = {
  formikBag  : PropTypes.any,
  fieldNames : PropTypes.shape({
    streetAddress : PropTypes.string.isRequired,
    provinceId    : PropTypes.string.isRequired,
    cityId        : PropTypes.string.isRequired,
    districtId    : PropTypes.string.isRequired,
    subDistrictId : PropTypes.string.isRequired,
    postalCode    : PropTypes.string.isRequired
  }),
  required: PropTypes.bool
}

const defaultValues = {
  formikBag  : () => {},
  fieldNames : {
    streetAddress : '',
    provinceId    : '',
    cityId        : '',
    districtId    : '',
    subDistrictId : '',
    postalCode    : ''
  },
  required: true
}

/**
 * Collection of Address input fields. hooked up to Formik (only to be used within a Formik component)
 * @param {any} formikBag an object containing a subset of the injected props and methods and any props that were passed to the wrapped formik component.
 * @param {object} fieldNames an object to define `name` of each address input-field
 * @param {bool} required boolean to determine the form required or not
 *
 * contains:
 *           - street-address
 *           - province
 *           - city
 *           - district
 *           - sub-district
 *           - postal-code
 */
const AddressFormField = ({
  formikBag,
  fieldNames,
  required
}) => {
  const getProvinceValue = (formikBag, provinceKey) => {
    const keys                     = provinceKey.split('.')
    const { values: formikValues } = formikBag
    let newValues                  = formikValues
    keys.map((k) => newValues = newValues[ k ])
    return newValues
  }

  return (
    <>
      <InputField
        type='text'
        name={ fieldNames.streetAddress }
        label='Street Address'
        placeholder='Jalan Pegangsaan Timur'
        required={ required }
      />
      <ProvinceSelectField
        label='Provinsi'
        required={ required }
        name={ fieldNames.provinceId }
      />
      <CitySelectField
        name={ fieldNames.cityId }
        label='Kota'
        required={ required }
        provinceValue={ getProvinceValue(formikBag,fieldNames.provinceId) }
      />
      <DistrictSelectField
        name={ fieldNames.districtId }
        label='Kecamatan'
        required={ required }
        formikBag={ formikBag }
        provinceKey={ fieldNames.provinceId }
        cityKey={ fieldNames.cityId }
      />
      <SubDistrictSelectField
        name={ fieldNames.subDistrictId }
        label='Kelurahan'
        required={ required }
        formikBag={ formikBag }
        provinceKey={ fieldNames.provinceId }
        cityKey={ fieldNames.cityId }
        districtKey={ fieldNames.districtId }
        postalCodeKey={ fieldNames.postalCode }
      />
      <InputField
        type='text'
        name={ fieldNames.postalCode }
        label='Kode Pos'
        placeholder='167XX'
        required={ required }
      />
    </>
  )}

AddressFormField.propTypes    = proptypes
AddressFormField.defaultProps = defaultValues

export default AddressFormField