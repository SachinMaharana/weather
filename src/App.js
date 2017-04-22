import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const PLACES = [
  {
    name: "Palo Alto",
    zip: "94303"
  },
  {
    name: "San Jose",
    zip: "94088"
  },
  {
    name: "Santa Cruz",
    zip: "95062"
  },
  {
    name: "Honolulu",
    zip: "96803"
  },
  {
    name: "UST Global Campus",
    zip: "695583"
  },
  {
    name: "Balasore",
    zip: "756001"
  }
];

class WeatherDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    console.log(zip);
    const URL = `https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=
      ${zip}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({
        weatherData: json
      });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div> Loading </div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {" "}
          {weather.main}
          {" "}
          in
          {" "}
          {weatherData.name}
          {" "}
          <img src={iconUrl} alt={weatherData.description} />
          {" "}
        </h1>
        {" "}
        <p> Current: {weatherData.main.temp} </p>
        {" "}
        <p> High: {weatherData.main.temp_max} </p>
        {" "}
        <p> Low: {weatherData.main.temp_min} </p>
        {" "}
        <p> Wind Speed: {weatherData.wind.speed} </p>
        {" "}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <WeatherDisplay zip={PLACES[activePlace].zip} key={activePlace} />

        {PLACES.map((place, i) => (
          <button
            key={i}
            onClick={() => {
              this.setState({
                activePlace: i
              });
            }}
          >
            {place.name}{" "}
          </button>
        ))}{" "}
      </div>
    );
  }
}

export default App;
