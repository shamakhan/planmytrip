import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {testAction} from './PlanPage/actions/planAction';
import {connect} from 'react-redux';

class testUser extends Component{
	createListItems(){
		return this.props.user.map((u)=>{
			return (
				<li key={u.id}

				onClick={() => this.props.testAction(u)}
				>{u.name} {u.age}</li>
				);
		});
	}

	render(){
		return (<ul>
			{this.createListItems()}
			</ul>
			);
		}
	}


function mapStateToProps(state){
	return {
		user:state.user
	};
}

function mapDispatchToProps(dispatch){
	return	bindActionCreators({testAction:testAction},dispatch)
	
}

export default connect(mapStateToProps,mapDispatchToProps)(testUser);