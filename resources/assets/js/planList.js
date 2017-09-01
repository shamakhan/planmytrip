import React, {Component} from 'react';
import PlanItem from './plan';

import OtherPlaces from './otherPlaces';

import LocThumbnailList from './ExplorePage/locThumbnailList';

import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';
import Temporary from './temporaryPlaces';
import moment from 'moment';

import FontAwesome from 'react-fontawesome';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class PlanList extends Component{
	constructor(props){
		super(props);
		this.state={
			day:0,
			fromDate:this.props.fromDate,
			currentDate:this.props.fromDate,
			journeyDays:this.props.journeyDays,
			city:this.props.city,
			currentPlace:this.props.places[0],
			places:this.props.places,
			remaining:this.props.remaining,
			searched:this.props.remaining,
			categories:this.props.categories,
			selectedCategories:this.props.selectedCategories,
			activePage:document.querySelector("#firstPage"),
		}

		this.dayDisplay=this.dayDisplay.bind(this);

		this.pagination=this.pagination.bind(this);
		
		this.handlePageClick=this.handlePageClick.bind(this);

		this.getPrevPlace=this.getPrevPlace.bind(this);

		this.setArrivalTimes=this.setArrivalTimes.bind(this);

		this.getCorrectTimeAdd=this.getCorrectTimeAdd.bind(this);

		this.handleSearch=this.handleSearch.bind(this);

		this.removePlace=this.removePlace.bind(this);

		this.movePlace=this.movePlace.bind(this);

		this.displayRemaining=this.displayRemaining.bind(this);
		this.onRemainingPlaceClick=this.onRemainingPlaceClick.bind(this);

		this.displayCategories=this.displayCategories.bind(this);
		this.handleCategoryClick=this.handleCategoryClick.bind(this);

	}

	displayCategories(){
		if(this.state.categories && this.state.selectedCategories){
		let temp=this.state.categories;
		let tmp2=this.state.selectedCategories;
		let l=temp.length;
		let categoryList=[];
		for(let i=0;i<l;i++){
			if(tmp2.includes(temp[i])){
				categoryList.push(<span key={i}><button className="btn btn-xs btn-info active" onClick={this.handleCategoryClick}>{temp[i]}</button>&nbsp;</span>);
			}
			else{
				categoryList.push(<span key={i}><button className="btn btn-xs btn-default" onClick={this.handleCategoryClick}>{temp[i]}</button>&nbsp;</span>);
			}
		}
		return (<div>{categoryList}</div>);
	}
	}

	handleCategoryClick(event){
		let category=event.target;
		let val=category.innerHTML;
		let temp=this.state.selectedCategories;
		if(category.classList.contains("active")){
			category.classList.remove("active");
			category.classList.remove("btn-info");
			category.classList.add("btn-default");
			temp.splice(temp.indexOf(val),1);
		}
		else{
			category.classList.remove("btn-default");
			category.classList.add("active");
			category.classList.add("btn-info");
			temp.push(val);
		}
		axios.get("/home/plan?city="+this.state.city+"&topCategories="+encodeURIComponent(JSON.stringify(temp))+"&days="+(this.state.journeyDays))
		.then((response) => {
			let plan=response.data;
			let l=plan.length;
			this.setState({places:plan.slice(0,l-1)});
			let remaining=plan[this.state.journeyDays];
			this.setState({remaining:remaining});
			this.setState({searched:remaining});
			this.setState({currentPlace:plan[this.state.day]});
		})
		this.setState({selectedCategories:temp});
	}

	handleSearch(event){
		let val=event.target.value;
		let arr=this.state.remaining;
		let searched=[];
		if(val==''){
			this.setState({searched:arr});
		}
		else{
			let searchMatch=new RegExp(val,"i");
			let l=arr.length;
			for(let i=0;i<l;i++){
				if(arr[i].name.match(searchMatch) || arr[i].categories.match(searchMatch))
					searched.push(arr[i]);
			}
			this.setState({searched:searched});
			
		}

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
				let temp=this.state.remaining;
				temp.splice(temp.indexOf(place),1);
				this.setState({remaining:temp});
				temp=this.state.searched;
				temp.splice(temp.indexOf(place),1);
				this.setState({searched:temp});
			    //console.log(this.state.removed);
			}
  	}

	removePlace(index,i){
		//console.log(index+" "+i);
		let arr=this.state.places;
		let remaining=this.state.remaining;
		remaining.unshift((arr[i].splice(index,1))[0]);
		this.setState({places:arr});
		this.setArrivalTimes(arr[this.state.day]);
		this.setState({remaining:remaining});
	}

	// onRemovePlaceClick(place){
	// 	let arr=this.state.currentPlace;
	// 	//console.log(place);
	// 	arr.unshift(place);
	// 	this.setState({currentPlace:arr});
	// 	this.setArrivalTimes(arr);
	// 	let temp=this.state.removed;
	//     temp.splice(temp.indexOf(place),1);
	// 	this.setState({removed:temp});
	// }

	onRemainingPlaceClick(place){
		let arr=this.state.currentPlace;
		//console.log(place);
		arr.unshift(place);
		this.setState({currentPlace:arr});
		this.setArrivalTimes(arr);
		let temp=this.state.searched;
	    temp.splice(temp.indexOf(place),1);
		this.setState({searched:temp});
		temp=this.state.remaining;
		temp.splice(temp.indexOf(place),1);
		this.setState({remaining:temp});
	}

	getCorrectTimeAdd(timeArrival,timeRequired,traveltime){
		let hour=parseInt(timeArrival.substring(0,2));
		let min=parseInt(timeArrival.substring(3,5));
		if(!timeRequired){
			timeRequired="01:45 hrs";
		}
		if(parseInt(timeRequired.substring(0,2)) > 5){
			timeRequired="05:00 hrs";
		}
		hour+=parseInt(timeRequired.substring(0,2));
		min+=parseInt(timeRequired.substring(3,5));	
		if(timeRequired.includes("00:15")){
			min+=15;
		}
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
		if(!temp.timeOpen || temp.timeOpen=="24 hrs"){
			temp.timeOpen="09:00 am - 11:00 pm";
		}
		temp.timeArrival=temp.timeOpen.substring(0,5);
		if(!temp.timeArrival || parseInt(temp.timeArrival.substring(0,2))<9 )
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
		temp=this.state.fromDate;
		temp=moment(temp).add(page,'days');
		this.setState({currentDate:temp});

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

	displayRemaining(){
		let remaining=[];
		if(this.state.searched){
			remaining=this.state.searched.map((item,i)=>{
				return (<OtherPlaces key={i} onPlaceClick={this.onRemainingPlaceClick} place={item} movePlace={this.movePlace} index="999"/>);
			});
		}
		return (<ul>{remaining}</ul>);
	}

	render(){
		// let places=[];
		// if(this.props.places){
		// 	places=this.props.places[0].map((place,i) =>{
		// 		return (<PlanItem key={i} place={place} />);
		// 	});
		// }
		return (<div className="row"><div className="col-lg-8 col-md-8 col-sm-10" >
			{this.displayCategories()}
			<div style={{display:"flex",justifyContent:"space-between"}}>
			<div style={{width:"89%"}}>
			{this.pagination()}
			</div>
			
			{/* Calendar */} 
			<div style={{width:"10%"}}>
			<div className="" style={{display:"inline-flex",flexDirection:"column",alignItems:"center",flexWrap:"nowrap",justifyContent:"space-between",height:"65px",width:"70px",marginTop:"10px",backgroundColor:"#fafafa",borderRadius:"4px",border:"1px solid rgba(0,0,0,0.2)"}}>
			<div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%",height:"16px",borderRadius:"4px 4px 0px 0px",backgroundColor:"#d9534f",color:"white",borderBottom:"1px solid rgba(0,0,0,0.1)"}}><h6><b>{monthNames[moment(this.state.currentDate).month()]}</b></h6></div>
			<h3 style={{margin:"auto"}}><strong>{moment(this.state.currentDate).format('D')}</strong></h3>
			<h6 style={{margin:"auto"}}>{moment(this.state.currentDate).format('Y')}</h6>
			</div>
			</div></div>
			{this.dayDisplay()} 
			</div>
			<div className="col-lg-4 col-md-4 col-sm-7">
			<h3>Remaining Places</h3>
			<input type="text" style={{width:"350px"}} onChange={this.handleSearch} placeholder="Have a place in mind? Find here..."/>
			<div style={{height:"200px",width:"350px",backgroundColor:"#fffff0",border:"1px solid rgba(0,0,0,0.2)",overflowY:"auto"}}>
				<div style={{marginTop:"3px"}}>{this.displayRemaining()}</div>
			</div>
			<br/>
			<h3>Sticky Board</h3>
			<div style={{height:"200px",width:"350px",backgroundColor:"#fffff0",border:"1px solid rgba(0,0,0,0.2)",overflowY:"auto"}}>
				<div style={{marginTop:"3px"}}></div>
			</div>
			<br/>
			</div>
			</div>);
	}

}

export default DragDropContext(HTML5Backend)(PlanList);