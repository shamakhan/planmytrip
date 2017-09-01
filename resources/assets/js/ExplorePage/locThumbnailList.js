import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchLocThumbnail} from '../PlanPage/actions/planAction'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LocThumbnail from './locThumbnail'

class LocThumbnailList extends React.Component{
	constructor(){
		super();
	}

	componentWillMount(){
		this.props.fetchLocThumbnail(this.props.city);
	}

	componentWillUpdate(nextProps, nextState){
		if(nextProps.city!==this.props.city){
		this.props.fetchLocThumbnail(this.props.city);
		}
	}

	render(){

		let locThumbnailItem;
	if(this.props.locThumbnails){

		locThumbnailItem=this.props.locThumbnails.map( (locThumbnail,i) => {
			console.log(locThumbnail);
			return (
				<LocThumbnail key={i}  locThumbnail={locThumbnail} index={i}/>
				);
		} );
			}
		return ( 
		<div className="container">
			<div className="grid">
				{locThumbnailItem}
			</div>
		</div>
			);

	}


}

function mapStateToProps(state){
	return{
		locThumbnails : state.locThumbnails.locThumbnails
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchLocThumbnail:fetchLocThumbnail},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocThumbnailList);