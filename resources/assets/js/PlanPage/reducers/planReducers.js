export default function reducer(state = { 
	plan: [],
	fetching: false,
	fetched:false,
	error:null	
	 },action){
	switch(action.type){
		case "FETCH_PLAN":{
			return {...state, fetching:true}
		}
		case "FETCH_PLAN_FULFILLED":{
			return {...state, fetching:false, fetched:true, plan:action.payload}
		}
		case "FETCH_PLAN_REJECTED":{
			return {...state, fetching:false, error:action.payload}
		}
	}
	return state;

}


// export default function(){
// return [
// 		{
// 			id: 1,
// 			name: "shama",
// 			age: 22
// 		},
// 		{
// 			id:2,
// 			name: "mithil",
// 			age:22
// 		}
// 		]

// }