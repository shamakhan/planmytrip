import axios from 'axios';

export function fetchPlan(city,topCategories,days){
	return function(dispatch){
		axios.get("/home/plan?city="+city+"&topCategories="+topCategories+"&days="+days)
		.then((response) => {
			dispatch({type:"FETCH_PLAN_FULFILLED", payload:response.data});
		})
		.catch((err) => {
			dispatch({type:"FETCH_PLAN_REJECTED", payload:err});
		})
	}
}

export function testAction(user){
	console.log("You clicked on :",user.name);
	return{
		type:"USER",
		payload:user
	}
}

export function fetchCategory(city){
	return function(dispatch){
		axios.get("/home/getCategories?city="+city)
		.then((response) => {
			dispatch({type:"FETCH_CATEGORY_FULFILLED", payload:response.data});
		})
		.catch((err) => {
			dispatch({type:"FETCH_CATEGORY_REJECTED",payload:err});
		})
	}
}