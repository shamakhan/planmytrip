import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';


class LocThumbnail extends Component{

	constructor(){
		super();
		this.getPartialDescripion = this.getPartialDescripion.bind(this);
		this.getFirstName = this.getFirstName.bind(this);
		this.getRestName = this.getRestName.bind(this);
	}
	getFirstName(name){
		return name.split(' ').slice(0, 1);
	}
	getRestName(name){
		if (name.split(' ').length > 1) {
			return ' '+name.split(' ').slice(1).join(' ');
		}else{
			return '';
		}
	}
	getPartialDescripion(description){
		if (description) {
			return description.split(' ').slice(0,4).join(' ')+'...';
		}else{
			return 'No information available'
		}
		
	}
	render() {

		let id = this.props.locThumbnail.name.toLowerCase().replace(/ /g, "");
		let byId = "#"+id;
		
		return (
			<span>
				<figure className='effect-bubba' data-toggle="modal" data-target={byId}>
					<img src={this.props.locThumbnail.image} alt="img06"/>
					<figcaption>
						<h3>{this.getFirstName(this.props.locThumbnail.name)}
							<span>{this.getRestName(this.props.locThumbnail.name)}</span>
						</h3>
						<p>{this.getPartialDescripion(this.props.locThumbnail.description)}</p>
					</figcaption>			
				</figure>
				<div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
					    <div className="modal-content">
					      
					      <div className="modal-body">
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <h1 className="modal-title" >{this.props.locThumbnail.name}</h1>
                      <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around"}}>
                        
                         <img className="polaroid img-rounded" style={{height:"200px",width:"220px"}} src={this.props.locThumbnail.image}/>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",marginLeft:"2%"}}>
                        <h6>{this.props.locThumbnail.categories}</h6>
                        {this.props.locThumbnail.phone && <h5><b><FontAwesome name="phone"/> Phone :</b> {this.props.locThumbnail.phone}</h5>}
                        {this.props.locThumbnail.cost && <h5><b><FontAwesome name="money"/> Cost :</b> {this.props.locThumbnail.cost}</h5> }
                        {this.props.locThumbnail.timeOpen && <h5><b><FontAwesome name="clock-o"/> Time Open :</b> {this.props.locThumbnail.timeOpen}</h5>}
                        {this.props.locThumbnail.timeRequired && <h5><b><FontAwesome name="hourglass-end"/> Time Required :</b> {this.props.locThumbnail.timeRequired}</h5>}
                        {this.props.locThumbnail.address && <h5><b><FontAwesome name="location-arrow" /> Address :</b> {this.props.locThumbnail.address}</h5>}
                        </div>
                      </div>
                      <div>
                        <h5><b>Description :</b></h5>
                        <h5 style={{wordSpacing:"4px",lineHeight:"18px"}}>{this.props.locThumbnail.description}</h5>
                      </div>
                      </div>
                    </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					      </div>
					    </div>
					</div>
				</div>
			</span>
			);
	}
}

export default LocThumbnail;