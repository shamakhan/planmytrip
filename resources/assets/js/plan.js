import React,{Component} from 'react';

export default class PlanItem extends Component{

	render(){
		return (
					<div className="row planPlaces polaroid">
					<a href="#" className="x">X</a>
						<div className="col-lg-4">
							<div>
							<img className="planImages" src={this.props.place.image} />
							</div>
						</div>
						<div className="col-lg-8">
								<h2>{this.props.place.name}</h2>
								<h6>Time Open : {this.props.place.timeOpen}</h6>
								<h6>Categories : {this.props.place.categories}</h6>
								<h6>Address : {this.props.place.address}</h6>
						</div>
					</div>
			);


	}

}