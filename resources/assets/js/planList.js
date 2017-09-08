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

import LocMap from './locMap';

import Affix from './affix';

import Media from'react-media';

import Throttle from 'react-throttle';

import withScrolling,{createVerticalStrength} from 'react-dnd-scrollzone';

import Popup from 'react-popup';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Scrollzone=withScrolling('div');
const vStrength = createVerticalStrength(550);

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
			temporary:this.props.temporary,
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

		this.onTempPlaceClick=this.onTempPlaceClick.bind(this);
		this.moveToStickyBoard=this.moveToStickyBoard.bind(this);

		this.handleSaveClick=this.handleSaveClick.bind(this);
		//this.displayPage=this.displayPage.bind(this);

		this.handleMaxDaysAlert=this.handleMaxDaysAlert.bind(this);

		}

		handleMaxDaysAlert(event){
			event.preventDefault();
			let temp=document.getElementById('alertBox');
			temp.style.display=temp.style.display==='none'?'':'none';
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

	handleSaveClick(){
		let content;
		let content2 = document.getElementById('stylesht').innerHTML;
    let mywindow = window.open('', 'Print', 'height=600,width=800');

    mywindow.document.write('<html><head>');
    mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
    mywindow.document.write( "<style>" );
    mywindow.document.write(content2);
    mywindow.document.write( "</style>" );
    mywindow.document.write('</head><body >');
			content=document.querySelector('.myPlan').innerHTML;
    	mywindow.document.write(content);
    mywindow.document.write('</body>');
    mywindow.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>')
    mywindow.document.write('</html>');

    mywindow.document.close();
    mywindow.focus()
    //mywindow.print();
    //mywindow.close();
    return true;
	}

	// displayPage(page){
	// 	let places=[];
	// 		places=this.state.places[page].map((place,i) =>{
	// 			return (<PlanItem key={i} timeArrival={place.timeArrival} previous={this.getPrevPlace(i-1)} index={i} id={place.id} day={page} removePlace={this.removePlace} movePlace={this.movePlace} place={place} />);
	// 		});
	// 	return (<div>{places}</div>);
	
	// }


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


	moveToStickyBoard(place){
		let arr=this.state.currentPlace;
		arr.splice(arr.indexOf(place),1);
		this.setState({currentPlace:arr});
		this.setArrivalTimes(arr);
		let places=this.state.places;
		places[this.state.day]=this.state.currentPlace;
		this.setState({places:places});
	}

	movePlace(dragIndex, hoverIndex,place,type) {
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
			    if(type=="remaining"){
					let temp=this.state.remaining;
					temp.splice(temp.indexOf(place),1);
					this.setState({remaining:temp});
					temp=this.state.searched;
					temp.splice(temp.indexOf(place),1);
					this.setState({searched:temp});
				}
				else{
					let temp=this.state.temporary;
					temp.splice(temp.indexOf(place),1);
					this.setState({temporary:temp});
				}
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

	onTempPlaceClick(place){
		let arr=this.state.currentPlace;
		arr.unshift(place);
		this.setState({currentPlace:arr});
		this.setArrivalTimes(arr);
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
		if(nextState.places!==this.state.places){
			this.props.setCurrentPlan(nextState.places,nextState.remaining,nextState.temporary);
		}
		
	}

	dayDisplay(){
		let places=[];
		if(this.state.places){
			places=this.state.currentPlace.map((place,i) =>{
				return (<PlanItem key={i} timeArrival={place.timeArrival} previous={this.getPrevPlace(i-1)} index={i} id={place.id} day={this.state.day} removePlace={this.removePlace} movePlace={this.movePlace} place={place} />);
			});
		}
		return (<div style={{display:"flex",flexDirection:"column" }}>{places}</div>);
		// return (<div style={{width:"100%",height:"600px",overflowY:"auto",backgroundColor:"white",border:"1px solid rgba(0,0,0,0.2)"}}> <Scrollzone>
		// 		{this.state.currentPlace.map((place,i) => (
  //           <PlanItem key={i} timeArrival={place.timeArrival} previous={this.getPrevPlace(i-1)} index={i} id={place.id} day={this.state.day} removePlace={this.removePlace} movePlace={this.movePlace} place={place} />
  //         			))} 
		// 		</Scrollzone></div>);
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
		//let temp=this.state.activePage;
		let temp=event.currentTarget;
		//console.log(temp);
		this.setState({activePage:temp});
		temp.classList.add('active');
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
				return (<OtherPlaces key={i} onPlaceClick={this.onRemainingPlaceClick} place={item} index="999" type="remaining"/>);
			});
		}
		return (<ul>{remaining}</ul>);
	}

	alertForMaxDays(){
		if(this.props.journeyDays>this.props.places.length){
			Popup.alert("No more new places to visit. Plan given for "+moment(this.props.fromDate).format("DD/MM/YYYY")+' to '+moment(this.props.fromDate).add(this.props.journeyDays-1,"days").format("DD/MM/YYYY")+' instead of '+this.props.toDate.format("DD/MM/YYYY"));
		}
	}

	render(){
		// let places=[];
		// if(this.props.places){
		// 	places=this.props.places[0].map((place,i) =>{
		// 		return (<PlanItem key={i} place={place} />);
		// 	});
		// }

		return (<div>
			<div className="row"><div className="col-lg-8 col-md-8 col-sm-8">
			{this.displayCategories()}
			<div style={{display:"flex",justifyContent:"space-between"}}>
			<div style={{width:"89%"}}>
			{this.pagination()}
			</div>
		{this.props.journeyDays>this.props.places.length && <a onClick={this.handleMaxDaysAlert}><h4><FontAwesome  name="exclamation-circle"/></h4></a>}
			{/* Calendar */}&nbsp; 
			<div style={{width:"10%"}}>
			<div className="calendar">
			<div className="month">
			<h6><b>{monthNames[moment(this.state.currentDate).month()]}</b></h6>
			</div>
			<h3 style={{margin:"auto"}}><strong>{moment(this.state.currentDate).format('D')}</strong></h3>
			<h6 style={{margin:"auto"}}><b>{moment(this.state.currentDate).format('Y')}</b></h6>
			</div>
			</div>
			</div>
			<div id="alertBox" style={{position:"absolute",width:"500px",height:"50px",display:"none",right:"-40%",top:"-6.5%", backgroundColor:"#fff"}}>
			<div className="alert alert-warning" >Locations exhausted. Plan given from <b>{moment(this.props.fromDate).format("DD/MM/YYYY")}</b> to <b>{moment(this.props.fromDate).add(this.props.places.length-1,"days").format("DD/MM/YYYY")}</b> instead of <b>{moment(this.props.toDate).format("DD/MM/YYYY")}</b>.</div>
			</div>
			<div className="myPlan" style={{height:"auto"}}>
			{this.dayDisplay()}
			</div> 
			</div>
			<div className="col-lg-4 col-md-4 col-sm-4">
			<Media query="(min-width: 770px)">
			{matches=>matches?(
				<Affix offset={50}>			
			<div id="fixingDiv">
			<h3>Remaining Places</h3>
			<input type="text" style={{width:"350px"}} onChange={this.handleSearch} placeholder="Have a place in mind? Find here..."/>
			<div style={{height:"200px",width:"350px",backgroundColor:"#fffff0",border:"1px solid rgba(0,0,0,0.2)",overflowY:"auto"}}>
				<div style={{marginTop:"3px",marginLeft:"-20px"}}>{this.displayRemaining()}</div>
			</div>
			<br/>
			<h3>Sticky Board</h3>
			<Temporary movePlace={this.moveToStickyBoard} places={this.state.temporary} onPlaceClick={this.onTempPlaceClick}/>
			<br/>
			</div>
			</Affix>
			) : (<div id="fixingDiv">
			<h3>Remaining Places</h3>
			<input type="text" style={{width:"100%"}} onChange={this.handleSearch} placeholder="Have a place in mind? Find here..."/>
			<div style={{height:"200px",width:"100%",backgroundColor:"#fffff0",border:"1px solid rgba(0,0,0,0.2)",overflowY:"auto"}}>
				<div style={{marginTop:"3px",marginLeft:"-20px"}}>{this.displayRemaining()}</div>
			</div>
			<br/>
			<h3>Sticky Board</h3>
			<Temporary movePlace={this.moveToStickyBoard} places={this.state.temporary} onPlaceClick={this.onTempPlaceClick}/>
			<br/>
			</div>)}
			</Media>
			</div>
			</div>
			<br/>
			<br/>
			<div id="googleMap" style={{width:"67%",float:"left"}}>
				 <LocMap key={this.state.currentPlace} locations={this.state.currentPlace} listType={"DAYPLAN"}/>
			</div>

			</div>);
	}

}

export default DragDropContext(HTML5Backend)(PlanList);