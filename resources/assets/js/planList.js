import React, {Component} from 'react';
import PlanItem from './plan';

import RemovedPlace from './removedPlace';

import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';


class PlanList extends Component{
	constructor(props){
		super(props);
		this.state={
			day:0,
			currentPlace:this.props.places[0],
			places:this.props.places,
			removed:[],
			activePage:document.querySelector("#firstPage"),
		}

		this.dayDisplay=this.dayDisplay.bind(this);

		this.pagination=this.pagination.bind(this);
		this.handlePageClick=this.handlePageClick.bind(this);
		
		this.removePlace=this.removePlace.bind(this);
		this.displayRemoved=this.displayRemoved.bind(this);
		this.onRemovePlaceClick=this.onRemovePlaceClick.bind(this);

		this.movePlace=this.movePlace.bind(this);

		this.getPrevPlace=this.getPrevPlace.bind(this);

		this.setArrivalTimes=this.setArrivalTimes.bind(this);
		this.getCorrectTimeAdd=this.getCorrectTimeAdd.bind(this);

	}

	movePlace(dragIndex, hoverIndex,place) {
					if(this.state.currentPlace.includes(place)){
			    const { currentPlace } = this.state;
			    const dragPlace = currentPlace[dragIndex];

			    this.setState(update(this.state, {
			      currentPlace: {
			        $splice: [
			          [dragIndex, 1],
			          [hoverIndex, 0, dragPlace
			          ],
			        ],
			      },
			    }));	

			    let places=this.state.places;
			    places[this.state.day]=this.state.currentPlace;
			    this.setState({places:places});
			}
			else{
				let arr=this.state.currentPlace;
				arr.splice(hoverIndex,0,place);
				this.setState({currentPlace:arr});
				this.setArrivalTimes(arr);
			    let places=this.state.places;
			    places[this.state.day]=this.state.currentPlace;
			    this.setState({places:places});
			    let temp=this.state.removed;
			    temp.splice(temp.indexOf(place),1);
			    this.setState({removed:temp});
			    //console.log(this.state.removed);
			}
  	}

	removePlace(index,i){
		//console.log(index+" "+i);
		let arr=this.state.places;
		let removed=this.state.removed;
		removed.push((arr[i].splice(index,1))[0]);
		this.setState({places:arr});
		this.setArrivalTimes(arr[this.state.day]);
		this.setState({removed:removed});
	}

	onRemovePlaceClick(place){
		let arr=this.state.currentPlace;
		arr.unshift(place);
		this.setState({currentPlace:arr});
		this.setArrivalTimes(arr);
		let temp=this.state.removed;
	    temp.splice(temp.indexOf(place),1);
		this.setState({removed:temp});
	}

	getCorrectTimeAdd(timeArrival,timeRequired,traveltime){
		let hour=parseInt(timeArrival.substring(0,2));
		let min=parseInt(timeArrival.substring(3,5));
		hour+=parseInt(timeRequired.substring(0,2));
		min+=parseInt(timeRequired.substring(3,5));	
		min+=traveltime;
		if(min>59){
			hour+=parseInt(min/60);
			min=min%60;
		}
		if(hour>24)
		{
			hour=hour%24;
		}
		function padZeroes(num){
			if(num.toString().length<2){
				return "0"+num;
			}
			return num;
		}
		return ""+padZeroes(hour)+":"+padZeroes(min);
	}

	setArrivalTimes(place){
		let arr=place;
		let temp=place[0];
		temp.timeArrival=temp.timeOpen.substring(0,5);
		if(parseInt(temp.timeArrival.substring(0,2))<9)
		{
			temp.timeArrival="09:00";
		}
		arr.splice(0,1,temp);
		let prevPlaceTime;
		for(let i=1;i<arr.length;i++){
			if(temp.name==="lunch"){
				temp.timeRequired="00:30";
			}
			prevPlaceTime=this.getCorrectTimeAdd(temp.timeArrival,temp.timeRequired,30);
			temp=arr[i];
			temp.timeArrival=prevPlaceTime;
			arr.splice(i,1,temp);
		}
		this.setState({currentPlace:arr});
	}

	componentWillMount(){
		this.setArrivalTimes(this.state.currentPlace);
	}

	componentWillUpdate(nextProps,nextState){
		if(nextState.currentPlace!==this.state.currentPlace){
			this.setArrivalTimes(nextState.currentPlace);
		}
		
	}

	dayDisplay(){
		let places=[];
		if(this.state.places){
			places=this.state.currentPlace.map((place,i) =>{
				return (<PlanItem key={i} timeArrival={place.timeArrival} previous={this.getPrevPlace(i-1)} index={i} id={place.id} day={this.state.day} removePlace={this.removePlace} movePlace={this.movePlace} place={place} />);
			});
		}
		return ( <div>{places} </div>);
	}

	getPrevPlace(i){
		if(i<0){
			return null;
		}
		else{
			if(this.state.currentPlace[i].name==="lunch"){
				if(this.state.currentPlace[i-1]){
					return this.state.currentPlace[i-1].name;
				}
				else
					return null;
			}
			return this.state.currentPlace[i].name;
		}
	}

	handlePageClick(event){
		let page=parseInt(event.target.innerHTML)-1;
		this.setState({day:page});
		this.setState({currentPlace:this.state.places[page]});
		if(document.querySelector("#firstPage") && document.querySelector("#firstPage").classList.contains("active")){
			document.querySelector("#firstPage").classList.remove('active');
			document.querySelector("#firstPage").removeAttribute('id');
			}
		if(this.state.activePage){
			this.state.activePage.classList.remove('active');
		}
		let temp=this.state.activePage;
		temp=event.currentTarget;
		//console.log(temp);
		this.setState({activePage:temp});
		event.currentTarget.classList.add('active');

	}

	pagination(){
		let page=[];
		if(this.state.places && this.state.places.length>1){
			let l=this.state.places.length;
				page.push(<li key={0} className="active" id="firstPage" onClick={this.handlePageClick}><a href="#">{1}</a></li>);
			for(let i=1;i<l;i++){
				page.push(<li key={i} onClick={this.handlePageClick}><a href="#">{i+1}</a></li>);

			}
		}
		return (<ul className="pagination">{page}</ul>);

	}

	displayRemoved(){
		let removedItems=[];
		if(this.state.removed !== []){
			removedItems=this.state.removed.map((item,i)=>{
				return (<RemovedPlace key={i} onPlaceClick={this.onRemovePlaceClick} place={item} movePlace={this.movePlace}/>);
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

export default DragDropContext(HTML5Backend)(PlanList);