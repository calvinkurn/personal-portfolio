import React from "react";
import { getRGB } from "./helper";
import img from "haunter.png";
import {
	clearRAF,
	initCanvas,
	Particle,
	render,
	GetRandomDestText,
	vec2d,
	drawBundler
} from "Component/cl_particle.js";

var particle_image = []; // particle collection for image
var image_coor; // image coordinat collection

export default class ImgParticle extends React.Component {
	componentWillUnmount() {
		clearRAF();
		particle_image = [];
	}

	componentDidMount() {
		initCanvas(
			this.canvas,
			this.callback,
			window.innerWidth,
			window.innerHeight
		);

		// get coordinate on
		var imgCanvas = new Image();
		imgCanvas.src = img;
		imgCanvas.onload = function() {
			image_coor = getRGB(
				this.canvas,
				0,
				0,
				this.canvas.width,
				this.canvas.height,
				imgCanvas,
				this.canvas.width / 2,
				this.canvas.height / 2
			);
			// console.log(image_coor);

			var intervalParticle = setInterval(function() {
				var temp_loc = GetRandomDestText();
				var new_particle = new Particle(
					temp_loc.x,
					temp_loc.y,
					1.2,
					"#67277A",
					0,
					0,
					1,
					1
				);
				new_particle.colide_frame = true;
				new_particle.friction = false;
				particle_image.push(new_particle);
				if (particle_image.length === image_coor.length - 1) {
					clearInterval(intervalParticle);
				}
			}, 5);
		}.bind(this);

		render();
	}

	callback = () => {
		drawBundler(function() {
			particle_image.forEach(function(particle, index) {
				particle.moveTo(new vec2d(image_coor[index].x, image_coor[index].y));
			});
		});
	};

	render() {
		return (
			<canvas
				id="canvas"
				style={{ display: "block" }}
				ref={ref => {
					this.canvas = ref;
				}}
			/>
		);
	}
}
