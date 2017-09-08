import React, {Component} from 'react';
import moment from 'moment';

import PerDayPlan from './perDayPlan';

export default class FinalPlanList extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.plan);
	}

	render(){
		let allPlaces=[];
		if(this.props.plan){
			allPlaces=this.props.plan.map((perDayPlan,i)=>{
				return (<PerDayPlan date={moment(this.props.date).add(i,'days')} day={i+1} key={i} dayPlan={perDayPlan}/>);
			});
		}
		//console.log(allPlaces);
		return (<div  style={{display:"flex",flexDirection:"column",width:"697px",margin:"auto",alignItems:"center"}}>{allPlaces}</div>)

	}

}