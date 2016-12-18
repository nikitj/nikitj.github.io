import React from 'react';
import CityDayForecast from './CityDayForecast';

class CityForecast extends React.Component{
	render() {
		var weatherRows = [];
		var numOfWeatherRows = 4;
		for (var i=0; i < numOfWeatherRows; i++) {
			weatherRows.push(i);
		}
		return (
			<div className="city">
				<h1>4-day weather forecast for {this.props.city}</h1>
				<ul className="weather-row">
					{weatherRows.map((num) => <CityDayForecast key={num} dayforecast={this.props.forecast[num]}/>)}
				</ul>
			</div>
		);
	}
};

export default CityForecast;