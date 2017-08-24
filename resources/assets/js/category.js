import React, {Component} from 'react';

class category extends Component{
	handleChange(event){
		const value=event.target.value;
		document.getElementById(this.props.category).innerHTML=value;
		this.props.setRate(value,this.props.category);
	}
	render() {
		return (
		 <div className="col-lg-4 col-md-6 col-sm-10" style={{marginBottom:"20px"}}> <h4>{this.props.category} : <span className="label label-primary" id={this.props.category}>50</span> </h4>
			<div ><input  name={this.props.index} className="mySlider form-control" style={{margin:"0"}} type="range" min="0" max="100" step="1" onChange={this.handleChange.bind(this)}/></div>
			
			</div>
			
			);
	}
}

export default category;