const PriceUtil = {
  format: (price) => {
    if (price) {
      if (Number.isInteger(price)) {
        price = price.toString()
      }
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    else price = 0

    return 'Rp ' + price
  },
  formatToIDR: (price) => {
    if (price) {
      price = Math.floor(price).toString()
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    else price = 0

    return `IDR ${price}`
  },
  removeIDR: (price) => {
    price = Number(price.replace(/\D/g, ''))
    return price
  }


}

export default PriceUtil