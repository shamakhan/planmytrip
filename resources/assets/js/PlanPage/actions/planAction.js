import axios from 'axios';

export function fetchPlan(city,topCategories,days){
	let temp=encodeURIComponent(JSON.stringify(topCategories));
	return function(dispatch){
		axios.get("/home/plan?city="+city+"&topCategories="+temp+"&days="+days)
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

export function fetchLocThumbnail(city){
	return function(dispatch){
		axios.get("/getLocThumbnails?city="+city)
		.then((response) => {
			dispatch({type:"FETCH_LOCATIONTHUMBNAILS_FULFILLED", payload:response.data});
		})
		.catch((err) => {
			dispatch({type:"FETCH_LOCATIONTHUMBNAILS_REJECTED",payload:err});
		})
	}
}

export function fetchCityThumbnail(){
	return function(dispatch){
		axios.get("/getCityThumbnails")
		.then((response) => {
			dispatch({type:"FETCH_CITYTHUMBNAILS_FULFILLED", payload:response.data});
		})
		.catch((err) => {
			dispatch({type:"FETCH_CITYTHUMBNAILS_REJECTED",payload:err});
		})
	}
}