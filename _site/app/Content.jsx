import React from 'react';
import CitySelector from './CitySelector';

class Content extends React.Component {
    render() {
        return <div className="title">    
                    <h1>Select a city and click on it's name...</h1>  
                    <CitySelector label="Choose the city:"/>
        	   </div>;
    }
}

export default Content;