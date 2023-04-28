function convertCurrency(amount, fromCurrency, toCurrency) {
  const url = `https://www.cbr-xml-daily.ru/daily_json.js`;

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
      const nominal = { 
        from: fromCurrency === 'RUB' ? 1 : data.Valute[fromCurrency].Nominal, 
        to: toCurrency === 'RUB' ? 1 : data.Valute[toCurrency].Nominal 
      }
      const fromRate = fromCurrency === 'RUB' ? 1 : data.Valute[fromCurrency].Value / nominal.from;
      const toRate = toCurrency === 'RUB' ? 1 : data.Valute[toCurrency].Value / nominal.to;
      const convertedAmount = (amount * fromRate) / toRate;
      return toCurrency === 'RUB' 
        ? { name: toCurrency, val: convertedAmount.toFixed(2), kurs: 1 }
        : { name: toCurrency, val: convertedAmount.toFixed(2), kurs: data.Valute[toCurrency].Nominal };
    })
    .catch(error => {
      // Обработка ошибки сети или API
      console.error(error.message);
    });
}
