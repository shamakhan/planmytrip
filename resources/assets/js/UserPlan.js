import React, {Component} from 'react';
import CategoryList from './categoryList';
import PropTypes from 'prop-types';

import DayPicker, { DateUtils } from 'react-day-picker';

import moment from 'moment';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlan} from './PlanPage/actions/planAction';

import Plan from './planList';




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

		goBack(){
			this.setState({isGeneratingPlan:true});
			this.setState({city:'mumbai'});
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

	// getRankedCategories(){
	// 	let sortable=[];
	// 	let arr=this.state.categoryRates;
	// 	for(let cat in arr){
	// 		if(arr[cat]>=6){
	// 			sortable.push([cat,arr[cat]]);
	// 		}
	// 	}
	// 	sortable.sort(function(a,b){
	// 		return b[1]-a[1];
	// 	});


	// 	for(let i=0;i<sortable.length;i++){
	// 		sortable[i]=sortable[i][0];
	// 	}
	// 	return sortable;

	// }

	// setCategoryRates(rate,category){
	// 	let temp=this.state.categoryRates;
	// 	temp[category]=parseInt(rate);
	// 	this.setState({categoryRates:temp});	}
	
	handleCityChange(event){
		const value=event.target.value;
			this.setState({city:value})
		}

	// handleFromDateChange (date) {
	// 	let arr=this.state.setDate;
	// 	if((this.state.setDate.toDate.diff(date,'days'))<0){
	// 		arr.fromDate=date;
	// 		arr.toDate=date;
	// 	}
	// 	else{
	// 			arr.fromDate=date;
	// 		}
	// 		this.setState({setDate: arr});
	// 		this.journeyDays(arr.fromDate,arr.toDate);	
	// 		}

	// handleToDateChange (date) {
	// 	let temparr=this.state.setDate;
	// 	if((this.state.setDate.fromDate.diff(date,'days'))>0)
	// 	{
	// 		temparr.toDate=date;
	// 		temparr.fromDate=date;
	// 	}
	// 	else{
	// 			temparr.toDate=date;
	// 		}
 //  		this.setState({setDate: temparr});
 //  		this.journeyDays(temparr.fromDate,temparr.toDate);
	// 	}

	// journeyDays(fromD,toD){
	// 	let temp=toD.diff(fromD,'days')+1;
	// 	this.setState({journeyDays:temp});
	// 	}

	componentWillReceiveProps(nextProps){
				const newPlan=nextProps.plan;
				if(newPlan !== this.props.plan){
					this.setState({plan:newPlan});
					this.handleDisplay(newPlan);

				}
				}

	generatePlanRender(){

		const { from, to } = this.state;
		return (
				<div>
				<div style={{display:"block"}}><button className="btn btn-primary" style={{float:"right",display:"inline"}}>Explore</button></div>
<br/>
				<hr /> 
			<h4>Let's make your plan :</h4>
			<h6>Select Appropriate choices</h6>
			<div className="row">
			<div className="col-sm-9 col-lg-12 col-md-9">
			<form className="form-horizontal">
			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="city">City :</label>
			<div className="col-sm-6 col-lg-4 col-md-5">
				<select className="form-control" name="city" onChange={this.handleCityChange}> 
					<option value="mumbai">Mumbai</option>
					<option value="paris">Paris</option>
					<option value="london">London</option>
					<option value="newyork">New York</option>
					<option value="dubai">Dubai</option>
				</select>
			</div>
			</div>

			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="mySlider">Rate Categories :</label>
			<div className="col-sm-8">
				<div className="row">
			<CategoryList getCategoryNames={this.getCategoryNames}	addRemoveCategory={this.addRemoveCategories} city={this.state.city.toLowerCase()}/>
			</div>
			</div>
			</div>
			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="mySlider">Journey Duration :</label>		

			<div className="col-lg-8 col-sm-8">
						
						<div className="RangeExample">
			        {!from && !to && <p>Please select the <strong>first day</strong>.</p>}
			        {from && !to && <p>Please select the <strong>last day</strong>.</p>}
			        {from &&
			          to &&
			          <p>
			            You chose from
			            {' '}
			            {moment(from).format('L')}
			            {' '}
			            to
			            {' '}
			            {moment(to).format('L')}
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

		if(this.state.plan===[] || this.state.isGeneratingPlan){
			return this.generatePlanRender();
		}
		else{
			return (<div><div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
				<button className="btn btn-primary" onClick={this.goBack}>Go Back</button>
				<div  ><h2 >Your Plan</h2></div>
				<button className="btn btn-primary" >Explore</button></div><hr style={{marginTop:"0px"}}/>
				<Plan places={this.state.plan} fromDate={this.state.from} remaining={this.state.remaining} city={this.state.city} journeyDays={this.state.journeyDays} categories={this.state.categories} selectedCategories={this.state.selectedCategories}/></div>);
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


