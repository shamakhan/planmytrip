import React, {Component} from 'react';

class MidParallax extends Component{
	render(){
		const styles={
			backgroundImage: "url('/images/travel4.jpeg')" 
		};
		return (
			    <div>
				<br/><br/>
			<div className="down-image down-text" style={styles}>
			<div className="row" >
			<div className="col-lg-6"></div>
			<div className="col-lg-6 ">
			<br/><br/>
			<h1>Tell us what you would like</h1> </div>
			</div>
			</div>
			</div>  

			);
	}

}

export default MidParallax;