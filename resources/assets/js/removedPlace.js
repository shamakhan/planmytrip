import React,{Component} from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

const removePlaceSource = {

  beginDrag(props) {
    return {
    	place:props.place,
      id: props.place.id,
      index: props.index,
    };
  },
};

@DragSource("placeItem", removePlaceSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class RemovedPlace extends Component{
	constructor(props){
		super(props);

		this.handleClick=this.handleClick.bind(this);
	}

	handleClick(){
		this.props.onPlaceClick(this.props.place);
	}
	
	render(){

		    const {isDragging, connectDragSource} = this.props;
		return connectDragSource(
			<div className="row" style={{width:"auto"}} onClick={this.handleClick}>
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

RemovedPlace.propTypes = {
    movePlace: PropTypes.func.isRequired,
  };