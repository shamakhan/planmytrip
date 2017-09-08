import React,{Component} from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import { findDOMNode } from 'react-dom';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';


const placeSource = {
  beginDrag(props) {
    return {
    	place:props.place,
      id: props.id,
      index: props.index,
      type:"plan",
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
    props.movePlace(dragIndex, hoverIndex,monitor.getItem().place,monitor.getItem().type);
    monitor.getItem().index = hoverIndex;
  },
};

@DropTarget("placeItem", placeTarget, (connect,monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver:monitor.isOver()

}))
@DragSource("placeItem", placeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
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

    this.showRating=this.showRating.bind(this);

    let loc1=this.props.place.name;
    if(loc1==="lunch"){
      return;
    }
    let loc2=this.props.previous;
    axios.get("/home/getLocDistance?location1="+loc1+"&location2="+loc2)
      .then(res => {
        const distance = res.data;
        this.setState({ distance });
      });


	}

  // componentWillMount(){
  //   const id=
  // }

  showRating(){
    let rating=this.props.place.rating;
    if(rating>1000)
    {
        rating=(rating/1000).toString()+'K';
    }
    return (<span>{rating.toString()}</span>);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.previous!==nextProps.previous){
    let loc1=nextProps.place.name;
    if(loc1==="lunch"){
      
    }else{
    let loc2=nextProps.previous;
    axios.get("/home/getLocDistance?location1="+loc1+"&location2="+loc2)
      .then(res => {
        if(!this.ele) return;
        const distance = res.data;
        this.setState({ distance });
      });
      if(nextProps.timeArrival!==this.props.timeArrival){
        this.setState({timeArrival:nextProps.timeArrival})
      }
    }
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


		    const {isDragging, connectDragSource, connectDropTarget,isOver } = this.props;

        const color=isOver?'#e5e5c9':'#fafafa';

		    const opacity = isDragging ? 0.5 : 1;
		return connectDragSource(connectDropTarget( <div ref={(ele) => this.ele = ele} className="row" id="planInfoParent" style={{display:"flex",flexDirection:"column",width:"100%",height:"auto"}}>
      <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"center"}}>
				{this.isDistanceTravel() && !this.isLunch() && <div className="vertical-row-parent" ><div className="vertical-row"></div><h5><FontAwesome name="arrows-v"/> Distance : {this.state.distance.distance} km</h5><h5><FontAwesome name="automobile" /> Estimated Travel Time : {this.state.distance.duration}</h5>
        </div>
      }
      </div>
      <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
      {this.state.timeArrival && <div style={{color:"#808080",width:"6%",marginLeft:"1%"}}><h6><i>{this.convertTime24to12(this.state.timeArrival)}</i></h6></div>}
        <div  style={{cursor:"pointer",width:"90%"}}>
        {!this.isLunch() && <div className="row planPlaces polaroid" style={{backgroundColor:color}}>
					<button id="buttonCross" onClick={this.handleRemove}></button>
          <div id="placeInfos">
						<div className="col-lg-2 col-md-3 col-sm-4" style={{position:"static",display:"flex",flexDirection:"column",alignItems:"center",marginTop:"4px",width:"20%"}}>
							<img className="planImages img-rounded" src={this.props.place.image}/>
						</div>
						<div className="col-lg-9 col-md-8 col-sm-7" style={{width:"70%"}}>
								<h4>{this.props.place.name}</h4>
								{this.props.place.timeOpen && <h6><b><FontAwesome name="clock-o"/> Time Open :</b> {this.props.place.timeOpen}</h6>}
								<h6><b><FontAwesome name="tasks"/> Address :</b> {this.props.place.address}</h6>
								<div id="ratingInfos" style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"-15px"}}>
                <h6><a href="#" data-target={"#"+this.props.place.id} data-toggle="modal" >More info...</a></h6><h6>{this.showRating()}<FontAwesome name="tags"/></h6>
                </div>
						</div>
            </div>
            <div id="noPrint">
              <div id={this.props.place.id} className="modal fade" role="dialog">
                <div className="modal-dialog">

                  <div className="modal-content" style={{fontFamily:"cursive"}}>   

                    <div className="modal-body">
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <h1 className="modal-title" >{this.props.place.name}</h1>
                      <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around"}}>
                        
                         <img className="polaroid img-rounded" style={{height:"200px",width:"220px"}} src={this.props.place.image}/>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",marginLeft:"2%"}}>
                        <h6>{this.props.place.categories}</h6>
                        {this.props.place.phone && <h5><b><FontAwesome name="phone"/> Phone :</b> {this.props.place.phone}</h5>}
                        {this.props.place.cost && <h5><b><FontAwesome name="money"/> Cost :</b> {this.props.place.cost}</h5> }
                        {this.props.place.timeOpen && <h5><b><FontAwesome name="clock-o"/> Time Open :</b> {this.props.place.timeOpen}</h5>}
                        {this.props.place.timeRequired && <h5><b><FontAwesome name="hourglass-end"/> Time Required :</b> {this.props.place.timeRequired}</h5>}
                        {this.props.place.address && <h5><b><FontAwesome name="location-arrow" /> Address :</b> {this.props.place.address}</h5>}
                        </div>
                      </div>
                      <div>
                        <h5><b>Description :</b></h5>
                        <h5 style={{wordSpacing:"4px",lineHeight:"18px"}}>{this.props.place.description}</h5>
                      </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                  </div>

                </div>
              </div>
              </div>

					</div>}
          </div>
          {this.isLunch() && <div style={{color:"#c0c0c0",marginLeft:"10%",marginTop:"-3%"}}><i><h3>Lunch Time <FontAwesome name="cutlery"/></h3></i></div>}
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