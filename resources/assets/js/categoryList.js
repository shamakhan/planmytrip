import React,{Component} from 'react';
import Category from './category';
import {fetchCategory} from './PlanPage/actions/planAction';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';


class categoryList extends Component {

	componentWillMount(){
		this.props.dispatch(fetchCategory(this.props.city));
	}
	componentWillUpdate(nextProps, nextState){
		if(nextProps.city!==this.props.city){
		this.props.dispatch(fetchCategory(this.props.city));
	}
	}

	
	render(){
		let categoryItems;
	if(this.props.categories){
		categoryItems=this.props.categories.map( (category,i) => {
			return (
				<Category key={i}  category={category} index={i}/>
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