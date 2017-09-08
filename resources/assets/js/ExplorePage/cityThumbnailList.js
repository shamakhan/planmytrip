import React, {Component} from 'react';
import {fetchCityThumbnail} from '../PlanPage/actions/planAction'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CityThumbnail from './cityThumbnail';

import FontAwesome from 'react-fontawesome';

import LocThumbnailList from './locThumbnailList';

class CityThumbnailList extends React.Component{
	constructor(){
		super();
		this.state={
			city:'',
		}

		this.goToLocations=this.goToLocations.bind(this);

		this.goBack=this.goBack.bind(this);
	}

	goBack(){
		if(this.state.city){
			this.setState({city:''});
		}
		else{
			this.props.goBack();
		}
	}

	goToLocations(city)
	{
		this.setState({city:city});
	}

	componentWillMount(){
		this.props.fetchCityThumbnail();
	}

	render(){

		let cityThumbnailItem;
	if(this.props.cityThumbnails){

		cityThumbnailItem=this.props.cityThumbnails.map( (cityThumbnail,i) => {
			
			return (
				<CityThumbnail key={i}  cityThumbnail={cityThumbnail} goToLocations={this.goToLocations} index={i}/>
				);
		} );
			}
				if(!this.state.city){
					return (<div>
						<div style={{display:"flex",flexDirection:"row",width:"100%"}}>
				<div style={{flex:"initial"}}><button className="btn btn-primary" onClick={this.goBack}><FontAwesome name="arrow-left" /></button></div>
					<div style={{flex:"auto",textAlign:"center"}}><h3>Explore Cities</h3></div>
				</div>
				<hr style={{marginTop:"0px"}}/>
					<ul className="places-list">
						{cityThumbnailItem}
					</ul>
					</div>
					);
				}
				else{
					return (
						<div>
						<div style={{display:"flex",flexDirection:"row",width:"100%"}}>
				<div style={{flex:"initial"}}><button className="btn btn-primary" onClick={this.goBack}><FontAwesome name="arrow-left" /></button></div>
					<div style={{flex:"auto",textAlign:"center",fontFamily:"cursive"}}><h3><b>{this.state.city.toUpperCase()}</b></h3></div>
				</div>
				<hr style={{marginTop:"0px"}}/>
						<LocThumbnailList city={this.state.city}/>
						</div>
						);
				}


	}


}

function mapStateToProps(state){
	return{
		cityThumbnails : state.cityThumbnails.cityThumbnails
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCityThumbnail:fetchCityThumbnail},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CityThumbnailList);