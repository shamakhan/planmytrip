import React, {Component} from 'react';

class CityThumbnail extends Component{

	constructor(){
		super();
		this.goToLocations = this.goToLocations.bind(this);
	}

	goToLocations(){
		let city = this.props.cityThumbnail.city.toLowerCase();
		city = city.replace(" ", "");
		this.props.goToLocations(city);
	}
	
	render() {
		return (
			<ul className="places-list">
			<li>
				<a onClick={this.goToLocations} 
				className="places-list-a" 
				target="_blank" 
				title="Things to do in Portsmouth">
				    <div className="tours-dest-cont">
				      <div className="tours-attraction-city-name">
				      	{this.props.cityThumbnail.country}
				      </div>
				      <div className="tour-dest-img-wrap">
				        <img 
				        alt="Things to do in Portsmouth" 
				        className="tour-dest-cover lazy-load" 
				        src={this.props.cityThumbnail.image} 
				        />
				        <div className="dest-tour-count">
					        <span>{this.props.cityThumbnail.locCount}</span> 
					        <small> Places to go</small>
				        </div>
				      </div>
				      <div className="tour-dest-details">
				        <label className="tour-dest-name">
				          {this.props.cityThumbnail.city}
				        </label>
				      </div>
				    </div>
				</a>
			</li>
			</ul>
			);
	}
}

export default CityThumbnail;