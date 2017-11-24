import React from 'react'
import about_css from './About.css'
import { initCanvas, Particle, render } from 'Component/cl_particle.js'

var particle_arr = [];

class About extends React.Component {
	componentDidMount(){
		initCanvas(this.canvas,this.callback,window.innerWidth-1,window.innerHeight);
		
		let part = new Particle(50,50,10,'#000',0,0,0.5,0.5);
		part.friction = false;
		part.colide_frame = true;
		part.connection = true;
		particle_arr.push(part);
		let part2 = new Particle(100,100,10,'#000',0,0,0.55,0.55);
		part2.friction = false;
		part2.colide_frame = true;
		part2.connection = true;
		particle_arr.push(part2);

		render();
	}
	callback(){
		// particle_arr.forEach(function(particle,index){
		// 	particle.drawConnection(particle_arr,index);
		// });
		particle_arr.forEach(function(particle,index){
			particle.move(particle_arr,index);
		});
	}
	render(){
		return(
			<div ref={(ref) => {this.canvasParent = ref}} className={about_css.about_wrapper}>
				<div className={about_css.about_content}>
					asd
				</div>
				<canvas className={about_css.canvas} ref={(ref) => {this.canvas = ref}}/>
			</div>
		)
	}
}

export default About;