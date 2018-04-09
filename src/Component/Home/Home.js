import React from "react";
import style from "./Home.css";
// import Type from "Component/Type/Type";
import {
	fadeOut,
	clearRAF,
	initCanvas,
	Puller,
	Particle,
	render,
	GetRandomDestText,
	vec2d
} from "Component/cl_particle.js";
import { getRGB } from "./helper";
import img from "haunter.png";

var puller; // puller object
var action = false; // invoke puller push
var particle_arr = []; // particle collection
var particle_image = []; // particle collection for image
var image_coor; // image coordinat collection

export default class Temp extends React.Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
	}

	componentWillUnmount() {
		clearRAF();
	}

	componentDidMount() {
		initCanvas(
			this.canvas,
			this.callback,
			window.innerWidth,
			window.innerHeight
		);

		for (var i = 0; i < 25; i++) {
			var temp_size = Math.random() * 3;
			var temp_loc = GetRandomDestText();
			var rand_velox = Math.random() * 2 - 1;
			var rand_veloy = Math.random() * 2 - 1;
			var new_particle = new Particle(
				temp_loc.x,
				temp_loc.y,
				temp_size,
				"#9F96D9",
				0,
				0,
				rand_velox,
				rand_veloy
			);
			new_particle.colide_frame = true;
			new_particle.friction = false;
			particle_arr.push(new_particle);
		}

		puller = new Puller(
			window.innerWidth / 2,
			window.innerHeight / 2 + 50,
			20,
			"rgba(255,10,10,0.5)",
			0,
			0,
			0,
			0
		);

		this.tempCanvas.width = window.innerWidth;
		this.tempCanvas.height = window.innerHeight;

		var imgCanvas = new Image();
		imgCanvas.src = img;
		imgCanvas.onload = function() {
			image_coor = getRGB(
				this.tempCanvas,
				0,
				0,
				this.tempCanvas.width,
				this.tempCanvas.height,
				imgCanvas,
				this.tempCanvas.width / 2,
				this.tempCanvas.height / 2
			);
			// console.log(image_coor);
		}.bind(this);

		render();
	}

	callback = () => {
		// particle_arr.forEach(function(particle) {
		// 	if (action) {
		// 		particle.pushed(puller);
		// 	}
		// 	particle.checkCollide(puller.getPullerPulse());
		// 	if (particle_image[0] !== undefined)
		// 		particle.checkCollide(particle_image[0]);
		// 	particle.move();
		// });
		particle_image.forEach(function(particle, index) {
			// particle.draw();
			// console.log(image_coor[index]);
			if (image_coor[index] === "") {
				particle.draw();
				return;
			}
			var stat = particle.moveTo(
				new vec2d(image_coor[index].x, image_coor[index].y)
			);
			if (stat === false) {
				image_coor[index] = "";
			}
		});
		// puller.move();

		// globalDraw(particle_image);
	};

	click = e => {
		action = true;
		this.forceUpdate();
		this.props.clickHandler(2);
		fadeOut(450);
	};

	drawing = e => {
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
			if (particle_image.length === image_coor.length) {
				clearInterval(intervalParticle);
			}
		}, 5);
		// for (var i = 0; i < image_coor.length; i++) {
		// 	var temp_loc = GetRandomDestText();
		// 	var new_particle = new Particle(
		// 		temp_loc.x,
		// 		temp_loc.y,
		// 		2,
		// 		"#000",
		// 		0,
		// 		0,
		// 		0,
		// 		0
		// 	);
		// 	new_particle.colide_frame = true;
		// 	new_particle.friction = false;
		// 	particle_image.push(new_particle);
		// }
	};
	render() {
		return (
			<React.Fragment>
				{!action && (
					<React.Fragment>
						<div className={style.type__container}>
							{/*<Type />*/}
							<div className={style.button__next} onClick={this.click} />
						</div>
						<div className={style.button__call__part} onClick={this.drawing} />
					</React.Fragment>
				)}
				<canvas
					id="canvas"
					className={style.canvas}
					ref={ref => {
						this.canvas = ref;
					}}
					onClick={this.test}
				/>
				<canvas
					ref={ref => {
						this.tempCanvas = ref;
					}}
					style={{
						position: "fixed",
						zIndex: "-1",
						left: "0",
						right: "0",
						top: "0",
						bottom: "0",
						display: "none"
					}}
				/>
			</React.Fragment>
		);
	}
}
