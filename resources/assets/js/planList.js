import React, {Component} from 'react';
import PlanItem from './plan';

import RemovedPlace from './removedPlace';

import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


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
		this.setState({removed:removed});
	}

	onRemovePlaceClick(place){
		let arr=this.state.currentPlace;
		arr.unshift(place);
		this.setState({currentPlace:arr});
		let temp=this.state.removed;
	    temp.splice(temp.indexOf(place),1);
		this.setState({removed:temp});
	}

	dayDisplay(){
		let places=[];
		if(this.state.places){
			places=this.state.currentPlace.map((place,i) =>{
				return (<PlanItem key={i} index={i} id={place.id} day={this.state.day} removePlace={this.removePlace} movePlace={this.movePlace} place={place} />);
			});
		}
		return ( <div>{places} </div>);
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