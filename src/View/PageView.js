import React from 'react';
import Layer1 from 'Component/Layer1/Layer1'

class PageView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			layer: 1,
		}
	}
	render() {
		if(this.state.layer === 1){
			return(
				<Layer1/>
			)
		}else {
			return(
				<div>
					state layer not found, what are you doing?
				</div>
			)
		}
	}
}

export default PageView;