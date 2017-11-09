import React,{Component} from 'react';
import layer1 from './Layer1.css'
import Loading from 'Component/Loading/Loading'
import Type from 'Component/Type/Type'

// var repeler;

class Layer1 extends Component {
	constructor(props){
		super(props);

		this.state={
			loading: false,
			hidden: '',
			done: '',
			hover: ''
		}
	}
	componentDidMount(){
		setTimeout(function(){
			this.setState({
				hidden: 'hidden'
			});
			setTimeout(function(){
				this.setState({
					loading: false
				});
			}.bind(this),500);
		}.bind(this),2000);	
	}
	render(){
		return(
			<div className={[layer1.wrapper, layer1[this.state.done]].join(' ')}>
				{this.state.loading &&
					<Loading hidden={this.state.hidden}/>
				}
				<div className={layer1.content_wrapper}>
					<Type/>
				</div>
			</div>
		)
	}
}

export default Layer1