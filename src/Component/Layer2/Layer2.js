import React from 'react'
import { initCanvas, Particle, render, GetRandomDest } from 'Component/Canvas/cl_particle.js'
import Layer2_css from './Layer2.css'

var particle_arr = [];
var color = ["#9162bf","#ff7849","#13ce66"];

class Layer2 extends React.Component {
	componentDidMount(){
		initCanvas(this.refs.canvas,callback);

		for(var i = 0 ; i < 10 ; i++){
			var coor = GetRandomDest();
			var size = (Math.random()*2)+2;
			var velo = [];
			velo[0] = (Math.random()) - 0.5;
			velo[1] = (Math.random()) - 0.5;
			var particle = new Particle(coor.x,coor.y,size,color[Math.floor(Math.random()*(color.length+1))], 0, 0, velo[0], velo[1]);
			particle.friction = false;
			particle.colide_frame = true;
			particle_arr.push(particle);
		}
		
		render();
		
		function callback(){
			particle_arr.forEach(function(data,index){
				data.move();
			});
		}
	}
	render(){
		return(
			<div className={Layer2_css.main_wrapper}>
				<canvas ref="canvas" className={Layer2_css.canvas}/>
				<div className={Layer2_css.content_wrapper}>
					
				</div>
			</div>
		)
	}
}

export default Layer2;