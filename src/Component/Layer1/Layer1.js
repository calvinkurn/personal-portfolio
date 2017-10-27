import React,{Component} from 'react';
import layer1 from './Layer1.css'
import { initCanvas, Repeler, Particle, render, Text, GetRandomDest } from './cl_particle.js'

class Layer1 extends Component {
	componentDidMount(){
		initCanvas(this.refs.canvas,callback);
		Text('Canvas');
		var particle_arr = [];
		for(var i = 0 ; i < 1100 ; i++){
			var temp_size = (Math.random()*3)+1;
			var temp_dest = GetRandomDest();
			var new_particle = new Particle(temp_dest.x,temp_dest.y,temp_size,'#9F96D9', 0, 0, 0, 0);
			particle_arr.push(new_particle);
		}

		var repeler = new Repeler(100,100,20,'turquoise',0,0,0,0);


		render();

		function callback(){
			// particle.move();
			repeler.move();
			particle_arr.forEach(function(particle){
				particle.move();
				particle.checkCollide(repeler);
			});
		}

		document.onmousemove = function(e){
			var dif_x = e.x - repeler.loc.x;
			var div_y = e.y - repeler.loc.y;
			repeler.vel.x = dif_x / 21;
			repeler.vel.y = div_y / 21;
		}
	}
	render(){
		return(
			<div className={layer1.wrapper}>
				<span className={layer1.text}>
					Finally, You Found Me!
				</span>
				<div className={layer1.sparator}></div>
				<canvas ref="canvas" className={layer1.canvas}></canvas>
			</div>
		)
	}
}

export default Layer1