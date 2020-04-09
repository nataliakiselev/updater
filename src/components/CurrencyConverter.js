import React, { useState, useEffect , useCallback} from 'react';
import {Paper, TextField, MenuItem} from "@material-ui/core";
import {currencies} from '../currencies.js';

const endpoint = "https://api.exchangeratesapi.io/latest";

const fetchRates= async (base='GBP' ) =>{
    const res = await fetch(`${endpoint}?base=${base}`);
    const rates = await res.json();
    console.log(rates);
    return rates;
  }

  const formatTotal=(amount, currency)=> {
    return Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency,
    }).format(amount);
  }

function CurrencyConverter() {
const ratesByBase= fetchRates();   

const [fromCurrency, setFromCurrency]= useState('GBP');
const [toCurrency, setToCurrency] = useState('GBP');
const [inputAmount, setInputAmount] = useState(0);
const [convertedAmount, setConvertedAmount] = useState(0);

const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value);
  };
  const handleInputAmountChange = e => {
    setInputAmount(e.target.value);
  };
  const handleConvertedAmountChange = e => {
    setConvertedAmount(e.target.value);
  };

  const convertCurrency= async  (amount, from, to)=> {
        // check if we already have the rates to convert from that currency
        if (!ratesByBase[from]) {
          const rates = await fetchRates(from);
          // store them for next conversion
          ratesByBase[from] = rates;
          console.log(rates);
        }
        // convert that amount that was passed in
        const rate = ratesByBase[from].rates[to];
        const convertedTotal = amount * rate;
        // console.log(`${amount} ${from} is ${convertedTotal} in ${to}`);
        return convertedTotal;
      }

//   const  handleInput = async (e)=> {
//     const total = await convertCurrency(
//       inputAmount,
//       fromCurrency,
//       toCurrency
//     );
//     console.log(total);
//     setConvertedAmount (formatTotal(total, toCurrency));
//   };
  const handleInput = useCallback(
    async (e) => {
        const total = await convertCurrency(
            inputAmount,
            fromCurrency,
            toCurrency
          );
          console.log(total);
          setConvertedAmount (formatTotal(total, toCurrency));
    },
    [inputAmount, fromCurrency, toCurrency, convertCurrency],
  );

  useEffect(() => {
    handleInput();
  } )


 return(
     <div>
    <h1>Currency Converter</h1>

    
    <Paper elevation={1}>
    <form noValidate autoComplete="off">
    
    <TextField type="number" value={inputAmount} onChange={handleInputAmountChange} variant='outlined' required placeholder="Please enter amount" fullWidth  /> 
      <TextField  select fullWidth 
       value={fromCurrency}
        onChange={handleFromCurrencyChange}
        helperText="Please select your currency"
      >
        {Object.entries(currencies).map(([currencyCode, currencyName]) => (
          <MenuItem key={currencyCode} value={currencyCode}>
            {currencyCode} - {currencyName}
          </MenuItem>
        ))}
      </TextField>
      <TextField  select fullwidth 
       value={toCurrency}
        onChange={handleToCurrencyChange}
        helperText="Please select your currency"
      >
        {Object.entries(currencies).map(([currencyCode, currencyName]) => (
          <MenuItem key={currencyCode} value={currencyCode}>
            {currencyCode} - {currencyName}
          </MenuItem>
        ))}
      </TextField>
      <TextField type="number" value={convertedAmount} onChange={handleConvertedAmountChange} variant='outlined' required fullWidth inputProps={{ 'aria-label': 'amount' }} /> 
      
      </form>
      </Paper>
    
  
  </div>
);
}
   



export default CurrencyConverter;