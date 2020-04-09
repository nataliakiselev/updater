import React from 'react';
import Header from './components/Header';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import WeatherToday from './components/WeatherToday';
import News from './components/News';
import CurrencyConverter from './components/CurrencyConverter';
function App() {
  return (
    <div className="page">
      <Header />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <WeatherToday city="london" heading="Weather Today" />
          </Grid>
          <Grid item xs={6}>
            <CurrencyConverter heading="Currency Converter" />
          </Grid>
          <Grid item xs={12}>
            <News heading="News" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
