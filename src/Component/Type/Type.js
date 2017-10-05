import React from 'react';
import './Type.css';

var word = [];
var count = 0;
var limit = 0;

class Type extends React.Component {
	constructor(props){
		super(props);
		React.Children.forEach(this.props.children, function(e){
			word.push(e.props.children);
			limit++;
		});
		this.state = {
			activeWord: '',
		};
	}
	componentDidMount(){
		var intervalID = setInterval(()=>this.timer(),1000);
		this.setState({
			intervalID: intervalID,
		});
	}
	timer(){
		if(this.refs.com){
			this.setState({
				activeWord:word[count],
			});
			console.log(this.state.activeWord);
			count++;
			if(count >= limit) clearInterval(this.state.intervalID);
		}
	}
	render() {
		return (
			<div className="type_wrapper" ref="com">
				type component
			</div>
		)
	}
}

export default Type;