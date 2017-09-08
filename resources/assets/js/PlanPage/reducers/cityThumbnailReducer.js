export default function reducer(state = { 
	cityThumbnails: [],
	fetching: false,
	fetched:false,
	error:null	
	 },action){
	switch(action.type){
		case "FETCH_CITYTHUMBNAILS":{
			return {...state, fetching:true}
		}
		case "FETCH_CITYTHUMBNAILS_FULFILLED":{
			return {...state, fetching:false, fetched:true, cityThumbnails:action.payload}
		}
		case "FETCH_CITYTHUMBNAILS_REJECTED":{
			return {...state, fetching:false, error:action.payload}
		}
	}
	return state;

}