import React, {Component} from 'react';

class category extends Component{
	handleChange(event){
		const value=event.target.value;
		document.getElementById(this.props.category).innerHTML=value;
	}
	render() {
		return (
		 <div className="col-lg-6 col-md-6 col-sm-8"> <h4>{this.props.category} : <span className="label label-default" id={this.props.category}>50</span> </h4>
			<div ><input  name={this.props.category} className="mySlider form-control" style={{margin:"0"}} type="range" min="0" max="100" step="1" onChange={this.handleChange.bind(this)}/></div>
			
			<br />
			</div>
			
			);
	}
}

export default category;