import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';


class category extends Component{
	constructor(){
		super();

		this.state={
			rating:1
		};
	}

	handleChange(event){
		const value=event.target.value;
		document.getElementById(this.props.category).innerHTML=value;
		this.props.setRate(value,this.props.category);
	}

	onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.props.setRate(nextValue,this.props.category);
    }

	render() {
		const {rating} =this.state;
		return (
		 <div className="col-lg-3 col-md-4 col-sm-6" style={{marginBottom:"20px"}}> <h5>{this.props.category} :</h5>
			<div >
			<StarRatingComponent 
                    name={this.props.index.toString()} 
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
			</div>
			
			</div>
			
			);
	}
}

export default category;