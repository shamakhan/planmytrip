import React, { Component } from 'react';

class PlacePictures extends Component{
	render(){
		
		const author={
			float : "right"
		};
			return (
			<div className="container text-center info-mid">
	   			<blockquote className="quote">
	   			<i>Traveling – it leaves you speechless, then turns you into a storyteller.</i>
	   			<br/>
	   			<p style={author}>-Ibn Battuta</p>
	   			</blockquote>
				<br/>
				<div className="row">
				<div className="container text-center">
	    		<h1 >Choose from 100s of places</h1>
	    		<br/>
	    		</div>
	    		<div className="col-lg-4 col-sm-6 place1">
	    		<div className="polaroid">
				<img className="place-images" src={'/images/eiffel.jpg'} />
	    		<div className="polaroid-text">
	    		<h4>PARIS</h4>
	    		</div>
	    		</div>
	    		</div>
	    		<div className="col-lg-4 col-sm-6 text-center place2">
	    		<div className="polaroid">
				<img className="place-images" src={'/images/tajmahal.png'} />
	    		<div className="polaroid-text">
	    		<h4>INDIA</h4>
	    		</div>
	    		</div>
	    		</div>
	    		<div className="col-lg-4 col-sm-6 text-center place3">
	    		<div className="polaroid">
				<img className="place-images" src={'/images/london.jpg'} />
	    		  <div className="polaroid-text">
	    		 <h4>LONDON</h4>
	    		 </div>
	    		 </div>
	    		</div>
	    		</div>
    		</div>

			);
	}


}

export default PlacePictures;