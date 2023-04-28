let avaliableCurrencies = ''

function convertCurrency(amount, fromCurrency, toCurrency) {
  const url = `https://www.cbr-xml-daily.ru/daily_json.js`;
  fromCurrency = fromCurrency.toUpperCase()
  toCurrency = toCurrency.toUpperCase()

  // Отправка HTTP-запроса к API с использованием fetch
  return fetch(url)
    .then(response => {
      if (response.ok) {
        // Обработка ответа API
        return response.json();
      } else {
        // Обработка ошибки API
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      avaliableCurrencies = 'RUB, ' + Object.values(data.Valute).map(currency => currency.CharCode).join(', ')
      const nominal = {
        from: fromCurrency === 'RUB' ? 1 : data.Valute[fromCurrency].Nominal,
        to: toCurrency === 'RUB' ? 1 : data.Valute[toCurrency].Nominal
      }
      const fromRate = fromCurrency === 'RUB' ? 1 : data.Valute[fromCurrency].Value / nominal.from;
      const toRate = toCurrency === 'RUB' ? 1 : data.Valute[toCurrency].Value / nominal.to;
      const convertedAmount = (amount * fromRate) / toRate;
      return convertedAmount.toFixed(2)
    })
    .catch(error => {
      // Обработка ошибки сети или API
      console.error(error.message);
    });
}
