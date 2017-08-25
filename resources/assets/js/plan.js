import React,{Component} from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import { findDOMNode } from 'react-dom';


const placeSource = {
  beginDrag(props) {
    return {
    	place:props.place,
      id: props.id,
      index: props.index,
    };
  },
};

const placeTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return; }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;    }

    // Time to actually perform the action
    props.movePlace(dragIndex, hoverIndex,monitor.getItem().place);
    monitor.getItem().index = hoverIndex;
  },
};

@DropTarget("placeItem", placeTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource("placeItem", placeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class PlanItem extends Component{

	constructor(props){
		super(props);
		this.distanceTravel=this.distanceTravel.bind(this);
		this.isLunch=this.isLunch.bind(this);
		this.handleRemove=this.handleRemove.bind(this);

		this.renderOverlay=this.renderOverlay.bind(this);

	}

	renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
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
		    const {isDragging, connectDragSource, connectDropTarget } = this.props;
		    const opacity = isDragging ? 0.5 : 1;
		return connectDragSource(connectDropTarget( <div>

				{this.distanceTravel() && !this.isLunch() && <div style={{display:"block"}} ><div className="vertical-row"><h5>{this.props.place.ditanceTravel}km</h5></div></div>}
				{!this.isLunch() && <div className="row planPlaces polaroid">
					<button onClick={this.handleRemove}></button>
						<div className="col-lg-4 col-md-4 col-sm-5">
							<img className="planImages" src={this.props.place.image} />
						</div>
						<div className="col-lg-8 col-md-8 col-sm-7">
								<h3>{this.props.place.name}</h3>
								<h6>Time Open : {this.props.place.timeOpen}</h6>
								<h6>Categories : {this.props.place.categories}</h6>
								<h6>Address : {this.props.place.address}</h6>
								<h6><a href="#" >More info...</a></h6>
						</div>
					</div>}
					{this.isLunch() && <div><i><h3>Lunch Time</h3></i></div>}
					</div>
			));


	}

}

PlanItem.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
    movePlace: PropTypes.func.isRequired,
  };