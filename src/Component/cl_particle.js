var canvas, context;
var loop;
var destination_arr = [];
var RAF;
var list_connection = [];
// var temp=[];

export function checkInit() {
	if (canvas === undefined) {
		console.log("%cinitCanvas first", "color: #42b549");
		return false;
	}
}

export function initCanvas(target, loopFunct, width, height) {
	canvas = target;
	canvas.height = height;
	canvas.width = width;
	context = canvas.getContext("2d");
	loop = loopFunct;
}

export function clearcanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

export function render() {
	clearcanvas();

	loop();

	RAF = requestAnimationFrame(render);
}

export function clearRAF() {
	cancelAnimationFrame(RAF);
}

export function fadeOut(milisecond) {
	var fade = setInterval(function() {
		context.globalAlpha -= 1 / milisecond;
		console.log(context.globalAlpha);
		if (context.globalAlpha < 0.01) {
			clearInterval(fade);
		}
	}, 1);
}

export function Particle(x, y, radius, color, forcex, forcey, velox, veloy) {
	checkInit();
	this.loc = new vec2d(x, y);
	this.rad = radius;
	this.col = color;
	this.vel = new vec2d(velox, veloy);
	this.force = new vec2d(forcex, forcey);
	this.friction = true;
	this.colide_frame = false;
	this.colide_x_tolerance = 0;
	this.colide_y_tolerance = 0;
	this.connection = false;
	this.min_connection = 0;
	this.max_connection = this.min_connection + 100;

	this.draw = function() {
		if (this.friction) {
			this.vel.set(this.vel.x / 1.05, this.vel.y / 1.05);
		}
		context.beginPath();
		context.fillStyle = this.col;
		context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
		context.fill();
	};

	this.move = function(ParticleArr, index) {
		this.loc.x += this.vel.x;
		this.loc.y += this.vel.y;

		this.addForce();

		if (this.colide_frame) {
			if (
				this.loc.x + this.rad >= canvas.width + this.colide_x_tolerance ||
				this.loc.x - this.rad <= 0 - this.colide_x_tolerance
			) {
				this.vel.x = this.vel.x * -1;
			} else if (
				this.loc.y - this.rad <= 0 - this.colide_y_tolerance ||
				this.loc.y + this.rad >= canvas.height + this.colide_y_tolerance
			) {
				this.vel.y = this.vel.y * -1;
			}
		}

		if (this.connection) {
			if (index === 0) {
				drawConnection(ParticleArr, index);
			}
		}

		this.draw();
	};

	this.moveTo = function(vec2d) {
		if (this.vel.x === 0 && this.vel.y === 0) {
			this.draw();
			return false;
		}
		var distance = pureEcluDist(this.loc, vec2d);
		const tolerance = 5;
		const percentage = 0.01;
		const minVelo = distance * percentage * -1;
		const Velo = distance * percentage;
		if (vec2d.x > this.loc.x) {
			this.vel.x = Velo;
		} else if (vec2d.x > this.loc.x - tolerance) {
			this.vel.x = 0;
		} else {
			this.vel.x = minVelo;
		}
		if (vec2d.y > this.loc.y) {
			this.vel.y = Velo;
		} else if (vec2d.y > this.loc.y - tolerance) {
			this.vel.y = 0;
		} else {
			this.vel.y = minVelo;
		}
		this.move();
	};

	this.addForce = function() {
		if (this.vel.x < 1) {
			this.force.x = 0;
		} else {
			this.force.x += this.vel.x;
		}
		if (this.vel.y < 1) {
			this.force.y = 0;
		} else {
			this.force.y += this.vel.y;
		}
	};

	this.checkCollide = function(target) {
		var dist = ecluDist(this, target);
		// var dist = Math.sqrt(Math.pow(this.loc.x - target.loc.x,2) + Math.pow(this.loc.y - target.loc.y,2));
		dist = dist - (this.rad + target.rad);
		if (dist <= 1) {
			var tolerant = this.rad / 2;

			if (
				this.loc.x > target.loc.x - tolerant &&
				this.loc.x < target.loc.x + tolerant
			) {
				// console.log('spec colide');
				this.vel.y = Math.abs(target.vel.y) + 1;
				if (this.loc.y < target.loc.y) {
					this.vel.y = -this.vel.y;
				}
				return;
			}
			if (
				this.loc.y > target.loc.y - tolerant &&
				this.loc.y < target.loc.y + tolerant
			) {
				this.vel.x = Math.abs(target.vel.x) + 1;
				if (this.loc.x < target.loc.x) {
					this.vel.x = -this.vel.x;
				}
				return;
			}

			this.vel.x = Math.abs(target.vel.x) + 1;
			this.vel.y = Math.abs(target.vel.y) + 1;
			if (this.loc.x < target.loc.x) {
				this.vel.x = -this.vel.x;
			}
			if (this.loc.y < target.loc.y) {
				this.vel.y = -this.vel.y;
			}
		}
	};

	this.pulled = function(target) {
		var dif_x = target.loc.x - this.loc.x;
		var dif_y = target.loc.y - this.loc.y;
		this.vel.x = dif_x / 21;
		this.vel.y = dif_y / 21;
	};

	this.pushed = function(target) {
		var dif_x = this.loc.x - target.loc.x;
		var dif_y = this.loc.y - target.loc.y;
		this.vel.x = dif_x / 21;
		this.vel.y = dif_y / 21;
	};
}

export function Puller(x, y, radius, color, forcex, forcey, velox, veloy) {
	checkInit();
	this.loc = new vec2d(x, y);
	this.rad = radius;
	this.col = color;
	this.vel = new vec2d(velox, veloy);
	this.force = new vec2d(forcex, forcey);
	this.friction = true;
	this.scale = 1;

	this.draw = function() {
		if (this.friction) {
			this.vel.set(this.vel.x / 1.05, this.vel.y / 1.05);
		}
		this.scale += 0.1;
		if (this.scale > 20) {
			this.scale = 0;
		}
		context.beginPath();
		context.fillStyle = this.col;
		context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
		context.fill();

		context.beginPath();
		context.strokeStyle = "rgba(255,132,132," + (1 - this.scale / 20) + ")";
		context.arc(this.loc.x, this.loc.y, this.rad + this.scale, 0, 2 * Math.PI);
		context.stroke();
	};

	this.move = function(index) {
		this.loc.x += this.vel.x;
		this.loc.y += this.vel.y;

		this.draw();
	};

	this.getPullerPulse = function() {
		var data = {
			loc: {
				x: this.loc.x,
				y: this.loc.y
			},
			rad: this.rad + this.scale,
			vel: {
				x: this.vel.x,
				y: this.vel.y
			}
		};
		return data;
	};

	this.addForce = function() {
		if (this.vel.x < 0.1) {
			this.force.x = 0.5;
		} else {
			this.force.x += this.vel.x / 20;
		}
		if (this.vel.y < 0.1) {
			this.force.y = 0.5;
		} else {
			this.force.y += this.vel.y / 20;
		}
	};
}

export function Repellent(x, y, radius, color, forcex, forcey, velox, veloy) {
	checkInit();
	this.loc = new vec2d(x, y);
	this.rad = radius;
	this.col = color;
	this.vel = new vec2d(velox, veloy);
	this.force = new vec2d(forcex, forcey);
	this.friction = true;

	this.draw = function() {
		if (this.friction) {
			this.vel.set(this.vel.x / 1.05, this.vel.y / 1.05);
		}
		context.beginPath();
		context.fillStyle = this.col;
		context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
		context.fill();
	};

	this.move = function(index) {
		this.loc.x += this.vel.x;
		this.loc.y += this.vel.y;

		// this.addForce();

		if (
			this.x >= canvas.width ||
			this.x <= 0 ||
			(this.y <= 0 || this.y >= canvas.height)
		) {
			//validate wall
		}
		this.draw();
	};

	this.addForce = function() {
		// console.log(this.force.x);
		if (this.vel.x < 0.1) {
			this.force.x = 0.5;
		} else {
			this.force.x += this.vel.x / 20;
		}
		if (this.vel.y < 0.1) {
			this.force.y = 0.5;
		} else {
			this.force.y += this.vel.y / 20;
		}
	};
}

export function vec2d(x, y) {
	this.x = x;
	this.y = y;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	};
}

// canvas draw text
export function Text(text) {
	var x = canvas.width / 2;
	var y = canvas.height / 2;

	var ukuran = 200;

	context.textAlign = "center";
	context.font = "bold " + ukuran + "px Arial";
	context.strokeStyle = "white";
	context.fillStyle = "#f00";

	context.strokeText(text, x, y);
	getDotLoc();
}

// canvas draw image
export function Image(imgSource, x, y, width, height) {
	if (imgSource === undefined || imgSource === null)
		return console.warn(
			"CLparticle Image parameter must be DOM object of image"
		);
	if (width !== undefined && height !== undefined) {
		context.drawImage(imgSource, x, y, width, height);
		return false;
	}
	// context.drawImage(imgSource, x, y);
	context.beginPath();
	context.fillStyle = "red";
	context.arc(200, 200, 2, 0, 2 * Math.PI);
	context.fill();
}

function getDotLoc() {
	destination_arr = [];
	var image_data = context.getImageData(0, 0, canvas.width, canvas.height);
	var pixel = image_data.data;

	for (var i = 0; i < pixel.length; i += 3) {
		if (pixel[i] === 255) {
			var angka = i / 4;
			var x = angka % canvas.width;
			var y = angka / canvas.width;
			destination_arr.push(new vec2d(x, y));
		}
	}
	// console.log(destination_arr.length);
}

// if there is no text will return random coordinate
export function GetRandomDestText() {
	var rand = Math.round(Math.random() * destination_arr.length);
	var temp = destination_arr.splice(rand, 1);
	if (typeof temp[0] === "undefined") {
		return {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height
		};
	}
	return temp[0];
}

export function GetTextIndex() {
	return destination_arr.length;
}

export function GetRandomDest() {
	var temp = new vec2d();
	temp.set(Math.random() * canvas.width, Math.random() * canvas.height);
	return temp;
}

function drawConnection(ParticleArr, currindex) {
	list_connection = [];
	let curr = ParticleArr[currindex];
	ParticleArr.forEach(function(particle, index) {
		if (currindex !== index) {
			var dist = ecluDist(ParticleArr[currindex], particle);
			if (dist <= curr.max_connection && dist >= curr.min_connection) {
				if (list_connection[index] === undefined) {
					var opacity = 1 - dist / curr.max_connection;
					context.beginPath();
					context.strokeStyle = "RGBA(94,168,241," + opacity + ")";
					context.moveTo(curr.loc.x, curr.loc.y);
					context.lineTo(particle.loc.x, particle.loc.y);
					context.stroke();
					context.closePath();

					if (list_connection[currindex] === undefined) {
						list_connection[currindex] = [];
						list_connection[currindex][index] = true;
					}
				} else if (list_connection[index][currindex] === undefined) {
				}
			}
		}
	});
	console.log(list_connection);
}

// dist particle
export function ecluDist(particle1, particle2) {
	return Math.sqrt(
		Math.pow(particle1.loc.x - particle2.loc.x, 2) +
			Math.pow(particle1.loc.y - particle2.loc.y, 2)
	);
}

// pure dist between location
export function pureEcluDist(location1, location2) {
	return Math.sqrt(
		Math.pow(location1.x - location2.x, 2) +
			Math.pow(location1.y - location2.y, 2)
	);
}

window.stopCanvas = clearRAF;
window.startCanvas = render;
