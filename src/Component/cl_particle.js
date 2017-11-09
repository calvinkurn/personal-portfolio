var canvas,context;
var loop;
var destination_arr=[];
// var temp=[];

export function checkInit(){
	if(canvas === undefined){
		console.log('%cinitCanvas first', 'color: #42b549');
		return false;
	}
}

export function initCanvas(target,loopFunct,width,height){
	// console.log(target);
	canvas = target;
	canvas.height = height;
	canvas.width = width;
	context = canvas.getContext("2d");	
	loop = loopFunct;
}

export function clearcanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

export function render(){
	clearcanvas();

	loop();

	requestAnimationFrame(render);
}

export function Particle(x,y,radius,color,forcex,forcey,velox,veloy){
	checkInit();
	this.loc = new vec2d(x,y);
	this.rad = radius;
	this.col = color;
	this.vel = new vec2d(velox,veloy);
	this.force = new vec2d(forcex,forcey);
	this.friction = true;
	this.colide_frame = false;
	this.colide_x_tolerance = 0;
	this.colide_y_tolerance = 0;

	this.draw = function(){
		if(this.friction){
			this.vel.set(this.vel.x/1.05,this.vel.y/1.05);
		}
		context.beginPath();
		context.fillStyle=this.col;
		context.arc(this.loc.x,this.loc.y,this.rad,0,2*Math.PI);
  		context.fill();
	}

	this.move = function(index){
		this.loc.x+=(this.vel.x);
		this.loc.y+=(this.vel.y);
		
		this.addForce();

		if(this.colide_frame){
			if(this.loc.x>=canvas.width+this.colide_x_tolerance || this.loc.x<=0-this.colide_x_tolerance){
				this.vel.x = (this.vel.x * (-1));
			}else if(this.loc.y<=0-this.colide_y_tolerance || this.loc.y>=canvas.height+this.colide_y_tolerance) {
				this.vel.y = (this.vel.y * (-1));
			}
		}
		
		this.draw();
	}

	this.addForce = function(){
		if(this.vel.x < 1){
			this.force.x = 0;
		}else {
			this.force.x+=(this.vel.x);
		}
		if(this.vel.y < 1){
			this.force.y = 0;
		}else {
			this.force.y+=(this.vel.y);
		}
	}

	this.checkCollide = function(target){
		var dist = Math.sqrt(Math.pow(this.loc.x - target.loc.x,2) + Math.pow(this.loc.y - target.loc.y,2));
		dist = dist - (this.rad + target.rad);
		if(dist <= 1){
			var tolerant = this.rad/2;
			
			if(this.loc.x > (target.loc.x - tolerant) && this.loc.x < (target.loc.x + tolerant)){
				// console.log('spec colide');
				this.vel.y = Math.abs(target.vel.y)+1;
				if(this.loc.y < target.loc.y){
					this.vel.y = -this.vel.y;
				}
				return;
			}
			if(this.loc.y > (target.loc.y - tolerant) && this.loc.y < (target.loc.y + tolerant)){
				this.vel.x = Math.abs(target.vel.x)+1;
				if(this.loc.x < target.loc.x){
					this.vel.x = -this.vel.x;
				}
				return;
			}

			this.vel.x = Math.abs(target.vel.x)+1;
			this.vel.y = Math.abs(target.vel.y)+1;
			if(this.loc.x < target.loc.x){
				this.vel.x = -this.vel.x;
			}
			if(this.loc.y < target.loc.y){
				this.vel.y = -this.vel.y;
			}
		}
	}

	this.pulled = function(target){
		var dif_x = target.loc.x - this.loc.x ;
		var dif_y = target.loc.y - this.loc.y;
		this.vel.x = dif_x / 21;
		this.vel.y = dif_y / 21;
	}

	this.pushed = function(target){
		var dif_x = this.loc.x - target.loc.x;
		var dif_y = this.loc.y - target.loc.y;
		this.vel.x = dif_x / 21;
		this.vel.y = dif_y / 21;
	}
}

export function Puller(x,y,radius,color,forcex,forcey,velox,veloy){
	checkInit();
	this.loc = new vec2d(x,y);
	this.rad = radius;
	this.col = color;
	this.vel = new vec2d(velox,veloy);
	this.force = new vec2d(forcex,forcey);
	this.friction = true;
	this.scale = 1;

	this.draw = function(){
		if(this.friction){
			this.vel.set(this.vel.x/1.05,this.vel.y/1.05);
		}
		this.scale += 0.1;
		if(this.scale > 20){
			this.scale = 0;
		}
		context.beginPath();
		context.fillStyle=this.col;
		context.arc(this.loc.x,this.loc.y,this.rad,0,2*Math.PI);
  		context.fill();

  		context.beginPath();
  		context.strokeStyle="rgba(255,132,132,"+(1-(this.scale/20))+")";
  		context.arc(this.loc.x,this.loc.y,(this.rad)+this.scale,0,2*Math.PI);
  		context.stroke();
	}

	this.move = function(index){
		this.loc.x+=(this.vel.x);
		this.loc.y+=(this.vel.y);
		
		this.draw();
	}

	this.getPullerPulse = function(){
		var data = {
			loc:{
				x:this.loc.x,
				y:this.loc.y
			},
			rad: this.rad+this.scale,
			vel:{
				x:this.vel.x,
				y:this.vel.y,
			}
		}
		return data;
	}

	this.addForce = function(){
		if(this.vel.x < 0.1){
			this.force.x = 0.5;
		}else {
			this.force.x+=(this.vel.x/20);
		}
		if(this.vel.y < 0.1){
			this.force.y = 0.5;
		}else {
			this.force.y+=(this.vel.y/20);
		}
	}
}

export function Repellent(x,y,radius,color,forcex,forcey,velox,veloy){
	checkInit();
	this.loc = new vec2d(x,y);
	this.rad = radius;
	this.col = color;
	this.vel = new vec2d(velox,veloy);
	this.force = new vec2d(forcex,forcey);
	this.friction = true;

	this.draw = function(){
		if(this.friction){
			this.vel.set(this.vel.x/1.05,this.vel.y/1.05);
		}
		context.beginPath();
		context.fillStyle=this.col;
		context.arc(this.loc.x,this.loc.y,this.rad,0,2*Math.PI);
  		context.fill();
	}

	this.move = function(index){
		this.loc.x+=(this.vel.x);
		this.loc.y+=(this.vel.y);
		
		// this.addForce();

		if((this.x>=canvas.width || this.x<=0)||(this.y<=0 || this.y>=canvas.height)){
			//validate wall
		}
		this.draw();
	}

	this.addForce = function(){
		// console.log(this.force.x);
		if(this.vel.x < 0.1){
			this.force.x = 0.5;
		}else {
			this.force.x+=(this.vel.x/20);
		}
		if(this.vel.y < 0.1){
			this.force.y = 0.5;
		}else {
			this.force.y+=(this.vel.y/20);
		}
	}
}

export function vec2d(x,y){
	this.x = x;
	this.y = y;

	this.set=function(x,y){
		this.x = x;
		this.y = y;
	}
}

export function Text(text){
	var x=canvas.width/2;
 	var y=canvas.height/2;
 	
	var ukuran=200;

 	context.textAlign = "center";
 	context.font = "bold "+ukuran+"px Arial";
 	context.strokeStyle = "white";
 	context.fillStyle="#f00";

 	context.strokeText(text,x,y);
 	draw_dot();
}

function draw_dot(){
	destination_arr=[];
 	var image_data=context.getImageData(0,0,canvas.width,canvas.height);
	var pixel=image_data.data;

	for(var i = 0 ; i < pixel.length ; i += 3){
		if(pixel[i] === 255){
			var angka=i/4;
			var x=(angka%canvas.width);
			var y=(angka/canvas.width);
			destination_arr.push(new vec2d(x,y));
		}
	}
	// console.log(destination_arr.length);
}

export function GetRandomDestText(){
	var rand = Math.round(Math.random()*destination_arr.length);
 	var temp = destination_arr.splice(rand,1);
 	if(typeof temp[0] === 'undefined') {
 		return {x : Math.random()*canvas.width, y : Math.random()*canvas.height};
 	}
 	return temp[0];
}

export function GetTextIndex(){
	return destination_arr.length;
}

export function GetRandomDest(){
	var temp = new vec2d();
	temp.set(Math.random()*canvas.width,Math.random()*canvas.height);
	return temp;
}