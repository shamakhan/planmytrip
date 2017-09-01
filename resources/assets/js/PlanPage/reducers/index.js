import {combineReducers} from 'redux';

// import plan from './planReducers';

// export default combineReducers({
// 	plan : plan
// });

import plan from './planReducers';
import testReducer from './testReducer';
import categories from './categoryReducer';
import locThumbnails from './locThumbnailReducer';

const allReducers=combineReducers({
	plan:plan,
	testUser:testReducer,
	categories: categories,
	locThumbnails:locThumbnails,
});

export default allReducers;