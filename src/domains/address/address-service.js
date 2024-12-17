const isNil = (value) => (value == '' || value == null || typeof value == 'undefined')

const AddressService = {
  /**
   * Check the validity of the address
   * checking if the address doesn't have an empty part
   *
   * @param {Object} address - Address data
   */
  isInvalid: (address) => {
    const result = isNil(address.tl_city)
      || isNil(address.tl_district)
      || isNil(address.tl_province)
      || isNil(address.tl_sub_district)
      || isNil(address.street_address)
      || isNil(address.telephone)
      || isNil(address.recipient_name)

    return result
  }
}

export default AddressService