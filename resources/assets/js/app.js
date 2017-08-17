import React,{ Component } from 'react';
import DownInfo from './components/downInfo';
import PlacePictures from './components/PlacePictures';
import MidParallax from './components/MidParallax';

require('bootstrap-sass/assets/javascripts/bootstrap.min.js');

class App extends Component {

	render(){
		return (
			<div className="App">
				<PlacePictures />
				<MidParallax />
				<DownInfo /> 
			</div>

			);
	} 
}

export default App;