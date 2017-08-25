import React, {Component} from 'react';
import PlanItem from './plan';

import RemovedPlace from './removedPlace';


class PlanList extends Component{
	constructor(props){
		super(props);
		this.state={
			day:0,
			places:this.props.places,
			removed:[],
			activePage:document.querySelector("#firstPage"),
		}

		this.dayDisplay=this.dayDisplay.bind(this);
		this.pagination=this.pagination.bind(this);
		this.handleClick=this.handleClick.bind(this);
		this.removePlace=this.removePlace.bind(this);
		this.displayRemoved=this.displayRemoved.bind(this);
	}

	removePlace(index,i){
		//console.log(index+" "+i);
		let arr=this.state.places;
		let removed=this.state.removed;
		removed.push(arr[i].splice(index,1));
		this.setState({places:arr});
		this.setState({removed:removed});
	}

	dayDisplay(){
		let places=[];
		if(this.state.places){
			places=this.state.places[this.state.day].map((place,i) =>{
				return (<PlanItem key={i} index={i} day={this.state.day} removePlace={this.removePlace} place={place} />);
			});
		}
		return ( <div>{places} </div>);
	}

	handleClick(event){
		let page=parseInt(event.target.innerHTML)-1;
		this.setState({day:page});
		if(document.querySelector("#firstPage") && document.querySelector("#firstPage").classList.contains("active")){
			document.querySelector("#firstPage").classList.remove('active');
			document.querySelector("#firstPage").removeAttribute('id');
			}
		if(this.state.activePage){
			this.state.activePage.classList.remove('active');
		}
		let temp=this.state.activePage;
		temp=event.currentTarget;
		console.log(temp);
		this.setState({activePage:temp});
		event.currentTarget.classList.add('active');

	}

	pagination(){
		let page=[];
		if(this.state.places && this.state.places.length>1){
			let l=this.state.places.length;
				page.push(<li key={0} className="active" id="firstPage" onClick={this.handleClick}><a href="#">{1}</a></li>);
			for(let i=1;i<l;i++){
				page.push(<li key={i} onClick={this.handleClick}><a href="#">{i+1}</a></li>);

			}
		}
		return (<ul className="pagination">{page}</ul>);

	}

	displayRemoved(){
		let removedItems=[];
		if(this.state.removed !== []){
			removedItems=this.state.removed.map((item,i)=>{
				return (<RemovedPlace key={i} place={item[0]}/>);
			});
		}
		return (<ul>{removedItems}</ul>);
	}


	render(){
		// let places=[];
		// if(this.props.places){
		// 	places=this.props.places[0].map((place,i) =>{
		// 		return (<PlanItem key={i} place={place} />);
		// 	});
		// }
		return (<div className="row"><div className="col-lg-7 col-md-8 col-sm-10">{this.pagination()}

			{this.dayDisplay()} </div>
			<div className="col-lg-4 col-md-4 col-sm-7">
			<h3>Removed Places</h3>
			{this.displayRemoved()}
			</div>
			</div>);
	}

}

export default PlanList;