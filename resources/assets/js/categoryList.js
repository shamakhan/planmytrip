import React,{Component} from 'react';
import Category from './category';
import {fetchCategory} from './PlanPage/actions/planAction';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';


class categoryList extends Component {
	constructor(props){
		super(props);
		this.state={
			catRates:{1:50,2:50,3:50,4:50,5:50,6:50,7:50,8:50}
		}
		this.setCategoryRate=this.setCategoryRate.bind(this);
	}

	

	setCategoryRate(rate,i){
		let temp=this.state.catRates;
		temp[i]=parseInt(rate);
		this.setState({catRates:temp});
	}

	componentWillMount(){
		this.props.dispatch(fetchCategory(this.props.city));
		console.log(this.state.catRates);
	}
	componentWillUpdate(nextProps, nextState){
		if(nextProps.city!==this.props.city){
		this.props.dispatch(fetchCategory(nextProps.city));

	}
	console.log(this.state.catRates);
	}

	
	render(){
		let categoryItems;
	if(this.props.categories){
		categoryItems=this.props.categories.map( (category,i) => {
			return (
				<Category key={i}  category={category} index={i} setRate={this.setCategoryRate}/>
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

export default connect(mapStateToProps)(categoryList);