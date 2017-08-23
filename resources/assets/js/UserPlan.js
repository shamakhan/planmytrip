import React, {Component} from 'react';
import CategoryList from './categoryList';
import {fetchPlan} from './PlanPage/actions/planAction';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';



//require('bootstrap-datetime-picker/js/bootstrap-datetimepicker.js');

class UserPlan extends Component{
	
	// componentWillMount(){
	// 	this.props.dispatch(fetchPlan());
	// }


constructor(props){
	super(props);
	this.state={
		setDate:{fromDate:moment(),toDate:moment().add(1,"days")},
		mySlider:0,
		userName:((_('userName').innerHTML).toUpperCase()),
		city:'Mumbai',
		Categories:['mumbai','paris','newyork','london','dubai'],
		journeydays:2
		
	}

	this.handleFromDateChange=this.handleFromDateChange.bind(this);
		this.handleToDateChange=this.handleToDateChange.bind(this);
	this.handleStateChange=this.handleStateChange.bind(this);
	this.journeyDays=this.journeyDays.bind(this);
	// this.toggleCalendar=this.toggleCalendar.bind(this);
}


	

	handleStateChange(event){
		const name=event.target.name;
		const value=event.target.value;
		if(name==='city'){
			this.setState({city:value})
		}

	}

	handleFromDateChange (date) {

		let arr=this.state.setDate;
			if((this.state.setDate.toDate.diff(date,'days'))<0){
				arr.fromDate=this.state.setDate.toDate;
				arr.toDate=date;
			}
			else{
		arr.fromDate=date;
	}
  this.setState({setDate: arr});
  this.journeyDays(arr.fromDate,arr.toDate);
}
handleToDateChange (date) {
			let arr=this.state.setDate;
	if((this.state.setDate.fromDate.diff(date,'days'))>0)
	{
		arr.toDate=this.state.setDate.fromDate;
		arr.fromDate=date;
	}
	else{
		arr.toDate=date;
	}
  this.setState({setDate: arr});
  this.journeyDays(arr.fromDate,arr.toDate);
}
// toggleCalendar (e) {
//   e && e.preventDefault()
//   this.setState({isOpen: !this.state.isOpen})
// }
journeyDays(fromD,toD){
	let temp=toD.diff(fromD,'days')+1;
	this.setState({journeydays:temp});

}

	render() {
		// const props= this.props;
		// const {store} = this.context;
		// const state=store.getState();

		return (
			<div>
			<h3>Hello  {this.state.userName}</h3><hr /> 
			<h4>Let's make your plan :</h4>
			<h6>Select Appropriate choices</h6>
			<div className="row">
			<div className="col-sm-9 col-lg-9 col-md-9">
			<form className="form-horizontal">
			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="city">City :</label>
			<div className="col-sm-6 col-lg-4 col-md-5">
				<select className="form-control" name="city" onChange={this.handleStateChange}> 
					<option value="Mumbai">Mumbai</option>
					<option value="Paris">Paris</option>
					<option value="London">London</option>
					<option value="NewYork">New York</option>
					<option value="Dubai">Dubai</option>
				</select>
			</div>
			</div>

			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="mySlider">Rate Categories :</label>
			<div className="col-sm-8">
				<div className="row">
			<CategoryList city={this.state.city.toLowerCase()}/>
			</div>
			</div>
			</div>
<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="mySlider">Journey Duration :</label>		

			<div className="col-lg-8 col-sm-8">
			<div className="row">
			<div style={{display:"block"}} className="col-sm-4 col-md-4 col-lg-4">
			<div style={{display:"inline"}}><span>From :</span></div>				
			<div style={{display:"inline"}}><DatePicker id="fromDate" dateFormat="DD/MM/YYYY" selectsStart selected={this.state.setDate.fromDate}  startDate={this.state.setDate.fromDate}
    endDate={this.state.setDate.toDate} onChange={this.handleFromDateChange} /></div>
			</div>
			<div className="col-sm-4 col-md-4 col-lg-4">
			<div style={{display:"inline"}}><span>To :</span></div>
			<div style={{display:"inline"}}><DatePicker id="toDate" dateFormat="DD/MM/YYYY" selectsEnd selected={this.state.setDate.toDate}  startDate={this.state.setDate.fromDate}
    endDate={this.state.setDate.toDate} onChange={this.handleToDateChange} /></div>

			</div><div className="col-sm-2"><h3><span className='label label-primary'>{this.state.journeydays} days</span></h3></div>
			</div>
			</div>

			</div>
			<div className="row">
				<div className="col-lg-4 col-sm-4 col-md-4"></div>
				<div className="col-lg-8 col-sm-8 col-md-8 text-center">
				<input type="submit" className="btn btn-primary" value="Generate Plan!"/>
				<br />
				</div>
			</div> 

			
			</form>
			</div>
			</div>
			</div>
			);

	}


}


function _(id){
	return document.getElementById(id);
}

export default UserPlan;

//UserPlan =connect()(UserPlan);


