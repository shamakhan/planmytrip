import React, {Component} from 'react';

class LocThumbnail extends Component{

	constructor(){
		super();
		this.getPartialDescripion = this.getPartialDescripion.bind(this);
		this.getFirstName = this.getFirstName.bind(this);
		this.getRestName = this.getRestName.bind(this);
	}
	getFirstName(name){
		return name.split(' ').slice(0, 1);
	}
	getRestName(name){
		if (name.split(' ').length > 1) {
			return ' '+name.split(' ').slice(1).join(' ');
		}else{
			return '';
		}
	}
	getPartialDescripion(description){
		if (description) {
			return description.split(' ').slice(0,6).join(' ')+'...';
		}else{
			return 'No information available'
		}
		
	}
	render() {
		return (
		 <figure className='effect-bubba'>
				<img src={this.props.locThumbnail.image} alt="img06"/>
				<figcaption>
					<h2>{this.getFirstName(this.props.locThumbnail.name)}
					<span>{this.getRestName(this.props.locThumbnail.name)}</span>
					</h2>
					<p>{this.getPartialDescripion(this.props.locThumbnail.description)}</p>
					<a href="#">View more</a>
				</figcaption>			
		</figure>
			
			);
	}
}

export default LocThumbnail;