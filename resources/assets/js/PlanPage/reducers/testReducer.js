export default function(state=null,action){
	switch(action.type){
		case 'USER':
			return action.payload;
			break;

	}
	return state;

}