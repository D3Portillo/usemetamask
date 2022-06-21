const FORMATTERS = {
  USD: new Intl.NumberFormat("USD"),
  JPY: new Intl.NumberFormat("JPY"),
  EUR: new Intl.NumberFormat("EUR"),
}

const defaultFormatter = {
  format: (n) => {
    console.error(
      "getFIATValue:: Error, `currency` expects oneOf('USD','JPY','EUR')"
    )
    return `${n}`
  },
}

const getFIATValue = (tokenBalance, price, currency = "USD") => {
  const formatter: Intl.NumberFormat = FORMATTERS[currency] || defaultFormatter
  return formatter.format(tokenBalance * price)
}

export default getFIATValue
