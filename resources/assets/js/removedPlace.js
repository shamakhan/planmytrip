import React,{Component} from 'react';

export default class RemovedPlace extends Component{
	render(){
		return(
			<div className="row" style={{width:"auto"}}>
			<div className="col-lg-3 col-md-4 col-sm-4" style={{height:"50px",width:"auto"}}>
			<img src={this.props.place.image} style={{width:"auto",height:"40px"}} />
			</div>
			<div className="col-lg-8 col-md-8 col-sm-8" style={{height:"50px",width:"auto"}}>
			<h6>{this.props.place.name}</h6>
			</div>	
			</div>
			);
	}

}