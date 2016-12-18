import React from 'react';

class CityDayForecast extends React.Component{
	render() {
        var imgUrl = "src/img/icons/" + this.props.dayforecast['conditions'] + ".png";
        var weekday = this.props.dayforecast['weekday'].split('').splice(0,3).join('');
        var isSunday = false;
        var highExist = false;
        var lowExist = false;
        var slash = "/";
        var high = "";
        var low = "";
        if (weekday == "Sun"){
            isSunday = true;
        }
        if (this.props.dayforecast['high']!=""){
            high = this.props.dayforecast['high'] + "°C";
            highExist = true;
        }
        if (this.props.dayforecast['low']!=""){
            low = this.props.dayforecast['low'] + "°C";
            lowExist = true;
        }
		return (
			<div className="weather-column" >
                <div className="weather-day">
                    <h2 style={isSunday ? {color: "#f00"} : {} }>{weekday}</h2>
                    <h5>{this.props.dayforecast['day']}, {this.props.dayforecast['month']} </h5>
                </div>
                   <img src={imgUrl}/>
                <div className="weather-temperature">
                    <h1>{highExist && high} {highExist && lowExist && slash} {lowExist && low}</h1>
                    <h5>{this.props.dayforecast['conditions']}</h5>
                </div>
                <div className="weather-conditions">
                    <h6>Humidity: {this.props.dayforecast['humidity']} </h6>
                    <h6>Wind: {this.props.dayforecast['winddir']}, {this.props.dayforecast['windspeed']} kph</h6>
                </div>
			</div>
		);
	}
};

export default CityDayForecast;