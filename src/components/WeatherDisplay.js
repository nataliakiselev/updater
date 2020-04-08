import React from 'react';

const WeatherDisplay = ({ data }) => {
  let renderedComponent = <p>Choose your city</p>;
  if (data) {
    const report = data.weather[0];
    const iconURL = `http://openweathermap.org/img/wn/${report.icon}@2x.png`;

    renderedComponent = (
      <div>
        {/* <h1>{this.state.cityname}</h1> */}
        <h2>{data.name}</h2>
        <img src={iconURL} alt={report.main} />

        <dl>
          <dt>Summary</dt>
          <dd>{report.description}</dd>
          <dt>Temperature</dt>
          <dd>{data.main.temp} &#8451;</dd>
          <dt> Feels Like</dt>
          <dd>{data.main.feels_like} &#8451;</dd>
          <dt>Humidity</dt>
          <dd>{data.main.humidity}%</dd>
          <dt>Wind Speed</dt>
          <dd>{data.wind.speed} meter/sec</dd>
        </dl>
      </div>
    );
  }

  return renderedComponent;
};

export default WeatherDisplay;
