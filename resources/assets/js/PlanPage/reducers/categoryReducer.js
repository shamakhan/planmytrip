export default function reducer(state = { 
	categories: [],
	fetching: false,
	fetched:false,
	error:null	
	 },action){
	switch(action.type){
		case "FETCH_CATEGORY":{
			return {...state, fetching:true}
		}
		case "FETCH_CATEGORY_FULFILLED":{
			return {...state, fetching:false, fetched:true, categories:action.payload}
		}
		case "FETCH_CATEGORY_REJECTED":{
			return {...state, fetching:false, error:action.payload}
		}
	}
	return state;

}