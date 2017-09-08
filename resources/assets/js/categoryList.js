import React,{Component} from 'react';
import Category from './category';
import {fetchCategory} from './PlanPage/actions/planAction';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';


class CategoryList extends Component {
	constructor(props){
		super(props);
		this.handleCategoryClick=this.handleCategoryClick.bind(this);
		this.getCategoriesList=this.getCategoriesList.bind(this);
	}

	handleCategoryClick(event){
		event.preventDefault();
		let targetCat=event.target;
		let category=targetCat.innerHTML;
		//console.log(category);
		if(targetCat.classList.contains("active")){
			targetCat.classList.remove("active");
			targetCat.classList.remove("btn-info");
			targetCat.classList.add("btn-default");
			this.props.addRemoveCategory(category,"remove");
		}
		else{
			targetCat.classList.remove("btn-default");
			targetCat.classList.add("active");
			targetCat.classList.add("btn-info");
			this.props.addRemoveCategory(category,"add");
		}
	}
	

	// setCategoryRate(rate,i){
	// 	let temp=this.state.catRates;
	// 	temp[i]=parseInt(rate);
	// 	this.setState({catRates:temp});
	// 	this.props.getCategoryRates(this.state.catRates);
	// }

	componentWillMount(){
		this.props.fetchCategory(this.props.city);
		
	}

	componentWillUpdate(nextProps, nextState){
		if(nextProps.city!==this.props.city){
		this.props.fetchCategory(nextProps.city);

		//this.props.getCategoryNames(nextProps.categories);
	}
	}

	componentWillReceiveProps(nextProps){
		const newValue=nextProps.categories;
		if(newValue !== this.props.categories){
			this.props.getCategoryNames(newValue);
		}
	}

	getCategoriesList(){
		let categoryList;
	if(this.props.categories){

		categoryList=this.props.categories.map((category,i) =>{
			return (
					<span key={i}><button className="btn btn-sm btn-default" onClick={this.handleCategoryClick} style={{marginBottom:"8px"}}>{category}</button>&nbsp;&nbsp;</span>
				);
		})

			}
			return (<div>{categoryList}</div>);
	}

	
	render(){
		
		return (
				<div style={{width:"80%"}}>
			{this.getCategoriesList()}
			</div>
			);
	}


}

function mapStateToProps(state){
	return{
		categories : state.categories.categories
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCategory:fetchCategory},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);