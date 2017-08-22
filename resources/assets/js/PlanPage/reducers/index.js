import {combineReducers} from 'redux';

// import plan from './planReducers';

// export default combineReducers({
// 	plan : plan
// });

import UserList from './planReducers';
import testReducer from './testReducer';
import categories from './categoryReducer';

const allReducers=combineReducers({
	user:UserList,
	testUser:testReducer,
	categories: categories
});

export default allReducers;