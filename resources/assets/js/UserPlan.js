import React, {Component} from 'react';
import CategoryList from './categoryList';
import PropTypes from 'prop-types';

import DayPicker, { DateUtils } from 'react-day-picker';

import moment from 'moment';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlan} from './PlanPage/actions/planAction';

import Plan from './planList';

import CityTumbnailList from './ExplorePage/cityThumbnailList';

import FontAwesome from 'react-fontawesome';

import FinalPlanList from './finalPlanList';




//require('bootstrap-datetime-picker/js/bootstrap-datetimepicker.js');

class UserPlan extends Component{
	
	// componentWillMount(){
	// 	this.props.dispatch(fetchPlan());
	// }


	constructor(props){
		super(props);
		this.state={
						mySlider:0,
						isGeneratingPlan:true,
						userName:((_('userName').innerHTML).toUpperCase()),
						city:'mumbai',
						Cities:['mumbai','paris','newyork','london','dubai'],
						journeyDays:null,
						selectedCategories:[],
						categories:["Family And Kids","Leisure","Religious Site","Walking Area","Entertainment","Outdoors","Landmark","Historical Site"],
						plan:[],
						temporary:[],
						from:null,
						to:null,
					};

					this.handleCityChange=this.handleCityChange.bind(this);

					this.handleSubmit=this.handleSubmit.bind(this);

					this.getCategoryNames=this.getCategoryNames.bind(this);

					this.handleDisplay=this.handleDisplay.bind(this);
					// this.toggleCalendar=this.toggleCalendar.bind(this);

					this.generatePlanRender=this.generatePlanRender.bind(this);

					this.handleDayClick=this.handleDayClick.bind(this);
					this.handleResetClick=this.handleResetClick.bind(this);

					this.goBack=this.goBack.bind(this);

					this.addRemoveCategories=this.addRemoveCategories.bind(this);

					this.setCurrentPlan=this.setCurrentPlan.bind(this);

					this.previousPlan=this.previousPlan.bind(this);

					this.displayExplorePage=this.displayExplorePage.bind(this);

					this.finalizePlan=this.finalizePlan.bind(this);
					this.saveFinalPlan=this.saveFinalPlan.bind(this);

					this.handleMaxDaysAlert=this.handleMaxDaysAlert.bind(this);

		}

		handleMaxDaysAlert(){
			let temp=document.getElementById('alertBox');
			temp.style.display=temp.style.display==='none'?'':'none';
		}

		finalizePlan(){
			this.setState({finalized:true});
		}

		saveFinalPlan(){
			let content;
			let content2 = document.getElementById('stylesht').innerHTML;
		    let mywindow = window.open('', 'Print', 'height=600,width=800');

		    mywindow.document.write('<html><head>');
		    mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
		    mywindow.document.write( "<style>" );
		    mywindow.document.write(content2);
		    mywindow.document.write( "</style>" );
		    mywindow.document.write('</head><body >');
			content=document.querySelector('.finalPlan').innerHTML;
		    	mywindow.document.write(content);
		    mywindow.document.write('</body>');
		    mywindow.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>')
		    mywindow.document.write('</html>');

		    mywindow.document.close();
		    mywindow.focus()

		    setTimeout(function(){mywindow.print();},1000);
		    //mywindow.close();
		    return true;
		}

		displayExplorePage(){
			this.setState({explore:true});
		}

		setCurrentPlan(plan,remaining,temporary){
			this.setState({plan:plan});
			this.setState({remaining:remaining});
			this.setState({temporary:temporary})
		}

		addRemoveCategories(category,operation){
			let temp=this.state.selectedCategories;
			if(operation==="add"){
				temp.push(category);
			}
			if(operation==="remove"){
				temp.splice(temp.indexOf(category),1);
			}
			this.setState({selectedCategories:temp});
		}

		previousPlan(){
			let arr=this.state.plan;
			let remain=this.state.remaining;
			arr.push(remain);
			this.handleDisplay(arr);
		}

		goBack(){
			if(this.state.explore && !this.state.isGeneratingPlan && !this.state.finalized){
				
				}
			else if(!this.state.explore && !this.state.isGeneratingPlan && !this.state.finalized){
				this.setState({isGeneratingPlan:true});
				this.setState({cameBack:true});
				this.setState({selectedCategories:[]});
			}
			else if(this.state.explore && this.state.isGeneratingPlan && !this.state.finalized){
				
				
			}
			else if(this.state.finalized){
				this.setState({finalized:false});
			}
			this.setState({explore:false});
		}

	handleDayClick(day) {
	    const range = DateUtils.addDayToRange(day, this.state);
	    this.setState(range);
	    if(range.to){
	    	let days=moment(range.to).diff(range.from,"days")+1;
	    	this.setState({journeyDays:days});
	    }
	  };

	handleResetClick(e){
	    e.preventDefault();
	    this.setState({
	      from: null,
	      to: null,
	    });
	  };
	
	getCategoryNames(categoryList){
		let temp=[];
		let l=categoryList.length;
		for(let i=0;i<l;i++){
			temp[i]=categoryList[i];
		} 
		this.setState({categories:temp});}

	handleSubmit(){
		this.setState({temporary:[]});
		//event.target.preventDefault();
		if(this.state.from && this.state.to && this.state.journeyDays){
			//let topCategory=this.getRankedCategories();
			//console.log(this.state.categories);
			this.props.fetchPlan(this.state.city,this.state.selectedCategories,this.state.journeyDays);
		//this.handleDisplay(this.state.plan);
		}
		else{
			_("displayDayError").innerHTML="<h5 class='alert alert-warning'>Please select appropriate range.</h5>";
		}
	}

	handleDisplay(plan){

		const {isGeneratingPlan} =this.state;
		this.setState({isGeneratingPlan:!isGeneratingPlan});
		let arr=plan[plan.length-1];
		this.setState({remaining:arr});
		plan.splice(plan.length-1,1);
		this.setState({plan:plan});
	}

	
	
	handleCityChange(event){
		const value=event.target.value;
			this.setState({city:value});
			this.setState({cameBack:false});
		}

	

	componentWillUpdate(nextProps,nextState){
				const newPlan=nextProps.plan;
				if(nextState.plan!==this.state.plan){
					this.setState({plan:nextState.plan});
				}
				else if(newPlan !== this.props.plan){
					this.setState({plan:newPlan});
					this.handleDisplay(newPlan);

				}
				}

	generatePlanRender(){

		const { from, to } = this.state;
		return (
				<div>
				<div style={{display:"flex",flexDirection:"row"}}>
				<div style={{flex:"auto",textAlign:"center"}}>
					<h2>Let's make your plan</h2>
				</div>
				<div style={{flex:"initial"}}>
				{this.state.cameBack && <button className="btn btn-primary" onClick={this.previousPlan}>View Previous Plan</button>}&nbsp;
				<button className="btn btn-primary" onClick={this.displayExplorePage}>Explore</button></div>
				</div>
				<hr style={{marginTop:"0px"}}/> 
				<div style={{width:"680px",margin:"auto",border:"1px solid rgba(0,0,0,0.1)"}} className="text-center">		
					<h5>Select Appropriate choices</h5>
			<div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
			<form className="form-horizontal">
			<div className="form-group">
			<label className="control-label col-sm-3" htmlFor="city">City :</label>
			<div className="col-sm-6 col-lg-4 col-md-5">
				<select className="form-control" name="city" onChange={this.handleCityChange} value={this.state.city}> 
					<option value="mumbai">Mumbai</option>
					<option value="paris">Paris</option>
					<option value="london">London</option>
					<option value="newyork">New York</option>
					<option value="dubai">Dubai</option>
				</select>
			</div>
			</div>

			<div className="form-group">
			<label className="control-label col-sm-3" htmlFor="mySlider">Select Categories :</label>
			<div className="col-sm-9">
				<div className="row">
			<CategoryList getCategoryNames={this.getCategoryNames}	addRemoveCategory={this.addRemoveCategories} city={this.state.city.toLowerCase()}/>
			</div>
			</div>
			</div>
			<div className="form-group" style={{display:"flex",flexDirection:"row"}}>
			<label className="control-label col-sm-3" htmlFor="mySlider">Journey Duration :</label>		

			<div>
						
						<div className="RangeExample">
			        {!from && !to && <p>Please select the <strong>first day</strong>.</p>}
			        {from && !to && <p>Please select the <strong>last day</strong>.</p>}
			        {from &&
			          to &&
			          <p>
			            You chose from
			            {' '}
			            {moment(from).format('DD/MM/YYYY')}
			            {' '}
			            to
			            {' '}
			            {moment(to).format('DD/MM/YYYY')}
			            .
			            {' '}
			      		{this.state.journeyDays && <strong><span>{this.state.journeyDays} {this.state.journeyDays==1?<span> Day</span>:<span> Days</span>}</span></strong>}
			            .
			            {' '}<a href="." onClick={this.handleResetClick}>Reset</a>
			            

			          </p>
			          	}
			        <DayPicker
			          numberOfMonths={2}
			          selectedDays={[from, { from, to }]}
			          onDayClick={this.handleDayClick}
			          fixedWeeks
			        />
			      </div>

			      <div  id="displayDayError"></div>
			</div>

			</div>
			<div className="text-center">
				<input type="button" onClick={this.handleSubmit} className="btn btn-primary" value="Generate Plan!"/>
				<br />
				</div>

			
			</form>
			</div>
						</div>
			</div>

			);

			}


	render() {

		if(this.state.plan===[] || this.state.isGeneratingPlan && !this.state.explore){
			return this.generatePlanRender();
		}
		else if(!this.state.explore && !this.state.finalized){
			return (<div><div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
				<button className="btn btn-primary" onClick={this.goBack}><FontAwesome name="arrow-left" /></button>
				<div style={{fontFamily:"cursive",display:"inline-flex"}} ><h4 style={{lineHeight:"3.5em"}}>Your Plan for </h4>&nbsp;&nbsp;<h2> <b>{this.state.city.toUpperCase()}.</b></h2>&nbsp;&nbsp;<h4 style={{lineHeight:"3.5em"}}><FontAwesome name="calendar"/> {moment(this.state.from).format('DD/MM/YYYY')}  -  <FontAwesome name="calendar"/> {moment(this.state.from).add(this.state.plan.length-1,"days").format('DD/MM/YYYY')}</h4>&nbsp;
				</div>
				<div><button className="btn btn-primary" onClick={this.finalizePlan}>Finalize Plan</button>&nbsp;<button className="btn btn-primary" onClick={this.displayExplorePage}>Explore</button></div>
				</div><hr style={{marginTop:"0px"}}/>
				<Plan places={this.state.plan} fromDate={this.state.from} toDate={this.state.to} remaining={this.state.remaining} temporary={this.state.temporary} city={this.state.city} journeyDays={this.state.journeyDays} categories={this.state.categories} selectedCategories={this.state.selectedCategories} setCurrentPlan={this.setCurrentPlan}/></div>);
		}
		else if(!this.state.finalized){
			return (<div>
				<CityTumbnailList goBack={this.goBack}/>
				</div>
				);
		}
		else{
			return (
				<div>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
				<button className="btn btn-primary" onClick={this.goBack}><FontAwesome name="arrow-left" /></button>
				<div style={{fontFamily:"cursive",display:"inline-flex"}} ><h4 style={{lineHeight:"3.5em"}}>Your Final Plan for </h4>&nbsp;&nbsp;<h2> <b>{this.state.city.toUpperCase()}.</b></h2>&nbsp;&nbsp;<h4 style={{lineHeight:"3.5em"}}><FontAwesome name="calendar"/> {moment(this.state.from).format('DD/MM/YYYY')}  -  <FontAwesome name="calendar"/> {moment(this.state.from).add(this.state.plan.length-1,"days").format('DD/MM/YYYY')}</h4></div>
				<div><button className="btn btn-primary" onClick={this.saveFinalPlan}>Print&nbsp;<FontAwesome name="print" /></button></div>
				</div><hr style={{marginTop:"0px"}}/>
				<div className="finalPlan">
				<FinalPlanList date={this.state.from} plan={this.state.plan} />
				</div>
				</div>
				);
		}
	}


}


function _(id){
	return document.getElementById(id);
}

function mapStateToProps(state){ 
	return{
		plan: state.plan.plan
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPlan:fetchPlan},dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(UserPlan);

//UserPlan =connect()(UserPlan);


