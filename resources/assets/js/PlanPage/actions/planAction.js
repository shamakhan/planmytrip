import axios from 'axios';

export function fetchPlan(){
	return function(dispatch){
		axios.get("/generateplan")
		.then((response) => {
			dispatch({type:"FETCH_PLAN_FULFILLED", payload:response.data});
		})
		.catch((err) => {
			dispatch({type:"FETCH_PLAN_REJECTED", payload:err});
		})
	}
}