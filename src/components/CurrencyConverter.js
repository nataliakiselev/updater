import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  TextField,
  MenuItem,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import { currencies } from "../currencies.js";
import { formatTotal } from "../Helpers";

const endpoint = "https://api.exchangeratesapi.io/latest";

const fetchRates = async (base = "GBP") => {
  const res = await fetch(`${endpoint}?base=${base}`);
  const rates = await res.json();
  console.log(rates);
  return rates;
};

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [inputAmount, setInputAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };
  const handleInputAmountChange = (e) => {
    setInputAmount(e.target.value);
  };

  const ratesByBase = {};

  const convertCurrency = useCallback(
    async (amount, from, to) => {
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
    },
    [ratesByBase],
  );

  const handleInput = useCallback(
    async (e) => {
      const total = await convertCurrency(
        inputAmount,
        fromCurrency,
        toCurrency,
      );
      console.log(total);
      setConvertedAmount(formatTotal(total, toCurrency));
    },
    [inputAmount, fromCurrency, toCurrency, convertCurrency],
  );

  useEffect(() => {
    if (inputAmount !== "") {
      handleInput();
    }
  }, [handleInput, inputAmount]);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "15px",
    },
    paper: {
      padding: "15px",
    },

    intro: {
      background: "url(images/currencies.jpg) center/cover",
      padding: "15px",
    },
    para: {
      margin: "0",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    heading: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
  }));
  const classes = useStyles();
  return (
    //  <div className={classes.root}>
    <Paper className={classes.paper} elevation={2}>
      <div className={classes.intro}>
        <h1 className={classes.heading}>Currency Converter</h1>
        <p className={classes.para}>
          Use this instant currency converter for all major currencies, with
          exchange rates that are updated several times a day.
        </p>
      </div>

      <FormControl fullWidth>
        <TextField
          type="number"
          value={inputAmount}
          onChange={handleInputAmountChange}
          variant="outlined"
          helperText="Enter amount"
          margin="normal"
        />

        <TextField
          select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          helperText="From"
        >
          {Object.entries(currencies).map(([currencyCode, currencyName]) => (
            <MenuItem key={currencyCode} value={currencyCode}>
              {currencyCode} - {currencyName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          helperText="To"
          margin="normal"
        >
          {Object.entries(currencies).map(([currencyCode, currencyName]) => (
            <MenuItem key={currencyCode} value={currencyCode}>
              {currencyCode} - {currencyName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={convertedAmount}
          variant="outlined"
          helperText="Result"
          margin="normal"
        />
      </FormControl>
    </Paper>
    // </div>
  );
}

export default CurrencyConverter;
