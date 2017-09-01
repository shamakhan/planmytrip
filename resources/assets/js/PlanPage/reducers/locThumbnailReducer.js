export default function reducer(state = { 
	locThumbnails: [],
	fetching: false,
	fetched:false,
	error:null	
	 },action){
	switch(action.type){
		case "FETCH_LOCATIONTHUMBNAILS":{
			return {...state, fetching:true}
		}
		case "FETCH_LOCATIONTHUMBNAILS_FULFILLED":{
			return {...state, fetching:false, fetched:true, locThumbnails:action.payload}
		}
		case "FETCH_LOCATIONTHUMBNAILS_REJECTED":{
			return {...state, fetching:false, error:action.payload}
		}
	}
	return state;

}