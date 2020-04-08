// import React from 'react';

// const hour = 60 * 60 * 1000;
// class WeatherToday extends React.Component{

// async getWeather() {
//     console.log('getWeather called');
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=a4f972c7cd918778eddf518d569a928e`
//       );
//       const data = await response.json();
//       console.log('weather data', data);
//       this.setState({
//         data
//       });
//       console.log(response);
//     } catch (err) {
//       console.dir(err);
//       this.setState({
//         // status: statuses.ERRORED,
//         error: err
//       });
//     }
//   }
// render(){

// }
// }

// export default WeatherForecast;
