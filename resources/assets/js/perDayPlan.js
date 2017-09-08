import React,{Component} from 'react';
import FinalPlace from './finalPlace';
import moment from 'moment';

export default class PerDayPlan extends Component{
	constructor(props){
		super(props);
		this.state={
			dayPlan:this.props.dayPlan
		}

		//console.log(this.props.dayPlan);

		this.getPrevPlace=this.getPrevPlace.bind(this);
	}

	getPrevPlace(i){
		if(i<0){
			return null;
		}
		else{
			if(this.props.dayPlan[i].name==="lunch"){
				if(this.props.dayPlan[i-1]){
					return this.props.dayPlan[i-1].name;
				}
				else
					return null;
			}
			return this.props.dayPlan[i].name;
		}
	}

	render(){
		let dayPlaces=[];
		if(this.props.dayPlan){
			dayPlaces=this.props.dayPlan.map((place,i)=>{
				return(<FinalPlace place={place} key={i} timeArrival={place.timeArrival} previous={this.getPrevPlace(i-1)} />);
			});
		}
		return (<div  className="perDayPage" style={{display:"flex",flexDirection:"column",border:"1px solid rgba(0,0,0,0.2)",borderRadius:"6px",padding:"10px",marginBottom:"10px",width:"inherit" }}>
			<div style={{width:"100%",textAlign:"center",borderRadius:"6px",backgroundColor:"#7fbfff"}}><h3 style={{fontFamily:"cursive"}}>Day {this.props.day} ({moment(this.props.date).format('DD/MM/YYYY')})</h3></div><hr style={{marginTop:"0px"}}/>
			{dayPlaces}<br/></div>);
	}

}