import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp';
import CityForecast from './CityForecast';
import Warning from './Warning';
import createFragment from 'react-addons-create-fragment';

class CitySelector extends React.Component{
	constructor(props) {
    	super(props);
	   
		this.state = {
			backspaceRemoves: false,
			creatable: true,
			forecast: null,
			showForecast: false,
			showWarning: false,
			autoBlur: true
		};

		this.onChange = this.onChange.bind(this);
		this.toggleCreatable = this.toggleCreatable.bind(this);
		this.getCities = this.getCities.bind(this);
		this.gotoWeather = this.gotoWeather.bind(this);
		this.makeForecast = this.makeForecast.bind(this);
		this.search = this.search.bind(this);
	}
	
	onChange (value) {
		this.setState({
			value: value,
			showForecast: false,
			showWarning: false
		});
	};

	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	};

	getCities (input) {
		var url = "";
		if (!input) {
			url = './app/Cities.json';
			return fetch(url)
	 		.then((response) => response.json())
			.then((json) => {
			return {options: json.RESULTS};
			});
		}
		else {
			url = `https://autocomplete.wunderground.com/aq?query=${input}`;
			return fetchJsonp(url, {jsonpCallback: 'cb'})
	 		.then((response) => response.json())
			.then((json) => {
			return {options: json.RESULTS};
			});
		}
	};

	makeForecastResult(result){
			var forecastArr = result.forecast.simpleforecast.forecastday;
			var forecastAll = [];
			for (let i = 0; i < 4 ; i++){
				var f = forecastArr[i];
				var forecastDay = [];
				forecastDay['low'] = f.low.celsius;
				forecastDay['high'] = f.high.celsius;
				forecastDay['conditions'] =  f.conditions;
				forecastDay['winddir'] = f.avewind.dir;
				forecastDay['windspeed'] = f.avewind.kph;
				forecastDay['humidity'] = f.avehumidity;
				forecastDay['weekday'] = f.date.weekday;
				forecastDay['day'] = f.date.day;
				forecastDay['month'] = f.date.monthname_short;
				forecastAll.push(forecastDay);
			}
			return forecastAll;
	}
	
	makeForecast(url){
		fetch(url)
		.then((response) => response.json())
		.then((result) => {
			try{
			var forecastResult = this.makeForecastResult(result);
			this.setState({
				forecast: forecastResult,
				showForecast: true
			});
			}
			catch(e){
				this.setState({
				showWarning: true
				});
			}
		});
	}


	gotoWeather(value,event){
		const api = 'cdffbcf0e7dedc12';
		var url = 'https://api.wunderground.com/api/' + api + '/forecast' + value.l + '.json';
		this.makeForecast(url);
	};

	search(label){
		return `Searching for cities start with "${label}"`;
	}
	
	render() {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div>
				<AsyncComponent value={this.state.value} onChange={this.onChange} onValueClick={this.gotoWeather} valueKey="id" 
				placeholder="Type here." labelKey="name" autoBlur={this.state.autoBlur}
				promptTextCreator={this.search} loadOptions={this.getCities} backspaceRemoves={this.state.backspaceRemoves} />
				{ this.state.showForecast && <CityForecast city={this.state.value.name} forecast={this.state.forecast}/> }
				{ this.state.showWarning && <Warning/> }
			</div>
		);
	}
};

CitySelector.defaultProps = {
  label: React.PropTypes.string
};

export default CitySelector;