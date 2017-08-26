import React,{Component} from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import { findDOMNode } from 'react-dom';
import axios from 'axios';


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

    this.state={
      distance:{},
      timeArrival:this.props.timeArrival
    }

		this.isDistanceTravel=this.isDistanceTravel.bind(this);
		this.isLunch=this.isLunch.bind(this);
		this.handleRemove=this.handleRemove.bind(this);

		this.renderOverlay=this.renderOverlay.bind(this);

    this.convertTime24to12=this.convertTime24to12.bind(this);

	}

  componentDidMount() {
    let loc1=this.props.place.name;
    let loc2=this.props.previous;
    axios.get("/home/getLocDistance?location1="+loc1+"&location2="+loc2)
      .then(res => {
        const distance = res.data;
        this.setState({ distance });
      });
  }

  componentWillReceiveProps(nextProps) {
    let loc1=nextProps.place.name;
    let loc2=nextProps.previous;
    axios.get("/home/getLocDistance?location1="+loc1+"&location2="+loc2)
      .then(res => {
        const distance = res.data;
        this.setState({ distance });
      });
      if(nextProps.timeArrival!==this.props.timeArrival){
        this.setState({timeArrival:nextProps.timeArrival})
      }
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
		this.props.removePlace(this.props.index,this.props.day);
	}

	isDistanceTravel(){
		if(this.props.previous===null)
			return false;
		else
			return true;
	}

    convertTime24to12(time24){
        let tmpArr = time24.split(':'), time12;
        if(parseInt(tmpArr[0]) == 12) {
        time12 = tmpArr[0] + ':' + tmpArr[1] + 'pm';
        } else {
        if(parseInt(tmpArr[0]) == 0) {
        time12 = '12:' + tmpArr[1] + 'am';
        } else {
        if(parseInt(tmpArr[0]) > 12) {
        time12 = (parseInt(tmpArr[0])-12) + ':' + tmpArr[1] + 'pm';
        } else {
        time12 = (tmpArr[0]) + ':' + tmpArr[1] + 'am';
        }
        }
      }
        return time12;
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
		return connectDragSource(connectDropTarget( <div className="row">
      <div className="col-lg-2 col-md-1"></div><div className="col-lg-10 col-md-11">
				{this.isDistanceTravel() && !this.isLunch() && <div className="vertical-row-parent" ><div className="vertical-row"></div><h5>Distance : {this.state.distance.distance} km</h5>&nbsp;&nbsp;<h5>Estimated Travel Time : {this.state.distance.duration}</h5></div>}
      </div>
      <div className="col-lg-1" style={{color:"#a9a9a9", position:"relative"}}><h6><i>{this.convertTime24to12(this.state.timeArrival)}</i></h6></div>
        <div className="col-lg-11">
        {!this.isLunch() && <div className="row planPlaces polaroid">
					<button onClick={this.handleRemove}></button>
						<div className="col-lg-4 col-md-4 col-sm-5">
							<img className="planImages" src={this.props.place.image} />
						</div>
            <div className="col-lg-1 col-md-1"></div>
						<div className="col-lg-7 col-md-7 col-sm-7">
								<h3>{this.props.place.name}</h3>
								<h6>Time Open : {this.props.place.timeOpen}</h6>
								<h6>Categories : {this.props.place.categories}</h6>
								<h6>Address : {this.props.place.address}</h6>
								<h6><a href="#" >More info...</a></h6>
						</div>
					</div>}
          </div>
          <div className="col-lg-3 col-md-2 col-sm-1"></div><div className="col-lg-9 col-md-10 col-sm-11">
					{this.isLunch() && <div style={{color:"#c0c0c0",marginLeft:"20px"}}><i><h3>Lunch Time</h3></i></div>}
					</div>
          </div>
			));


	}

}

PlanItem.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
    movePlace: PropTypes.func.isRequired,
  };