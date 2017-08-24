import React, {Component} from 'react';
import PlanItem from './plan';


class Plan extends Component{
	render(){
		let places=[];
		if(this.props.places){
			places=this.props.places[0].map((place,i) =>{
				return (<PlanItem key={i} place={place} />);
			});
		}
		return ( <div>{places} </div>);
	}

}

export default Plan;