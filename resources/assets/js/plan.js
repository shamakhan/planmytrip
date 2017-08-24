import React,{Component} from 'react';

export default class PlanItem extends Component{
	constructor(props){
		super(props);
		this.distanceTravel=this.distanceTravel.bind(this);
		this.isLunch=this.isLunch.bind(this);
		this.handleRemove=this.handleRemove.bind(this);

	}

	handleRemove(event){
		//console.log("click");
		this.props.removePlace(this.props.index,this.props.day);
	}

	distanceTravel(){
		if(this.props.place.ditanceTravel>0)
			return true;
		else
			return false;
	}

	isLunch(){
		if(this.props.place.name==="lunch")
			return true;
		else
			return false;
	}

	render(){
		return (<div>

				{this.distanceTravel() && !this.isLunch() && <div style={{display:"block"}} ><div className="vertical-row"><h5>{this.props.place.ditanceTravel}km</h5></div></div>}
				{!this.isLunch() && <div className="row planPlaces polaroid">
					<button onClick={this.handleRemove}></button>
						<div className="col-lg-4 col-md-4 col-sm-5">
							<div>
							<img className="planImages" src={this.props.place.image} />
							</div>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-7">
								<h2>{this.props.place.name}</h2>
								<h6>Time Open : {this.props.place.timeOpen}</h6>
								<h6>Categories : {this.props.place.categories}</h6>
								<h6>Address : {this.props.place.address}</h6>
								<h6><a href="#" >More info...</a></h6>
						</div>
					</div>}
					{this.isLunch() && <div><i><h3>Lunch Time</h3></i></div>}
					</div>
			);


	}

}