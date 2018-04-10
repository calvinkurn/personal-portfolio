import React from "react";
import style from "./Home.css";
import Type from "Component/Type/Type";
import {
	fadeOut,
	clearRAF,
	initCanvas,
	Puller,
	Particle,
	render,
	GetRandomDestText,
	drawBundler
} from "Component/cl_particle.js";

var puller; // puller object
var action = false; // invoke puller push
var particle_arr = []; // particle collection

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

		// init particle on initial page
		for (var i = 0; i < 25; i++) {
			var temp_size = Math.random() * 1.5 + 1;
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

		// puller in middle for colide example
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

		render();
	}

	callback = () => {
		drawBundler(function() {
			particle_arr.forEach(function(particle) {
				if (action) {
					particle.pushed(puller);
				}
				particle.checkCollide(puller.getPullerPulse());
				particle.move();
			});
		});

		puller.move();
	};

	click = e => {
		action = true;
		this.forceUpdate();
		this.props.clickHandler(2);
		fadeOut(150);
	};
	render() {
		return (
			<React.Fragment>
				{!action && (
					<React.Fragment>
						<div className={style.type__container}>
							<Type />
							<div className={style.button__next} onClick={this.click} />
						</div>
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
			</React.Fragment>
		);
	}
}
