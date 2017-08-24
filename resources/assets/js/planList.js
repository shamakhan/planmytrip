import React, {Component} from 'react';
import PlanItem from './plan';


class Plan extends Component{
	constructor(props){
		super(props);
		this.state={
			day:0,
			places:this.props.places
		}

		this.dayDisplay=this.dayDisplay.bind(this);
		this.pagination=this.pagination.bind(this);
		this.handleClick=this.handleClick.bind(this);
		this.removePlace=this.removePlace.bind(this);
	}

	removePlace(index,i){
		//console.log(index+" "+i);
		let arr=this.state.places;
		arr[i].splice(index,1);
		this.setState({places:arr});
	}

	dayDisplay(){
		let places=[];
		if(this.state.places){
			places=this.state.places[this.state.day].map((place,i) =>{
				return (<PlanItem key={place.id} index={place.i} day={this.state.day} removePlace={this.removePlace} place={place} />);
			});
		}
		console.log(this.state.places);
		return ( <div>{places} </div>);
	}

	handleClick(event){
		let page=parseInt(event.target.innerHTML)-1;
		this.setState({day:page})

	}

	pagination(){
		let page=[];
		if(this.state.places && this.state.places.length>1){
			let l=this.state.places.length;
			for(let i=0;i<l;i++){
				page.push(<li key={i}><a href="#" onClick={this.handleClick}>{i+1}</a></li>);
			}
		}
		return (<ul className="pagination">{page}</ul>);

	}


	render(){
		// let places=[];
		// if(this.props.places){
		// 	places=this.props.places[0].map((place,i) =>{
		// 		return (<PlanItem key={i} place={place} />);
		// 	});
		// }
		return (<div>{this.pagination()}

			{this.dayDisplay()} </div>);
	}

}

export default Plan;