import React, {Component} from 'react';
import CategoryList from './categoryList';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

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
						categoryRates:{"Family And Kids":1,"Leisure":1,"Religious Site":1,"Walking Area":1,"Entertainment":1,"Outdoors":1,"Landmark":1,"Historical Site":1},
						Cities:['mumbai','paris','newyork','london','dubai'],
						journeyDays:null,
						plan:[],
						from:null,
						to:null,
					};

					this.handleFromDateChange=this.handleFromDateChange.bind(this);
						this.handleToDateChange=this.handleToDateChange.bind(this);
					this.handleStateChange=this.handleStateChange.bind(this);
					this.journeyDays=this.journeyDays.bind(this);
					this.setCategoryRates=this.setCategoryRates.bind(this);

					this.handleSubmit=this.handleSubmit.bind(this);

					this.getRankedCategories=this.getRankedCategories.bind(this);
					this.getCategoryNames=this.getCategoryNames.bind(this);

					this.handleDisplay=this.handleDisplay.bind(this);
					// this.toggleCalendar=this.toggleCalendar.bind(this);

					this.generatePlanRender=this.generatePlanRender.bind(this);

					this.handleDayClick=this.handleDayClick.bind(this);
					this.handleResetClick=this.handleResetClick.bind(this);

					this.goBack=this.goBack.bind(this);

		}

		goBack(){
			this.setState({isGeneratingPlan:true});
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
		let keys=Object.keys(this.state.categoryRates);
		let arr=this.state.categoryRates;
		let temp={};
		for(let i=0;i<8;i++){
			temp[categoryList[i]]=arr[keys[i]];
		} 
		this.setState({categoryRates:temp});}

	handleSubmit(){
		//event.target.preventDefault();
		if(this.state.from && this.state.to && this.state.journeyDays){
			let topCategory=this.getRankedCategories();
			this.props.fetchPlan(this.state.city,topCategory,this.state.journeyDays);
		//this.handleDisplay(this.state.plan);
		}
		else{
			_("displayDayError").innerHTML="<h5 class='alert alert-warning'>Please select appropriate range.</h5>";
		}
	}

	handleDisplay(plan){

		const {isGeneratingPlan} =this.state;
		this.setState({isGeneratingPlan:!isGeneratingPlan});
		this.setState({plan:plan});
	}

	getRankedCategories(){
		let sortable=[];
		let arr=this.state.categoryRates;
		for(let cat in arr){
			if(arr[cat]>=6){
				sortable.push([cat,arr[cat]]);
			}
		}
		sortable.sort(function(a,b){
			return b[1]-a[1];
		});

		for(let i=0;i<sortable.length;i++){
			sortable[i]=sortable[i][0];
		}
		return sortable;


		// this.state.categoryRates.sort(function(a,b){return a[1]-b[1];});
		// 		console.log(this.state.categoryRates);
		// return 

	}

	setCategoryRates(rate,category){
		let temp=this.state.categoryRates;
		temp[category]=parseInt(rate);
		this.setState({categoryRates:temp});	}
	
	handleStateChange(event){
		const name=event.target.name;
		const value=event.target.value;
		if(name==='city'){
			this.setState({city:value})
		}}

	handleFromDateChange (date) {
		let arr=this.state.setDate;
		if((this.state.setDate.toDate.diff(date,'days'))<0){
			arr.fromDate=date;
			arr.toDate=date;
		}
		else{
				arr.fromDate=date;
			}
			this.setState({setDate: arr});
			this.journeyDays(arr.fromDate,arr.toDate);	
			}

	handleToDateChange (date) {
		let temparr=this.state.setDate;
		if((this.state.setDate.fromDate.diff(date,'days'))>0)
		{
			temparr.toDate=date;
			temparr.fromDate=date;
		}
		else{
				temparr.toDate=date;
			}
  		this.setState({setDate: temparr});
  		this.journeyDays(temparr.fromDate,temparr.toDate);
		}

	journeyDays(fromD,toD){
		let temp=toD.diff(fromD,'days')+1;
		this.setState({journeyDays:temp});
		}

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
				<select className="form-control" name="city" onChange={this.handleStateChange}> 
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
			<CategoryList setCategoryRates={this.setCategoryRates} getCategoryNames={this.getCategoryNames} city={this.state.city.toLowerCase()}/>
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
			            {' '}<a href="." onClick={this.handleResetClick}>Reset</a>
			          </p>}
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
			return (<div><div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<div  style={{height:"35px"}}><h3 >Your Plan</h3></div>
				<div><button className="btn btn-primary" style={{height:"35px"}} onClick={this.goBack}>Go Back</button>&nbsp;
				<button className="btn btn-primary" style={{height:"35px"}}>Explore</button></div></div><hr />
				<Plan places={this.state.plan} /></div>);
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


