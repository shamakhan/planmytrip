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
		Categories:['mumbai','paris','newyork','london','dubai']
		
	}

	this.handleFromDateChange=this.handleFromDateChange.bind(this);
		this.handleToDateChange=this.handleToDateChange.bind(this);
	this.handleStateChange=this.handleStateChange.bind(this);
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
}
// toggleCalendar (e) {
//   e && e.preventDefault()
//   this.setState({isOpen: !this.state.isOpen})
// }

	render() {
		// const props= this.props;
		// const {store} = this.context;
		// const state=store.getState();

		return (
			<div>
			<h5>Hello  {this.state.userName}</h5><hr /> 

			<div className="row">
			<div className="col-lg-8">
			<h2>Make your plan :</h2>
			<form className="form-horizontal">
			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="city">City :</label>
			<div className="col-sm-6">
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
			<label className="control-label col-sm-4" htmlFor="mySlider">Please rate the categories to get your plan :</label>
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
			<div style={{display:"block"}} className="col-sm-5 col-lg-5">
			<div style={{display:"inline"}}><span>From :</span></div>				
			<div style={{display:"inline"}}><DatePicker id="fromDate" dateFormat="DD/MM/YYYY" selectsStart selected={this.state.setDate.fromDate}  startDate={this.state.setDate.fromDate}
    endDate={this.state.setDate.toDate} onChange={this.handleFromDateChange} /></div>
			</div>
			<div className="col-sm-5">
			<div style={{display:"inline"}}><span>To :</span></div>
			<div style={{display:"inline"}}><DatePicker id="toDate" dateFormat="DD/MM/YYYY" selectsEnd selected={this.state.setDate.toDate}  startDate={this.state.setDate.fromDate}
    endDate={this.state.setDate.toDate} onChange={this.handleToDateChange} /></div>

			</div>
			</div>
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


