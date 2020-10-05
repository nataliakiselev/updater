import React from "react";
import CitySearch from "./CitySearch";
import WeatherDisplay from "./WeatherDisplay";
import { Paper } from "@material-ui/core";

const hour = 60 * 60 * 1000;
class WeatherToday extends React.Component {
  state = {
    data: null,
    city: "",
    refreshRate: hour,
  };

  setCity = (city) => {
    this.setState({
      city: city.value,
    });
  };

  async getWeather() {
    console.log("getWeather called");
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=${apiKey}`,
      );
      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        console.log("weather data", data);
        this.setState({
          data,
        });
      } else {
        throw response;
      }
      console.log(response);
    } catch (err) {
      console.dir(err);
      this.setState({
        error: err,
      });
    }
  }

  componentDidMount() {
    const city = window.localStorage.getItem("city");
    if (city) {
      this.setState({
        city,
      });
    } else {
      this.setState({
        city: "london",
      });
      this.getWeather();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { city: currentCity } = this.state;
    if (currentCity && currentCity !== prevState.city) {
      this.getWeather();
      window.localStorage.setItem("city", currentCity);
    }
  }

  render() {
    let backgroundImage = "";
    if (this.state.data) {
      console.log(this.state.data);
      const report = this.state.data.weather[0];
      // console.log('report', report);
      switch (report.main.toLowerCase()) {
        case "rain":
          backgroundImage = "/images/rain-img.jpg";
          break;
        case "clouds":
          backgroundImage = "/images/cloudy-sky.jpg";
          break;
        case "snow":
          backgroundImage = "/images/snow.jpg";
          break;
        case "clear":
          backgroundImage = "/images/clearsku-img.jpg";
          break;
        case "drizzle":
          backgroundImage = "/images/rain-img.jpg";
          break;
        case "thunderstorm":
          backgroundImage = "/images/thunderstorm.jpg";
          break;
        case "mist":
          backgroundImage = "/images/mist.jpg";
          break;
        default:
          backgroundImage = "/images/clearsku-img.jpg";
      }
    } else {
      backgroundImage = "/images/clearsku-img.jpg";
    }

    const styles = {
      paper: {
        width: "100%",
        background: `url(${backgroundImage}) center/cover`,
        padding: "15px",
      },
    };

    // console.log('HJKHJKHJKHJKHK styles', styles);
    // console.log('this.state.data', this.state.data);

    return (
      <Paper className="css" style={styles.paper} elevation={2}>
        <h1>{this.props.heading}</h1>
        <CitySearch sendDataToParent={this.setCity} city={this.state.city} />

        <WeatherDisplay data={this.state.data} />
      </Paper>
    );
  }
}

export default WeatherToday;
