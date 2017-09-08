import React, {PropTypes} from "react";
import {Component} from "react";
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";

import iconMarker from "./iconMarker.svg";
import iconMarkerHover from "./iconMarkerHover.svg";

//require("https://maps.googleapis.com/maps/api/js?key=AIzaSyAbSvTtVYjuyn4aHvbEbrT5Ww77QqZw1ow");

const MY_API_KEY = "AIzaSyAiaFL-1gsQ_8wJyAoHKYfLtUKpY1OD3zM"; // fake

class Map extends Component{
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.props.locations !== nextProps.locations || this.props.googleMaps!==nextProps.googleMaps;

  }

	render() {
		const {googleMaps} = this.props;

		const directionsService = new googleMaps.DirectionsService;
		const directionsDisplay = new googleMaps.DirectionsRenderer;
		directionsDisplay.setMap(null);
		let coordinatesArray=[];
		let xyz=[];

		for (let i = 0 ; i < this.props.locations.length; i++) {
			if(this.props.locations[i].name=="lunch")
				continue;
			let contentString = this.props.locations[i].name+"";
			let currentCoordinates = {
				lat: parseFloat(this.props.locations[i].latitude),
				lng: parseFloat(this.props.locations[i].longitude)
			}
			let x = null;
			coordinatesArray.push(currentCoordinates);
			if (this.props.listType=="DAYPLAN") {
				x = {
		          title: this.props.locations[i].name,
		          
		          position: {
		            lat: parseFloat(this.props.locations[i].latitude),
		            lng: parseFloat(this.props.locations[i].longitude),
		          },
		          onLoaded: (googleMaps, map, marker) => { 
		            // Set Marker animation
		            marker.setAnimation(googleMaps.Animation.DROP)



		            if (true) {
		            	//Directions
			            
			            
			            let waypts=[];
			            for (let j = 1; j < this.props.locations.length-1; j++) {
			            	
			            	waypts.push({
			            		location: {
			            			lat: parseFloat(this.props.locations[j].latitude),
		            				lng: parseFloat(this.props.locations[j].longitude)
			            		},
			            		stopover: true
			            	});
			            }

			            
			           	 directionsService.route({
				          origin: {lat: parseFloat(this.props.locations[0].latitude),
		            				lng: parseFloat(this.props.locations[0].longitude)},
				          destination: {lat: parseFloat(this.props.locations[
				          					this.props.locations.length-1
				          					].latitude),
		            					lng: parseFloat(this.props.locations[
		            						this.props.locations.length-1
		            						].longitude)},
		            		waypoints: waypts,
		            		
				          travelMode: 'DRIVING'
				        }, function(response, status) {
				          if (status === 'OK') {
				          	
				            directionsDisplay.setDirections(response);
				          } else {
				            window.alert('Directions request failed due to ' + status);
				          }
				        });
			            directionsDisplay.setMap(map);
		            }
		            

		            // Open InfoWindow directly
		            //infoWindow.open(map, marker)

		          },
		        };
			}else{
				x = {
		          title: this.props.locations[i].name,
		          icon: iconMarker,
		          position: {
		            lat: parseFloat(this.props.locations[i].latitude),
		            lng: parseFloat(this.props.locations[i].longitude),
		          },
		          onLoaded: (googleMaps, map, marker) => {
		            // Set Marker animation
		            marker.setAnimation(googleMaps.Animation.DROP)

		            // Define Marker InfoWindow
		            const infoWindow = new googleMaps.InfoWindow({
		              content: contentString,
		            })

		            // Open InfoWindow when Marker will be clicked
		            googleMaps.event.addListener(marker, "click", () => {
		              infoWindow.open(map, marker)
		            })

		            // Change icon when Marker will be hovered
		            googleMaps.event.addListener(marker, "mouseover", () => {
		              marker.setIcon(iconMarkerHover)
		            })

		            googleMaps.event.addListener(marker, "mouseout", () => {
		              marker.setIcon(iconMarker)
		            })

		            // Open InfoWindow directly
		            //infoWindow.open(map, marker)

		          },
		        }; 
			}
			
		    
			xyz.push(x);


		}

	

		return (
	  // GoogleMap component has a 100% height style.
	  // You have to set the DOM parent height.
	  // So you can perfectly handle responsive with differents heights.

		  <div>
			  <div className="map" style={{height:"400px"}} id="map">
			    <GoogleMap
			      googleMaps={googleMaps}
			      // You can add and remove coordinates on the fly.
			      // The map will rerender new markers and remove the old ones.
			      coordinates={xyz}
			      center={{lat: parseFloat(this.props.locations[0].latitude), lng: parseFloat(this.props.locations[0].longitude)}}
			      zoom={8}
			      onLoaded={(googleMaps, map) => {
			        map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
			      }}
			    />
			  </div>
		  </div>
		);
	}
}


Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY,
})