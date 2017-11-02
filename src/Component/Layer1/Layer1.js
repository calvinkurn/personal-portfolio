import React,{Component} from 'react';
import layer1 from './Layer1.css'
import Loading from 'Component/Loading/Loading'
import { initCanvas, Repeler, Particle, render, Text, GetRandomDestText } from './cl_particle.js'

var repeler;

class Layer1 extends Component {
	constructor(props){
		super(props);

		this.state={
			loading: true,
			hidden: '',
			done: '',
			hover: ''
		}
	}
	componentDidMount(){
		initCanvas(this.refs.canvas,callback);
		Text('Canvas');
		var particle_arr = [];
		for(var i = 0 ; i < 1500 ; i++){
			var temp_size = (Math.random()*3)+1;
			var temp_dest = GetRandomDestText();
			var new_particle = new Particle(temp_dest.x,temp_dest.y,temp_size,'#9F96D9', 0, 0, 0, 0);
			particle_arr.push(new_particle);
		}

		repeler = new Repeler(100,100,20,'turquoise',0,0,0,0);

		render();

		function callback(){
			repeler.move();
			particle_arr.forEach(function(particle){
				particle.move();
				particle.checkCollide(repeler);
			});
		}

		setTimeout(function(){
			this.setState({
				hidden: 'z'
			});
			setTimeout(function(){
				this.setState({
					loading: true
				});
			}.bind(this),500);
		}.bind(this),2000);
	}
	changeTransition(){
		this.setState({
			done: 'done',
		});
		this.props.clickHandler(2);
	}
	hoverHandler(){
		this.setState({
			hover: 'hide'
		});

		document.onmousemove = function(e){
			var dif_x = e.x - repeler.loc.x;
			var dif_y = e.y - repeler.loc.y;
			repeler.vel.x = dif_x / 21;
			repeler.vel.y = dif_y / 21;
		}
	}
	render(){
		return(
			<div className={[layer1.wrapper, layer1[this.state.done]].join(' ')}>
				{this.state.loading &&
					<Loading hidden={this.state.hidden}/>
				}
				<span className={layer1.text} onMouseEnter={this.hoverHandler.bind(this)} onClick={this.changeTransition.bind(this)}>
					Finally, You Found Me!
				</span>
				<div className={[layer1.sparator, layer1[this.state.hover]].join(' ')}></div>
				<canvas ref="canvas" className={layer1.canvas}></canvas>
			</div>
		)
	}
}

export default Layer1