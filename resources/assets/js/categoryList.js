import React,{Component} from 'react';
import Category from './category'

class categoryList extends Component {
	
	render(){

		let categoryItems;
	if(this.props.categories){
		categoryItems=this.props.categories.map( category => {
			return (
				<Category key={category}  category={category} />
				);
		} );
			}
		return ( <div>
				{categoryItems}
			</div>
			
			);
	}


}

export default categoryList;