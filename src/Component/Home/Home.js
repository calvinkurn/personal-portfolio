import React from 'react'
import home_css from './Home.css'
import Type from 'Component/Type/Type'
import { fadeOut, clearRAF, initCanvas, Puller, Particle, render, GetRandomDestText } from 'Component/cl_particle.js'

var puller;
var action = false;

export default class Temp extends React.Component {
	constructor(props){
		super(props);
		this.click = this.click.bind(this);
	}
	componentWillUnmount(){
		clearRAF();
	}
	componentDidMount(){
		initCanvas(this.canvas,callback,window.innerWidth,window.innerHeight);
		var particle_arr = [];
		for(var i = 0 ; i < 20 ; i++){
			var temp_size = (Math.random()*3)+2;
			var temp_dest = GetRandomDestText();
			var rand_velox = (Math.random()*2)-1;
			var rand_veloy = (Math.random()*2)-1;
			var new_particle = new Particle(temp_dest.x,temp_dest.y,temp_size,'#9F96D9', 0, 0, rand_velox, rand_veloy);
			new_particle.colide_frame = true;
			new_particle.friction = false;
			particle_arr.push(new_particle);
		}

		puller = new Puller(window.innerWidth/2,(window.innerHeight/2)+50,20,"rgba(255,10,10,0.5)",0,0,0,0);

		render();

		function callback(){
			particle_arr.forEach(function(particle){
				if(action){
					particle.pushed(puller);
				}
				particle.checkCollide(puller.getPullerPulse());
				particle.move();
			});
			puller.move();
		}
	}
	click(e){
		action = true;
		this.forceUpdate();
		this.props.clickHandler(2);
		fadeOut(450);
	}
	render(){
		return(
			<div>
				{ !action &&
					<div className={home_css.type__container}>
						<Type/>
						<div className={home_css.button__next} onClick={this.click}/>
					</div>
				}
				<canvas className={home_css.canvas} 
				ref={(ref) => {this.canvas = ref}}/>
			</div>
		)
	}
}