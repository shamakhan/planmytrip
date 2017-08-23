import React,{Component} from 'react';
import Category from './category';
import {fetchCategory} from './PlanPage/actions/planAction';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';


class categoryList extends Component {
	constructor(props){
		super(props);
		
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

	
	render(){
		let categoryItems;
	if(this.props.categories){

		categoryItems=this.props.categories.map( (category,i) => {
			return (
				<Category key={i}  category={category} index={i} setRate={this.props.setCategoryRates} />
				);
		} );
			}
		return ( <div>
				{categoryItems}
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

export default connect(mapStateToProps,mapDispatchToProps)(categoryList);