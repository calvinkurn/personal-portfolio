import React from 'react';
import Layer1 from 'Component/Layer1/Layer1'
import Layer2 from 'Component/Layer2/Layer2'

class PageView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			layer: 1,
		}

		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(layer){
		setTimeout(function(){
			this.setState({
				layer: layer,
			});
		}.bind(this),1000);
	}
	render() {
		switch(this.state.layer){
			case 1: return(
				<Layer1 clickHandler={this.clickHandler}/>
			);
			case 2: return(
				<Layer2/>
			);
			default: return(
				<div>
					state layer not found, what are you doing?
				</div>
			);
		}
	}
}

export default PageView;