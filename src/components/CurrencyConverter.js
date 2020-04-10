import React, { useState, useEffect , useCallback} from 'react';
import {Paper, TextField, MenuItem, FormControl} from "@material-ui/core";
import {currencies} from '../currencies.js';
import {formatTotal} from '../Helpers';


const endpoint = "https://api.exchangeratesapi.io/latest";

const fetchRates= async (base='GBP' ) =>{
    const res = await fetch(`${endpoint}?base=${base}`);
    const rates = await res.json();
    console.log(rates);
    return rates;
  }

 

function CurrencyConverter() {



const [fromCurrency, setFromCurrency]= useState('GBP');
const [toCurrency, setToCurrency] = useState('GBP');
const [inputAmount, setInputAmount] = useState(null);
const [convertedAmount, setConvertedAmount] = useState(null);

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
  const ratesByBase={}

  const convertCurrency= useCallback(async  (amount, from, to)=> {
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
      }, [ratesByBase])


  const handleInput = useCallback(
    async (e) => {
        const total = await convertCurrency(
            inputAmount,
            fromCurrency,
            toCurrency,
          );
          console.log(total, toCurrency);
          setConvertedAmount (formatTotal(total, toCurrency));
    }, [inputAmount,
      fromCurrency,
      toCurrency, convertCurrency]
  
  );
 

  useEffect(() => {
    if(inputAmount){
    handleInput();
  }}, [handleInput, inputAmount])


 return(
     <div>
    <h1>Currency Converter</h1>

    
    <Paper elevation={1}>
    <FormControl fullWidth  autoComplete="off" >
    
    <TextField type="number" value={inputAmount}  onChange={handleInputAmountChange}  variant='outlined'  /> 
      <TextField  select 
       value={fromCurrency}
        onChange={handleFromCurrencyChange}
        
      > 
    {Object.entries(currencies).map(([currencyCode, currencyName]) => (
    <MenuItem key={currencyCode} value={currencyCode}>
      {currencyCode} - {currencyName}
    </MenuItem>
    ))}
        
      </TextField>
      <TextField  select 
       value={toCurrency}
        onChange={handleToCurrencyChange}
        placeholder="Select your currency"
      >
        { Object.entries(currencies).map(([currencyCode, currencyName]) => (
    <MenuItem key={currencyCode} value={currencyCode}>
      {currencyCode} - {currencyName}
    </MenuItem>
    ))}
      </TextField>
      <TextField type='number' readOnly value={convertedAmount} onChange={handleConvertedAmountChange} variant='outlined' /> 
      
      </FormControl>
      </Paper>
    
  
  </div>
);
}
   



export default CurrencyConverter;