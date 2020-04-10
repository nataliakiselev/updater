export function formatTotal(amount, currency){
    return Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency,
    }).format(amount);
  }