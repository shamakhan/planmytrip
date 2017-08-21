import React, {Component} from 'react';
import CategoryList from './categoryList';
import {connect} from 'react-redux';
import {fetchPlan} from './actions/planAction';

// @connect((store) => {
// 	return {
// 		plan: store.plan.plan
// 	}
// })

export default class UserPlan extends Component{
	
	// componentWillMount(){
	// 	this.props.dispatch(fetchPlan());
	// }


constructor(props){
	super(props);
	this.state={
		mySlider:0,
		userName:((document.getElementById('userName').innerHTML).toUpperCase()),
		city:'Mumbai',
		Categories:{
			Mumbai:["Beach","Historical","Family","Temples"],
			Paris:["Historical","Museums","Architectural"],
			London:["Sites","Museums","Historical"],
			NewYork:["Historical","Beach","Clubs"]

		}
		
	}

	this.handleChange=this.handleChange.bind(this);
	this.displayCategories=this.displayCategories.bind(this);
	this.returnSlider=this.returnSlider.bind(this);
}


	

	handleChange(event){
		const name=event.target.name;
		const value=event.target.value;
		if(name==='city'){
			this.setState({city:value})
			//document.getElementById('categoriesSlider').innerHTML=<CategoryList categories={this.state.Categories[value]} />
			//this.displayCategories(value);
		}
	}

	returnSlider(category){
		return ;
	}

	displayCategories(val){
		console.log(val);
		const l=this.state.Categories[val].length;
		console.log(this.state.Categories[val][0]);

	}

	render() {
		return (
			<div>
			<h5>Hello  {this.state.userName}</h5><hr /> 
			<form className="form-horizontal">
			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="city">Select a city:</label>
			<div className="col-sm-6">
				<select className="form-control" name="city" onChange={this.handleChange}> 
					<option value="Mumbai">Mumbai</option>
					<option value="Paris">Paris</option>
					<option value="London">London</option>
					<option value="NewYork">New York</option>
				</select>
			</div>
			</div>

			<div className="form-group">
			<label className="control-label col-sm-4" htmlFor="mySlider">Please rate the categories to get your plan.</label>
			<div className="col-sm-8">
				<div className="row">
			<CategoryList categories={this.state.Categories[this.state.city]} />
			</div>
			</div>
			</div>
			
			</form>
			</div>
			);

	}


} 
