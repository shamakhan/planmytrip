import React,{ Component } from 'react';
import DownInfo from './components/downInfo';
import PlacePictures from './components/PlacePictures';
import MidParallax from './components/MidParallax';
import DownImage from './components/DownImage';
import HeaderSection from './components/HeaderSection';

require('bootstrap-sass/assets/javascripts/bootstrap.min.js');

class App extends Component {

	render(){
		return (
			<div>
			<HeaderSection />
			<br/>
				<PlacePictures />
				<MidParallax />
				<DownInfo /> 
				<DownImage />
			</div>

			);
	} 
}

export default App;