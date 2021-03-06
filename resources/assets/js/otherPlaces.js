import React,{Component} from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const removePlaceSource = {

  beginDrag(props) {
    return {
    	place:props.place,
      id: props.place.id,
      index: props.index,
      type:props.type,
    };
  },
};

@DragSource("placeItem", removePlaceSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class OtherPlaces extends Component{
	constructor(props){
		super(props);

		this.handleClick=this.handleClick.bind(this);
	}

	handleClick(event){
		this.props.onPlaceClick(this.props.place);
	}
	
	render(){

		    const {isDragging, connectDragSource} = this.props;
		return connectDragSource(
			<div className="otherPlaces">
			<div className="placeImage"  onClick={this.handleClick}>
			<img src={this.props.place.image} className="img-rounded polaroid"  />
			</div>&nbsp;&nbsp;
			<div className="placeName">
			<h5 onClick={this.handleClick}>{this.props.place.name} </h5>
			<a data-target={"#"+this.props.place.id} data-toggle="modal" style={{marginTop:"-5px"}} href=""><FontAwesome name="info-circle" /></a>
			<div id={this.props.place.id} className="modal fade" role="dialog">
                <div className="modal-dialog">

                  <div className="modal-content" style={{fontFamily:"cursive"}}>   

                    <div className="modal-body">
                    <div className="modalBody">
                    <h1 className="modal-title" >{this.props.place.name}</h1><br/>
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
			</div>
			);
	}

}
