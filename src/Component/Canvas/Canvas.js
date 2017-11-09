import React from 'react'
import canvas_css from './Canvas.css'
import { initCanvas, Repeler, Particle, render, Text, GetRandomDestText } from './cl_particle.js'

class CanvasComponent extends React.Component {
	componentDidMount(){
		this.props.didMount();
		// initCanvas(this.refs.canvas,callback);
		// Text('Canvas');
		// var particle_arr = [];
		// for(var i = 0 ; i < 1500 ; i++){
		// 	var temp_size = (Math.random()*3)+1;
		// 	var temp_dest = GetRandomDestText();
		// 	var new_particle = new Particle(temp_dest.x,temp_dest.y,temp_size,'#9F96D9', 0, 0, 0, 0);
		// 	particle_arr.push(new_particle);
		// }

		// repeler = new Repeler(100,100,20,'turquoise',0,0,0,0);

		// render();

		// function callback(){
		// 	repeler.move();
		// 	particle_arr.forEach(function(particle){
		// 		particle.move();
		// 		particle.checkCollide(repeler);
		// 	});
		// }
		// if(this.props.didMountHandler != undefined{
		// 	this.props.didMountHandler();
		// }
	}
	hoverHandler(){
		// document.onmousemove = function(e){
		// 	var dif_x = e.x - repeler.loc.x;
		// 	var dif_y = e.y - repeler.loc.y;
		// 	repeler.vel.x = dif_x / 21;
		// 	repeler.vel.y = dif_y / 21;
		// }
	}
	render(){
		return(
			<canvas ref={(ref) => {this.canvas = ref;}} className={canvas_css.canvas}></canvas>
		)
	}
}

export default CanvasComponent;