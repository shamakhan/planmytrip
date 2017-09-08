import React,{Component} from 'react';
import {DropTarget} from 'react-dnd';
import { findDOMNode } from 'react-dom';
import OtherPlaces from './otherPlaces';

const placeTarget = {
  drop(props, monitor, component) {
  	if(monitor.getItem().type=="remaining")
  		return;
  	let arr=component.state.places;
  	if(arr){
  	arr.unshift(monitor.getItem().place);
  	}
  	else{
  		arr.push(monitor.getItem().place);
  	}
  	component.setState({places:arr});
  	props.movePlace(monitor.getItem().place);
  },
};

@DropTarget("placeItem", placeTarget, (connect,monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
export default class TemporaryPlaces extends Component{
	constructor(props){
		super(props);
		this.state={
			places:this.props.places,
		}

		this.displayTempPlaces=this.displayTempPlaces.bind(this);

		this.onPlaceClick=this.onPlaceClick.bind(this);
	}

	onPlaceClick(place){
		let temp=this.state.places;
		temp.splice(temp.indexOf(place),1);
		this.setState({places:temp});
		this.props.onPlaceClick(place);
	}


	displayTempPlaces(){
		let places=[];
		if(this.state.places){
			places=this.state.places.map((item,i)=>{
				return (<OtherPlaces key={i} onPlaceClick={this.onPlaceClick} place={item} index="999" type="temporary"/>);
			});
		}
		return <ul>{places}</ul>;
	}

	render(){
		const {isOver,connectDropTarget} = this.props;

		return connectDropTarget(
			<div style={{height:"250px",width:"350px",position:"relative",backgroundColor:"#fffff0",border:"1px solid rgba(0,0,0,0.2)",overflowY:"auto"}}>
				<div style={{marginTop:"3px",marginLeft:"-20px"}}>
				{this.displayTempPlaces()}
				</div>
			{isOver && <div style={{
		            position: 'absolute',
		            top: 0,
		            left: 0,
		            height: '100%',
		            width: '100%',
		            zIndex: 1,
		            opacity: 0.5,
		            backgroundColor: '#F0E68C',
		          }} />}
			</div>
			);
	}
}
