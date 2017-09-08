import React,{Component} from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';


export default class FinalPlace extends Component{

	constructor(props){
		super(props);

    this.state={
      distance:{},
      timeArrival:this.props.timeArrival
    }

		this.isLunch=this.isLunch.bind(this);
    this.convertTime24to12=this.convertTime24to12.bind(this);

	}

  componentWillMount(){
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

  componentWillUpdate(nextProps,nextState){
    if(nextState.distance!==this.state.distance){
      this.setState({distance:nextState.distance});
    }
  }

	isDistanceTravel(){
		if(this.props.previous===null)
			return false;
		else
			return true;
	}

    convertTime24to12(time24){
        let tmpArr = time24.toString().split(':'), time12;
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

		    return( <div ref={(ele) => this.ele = ele} className="row" id="planInfoParent" style={{display:"flex",flexDirection:"column",width:"100%",height:"auto"}}>
      <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"center"}}>
				{this.isDistanceTravel() && !this.isLunch() && <div className="vertical-row-parent" ><div className="vertical-row"></div><h5><FontAwesome name="arrows-v"/> Distance : {this.state.distance.distance} km</h5><h5><FontAwesome name="automobile" /> Estimated Travel Time : {this.state.distance.duration}</h5>
        </div>
      }
      </div>
      <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
      {this.props.timeArrival && <div style={{color:"#808080",width:"7%",marginLeft:"2%"}}><h6><i>{this.convertTime24to12(this.props.timeArrival)}</i></h6></div>}
        <div  style={{width:"90%"}}>
        {!this.isLunch() && <div className="row planPlaces">
          <div id="placeInfos">
						<div className="col-lg-2 col-md-3 col-sm-4" style={{position:"static",display:"flex",flexDirection:"column",alignItems:"center",marginTop:"4px",width:"20%"}}>
							<img className="planImages img-rounded" src={this.props.place.image}/>
						</div>
						<div className="col-lg-9 col-md-8 col-sm-7" style={{width:"70%"}}>
								<h4>{this.props.place.name}</h4>
								{this.props.place.timeOpen && <h6><b><FontAwesome name="clock-o"/> Time Open :</b> {this.props.place.timeOpen}</h6>}
								<h6><b><FontAwesome name="tasks"/> Address :</b> {this.props.place.address}</h6>
						</div>
            </div>

					</div>}
          </div>
          {this.isLunch() && <div style={{color:"#c0c0c0",marginLeft:"10%",marginTop:"-3%"}}><i><h3>Lunch Time <FontAwesome name="cutlery"/></h3></i></div>}
          </div>
          </div>
			)


	}

}
