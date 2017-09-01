import React,{Component} from 'react';

export default class ModalPlaceInfo extends Component{
	render(){
		return (
			
			<div id={this.props.place.id} className="modal fade" role="dialog">
			                <div className="modal-dialog">

			                  <div className="modal-content">
			                      <button type="button" className="close" data-dismiss="modal">&times;</button>
			                      
			                    <div className="modal-body">
			                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
			                    <h2 className="modal-title">{this.props.place.name}</h2>
			                      <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around"}}>
			                        
			                         <img className="polaroid" style={{height:"200px",width:"230px"}} src={this.props.place.image}/>
			                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",marginLeft:"2%"}}>
			                        <h6>{this.props.place.categories}</h6>
			                        {this.props.place.phone && <h5><b><FontAwesome name="phone"/> Phone :</b> {this.props.place.phone}</h5>}
			                        {this.props.place.cost && <h5><b><FontAwesome name="money"/> Cost :</b> {this.props.place.cost}</h5> }
			                        {this.props.place.timeOpen && <h5><b><FontAwesome name="clock-o"/> Time Open :</b> {this.props.place.timeOpen}</h5>}
			                        {this.props.place.timeRequired && <h5><b><FontAwesome name="hourglass-end"/> Time Required :</b> {this.props.place.timeRequired}</h5>}
			                        {this.props.place.address && <h5><b><FontAwesome name="location-arrow" /> Address :</b> {this.props.place.address}</h5>}
			                        </div>
			                      </div>
			                      </div>
			                    </div>
			                    <div className="modal-footer">
			                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			                    </div>
			                  </div>

			                </div>
			              </div>
			);
	}
}