import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchLocThumbnail,fetchCategory} from '../PlanPage/actions/planAction'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LocThumbnail from './locThumbnail'

class LocThumbnailList extends React.Component{
	constructor(){
		super();
		this.state={
			categoryImages:null,
			selectedCategory:"All",
			activePage:document.querySelector("#firstPage"),
		}

		this.pagination=this.pagination.bind(this);
		this.handleCategoryClick=this.handleCategoryClick.bind(this);
		this.getCategoryImages=this.getCategoryImages.bind(this);
	}

	getCategoryImages(category){
		let categoryImages=[];
		let arr=this.props.locThumbnails;
		if(category=='All'){
			return arr;
		}
		else{
			let searchMatch=new RegExp(category,"i");
			let l=arr.length;
			for(let i=0;i<l;i++){
				if(arr[i].categories.match(searchMatch))
					categoryImages.push(arr[i]);
			}
			return categoryImages;
			
		}

	}

	shouldComponentUpdate(nextProps,nextState){
		if(this.props.locThumbnails && this.props.categories){
			return true;
		}
		else
			return false;
	}

	componentWillMount(){
		this.props.fetchLocThumbnail(this.props.city);
		this.props.fetchCategory(this.props.city);
	}

	componentDidMount(){
		if(this.props.locThumbnails){
		this.setState({categoryImages:this.props.locThumbnails});
	}
	}

	shouldComponentUpdate(nextProps,nextState){
		return nextProps.locThumbnails!==this.props.locThumbnails || nextProps.categories!==this.props.categories || nextState.categoryImages!==this.state.categoryImages;
	}

	componentWillUpdate(nextProps, nextState){
		if(nextProps.city!==this.props.city){
		this.props.fetchLocThumbnail(this.props.city);
		}
		if(nextProps.city!==this.props.city){
			this.props.fetchCategory(this.props.city);
		}
		
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.locThumbnails!==this.props.locThumbnails){
			this.setState({categoryImages:nextProps.locThumbnails});
		}
	}


	handleCategoryClick(event){
		let category=event.target.innerHTML;
		this.setState({selectedCategory:category});
		if(document.querySelector("#firstPage") && document.querySelector("#firstPage").classList.contains("active")){
			document.querySelector("#firstPage").classList.remove('active');
			document.querySelector("#firstPage").removeAttribute('id');
			}
		if(this.state.activePage){
			this.state.activePage.classList.remove('active');
		}
		let temp=event.currentTarget;
		//console.log(temp);
		this.setState({activePage:temp});
		temp.classList.add('active');
		temp=this.getCategoryImages(category);
		this.setState({categoryImages:temp});

	}

	pagination(){
		let categoryImages=[];
		if(this.state.categoryImages && this.props.categories)
		{
			let categories=this.props.categories;
			let l=categories.length;
				categoryImages.push(<li key={0} className="active" id="firstPage" onClick={this.handleCategoryClick}><a href="#">All</a></li>);
			for(let i=1;i<l;i++){
				categoryImages.push(<li key={i} onClick={this.handleCategoryClick}><a href="#">{categories[i-1]}</a></li>);

			}
		}
		return (<ul className="pagination">{categoryImages}</ul>);
	}

	render(){

		let locThumbnailItem;
	if(this.state.categoryImages){

		locThumbnailItem=this.state.categoryImages.map( (locThumbnail,i) => {
			return (
				<LocThumbnail key={i}  locThumbnail={locThumbnail} index={i}/>
				);
		} );
			}
		return ( 
		<div className="container" style={{width:"100%"}}>
			<div className="text-center">{this.pagination()}</div>
			<div className="grid">
				{locThumbnailItem}
			</div>
		</div>
			);

	}


}

function mapStateToProps(state){
	return{
		locThumbnails : state.locThumbnails.locThumbnails,
		categories:state.categories.categories
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchLocThumbnail:fetchLocThumbnail,fetchCategory:fetchCategory},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocThumbnailList);