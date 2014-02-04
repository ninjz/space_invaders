var canvas, context;
var alien1, alien2, alien3, cannon, bullet;
var alien1Array = [];
var alien2Array = [];
var alien3Array = [];
var projectiles = [];
var player;



// ************************************************************************ 
// INIT
// called on load of the page
// *********************************************************************** 

function init(){
	
	alien1 = new Image();
	alien2 = new Image();
	alien3 = new Image();
	cannon = new Image();
	bullet = new Image();

	alien1.src = "alien01_01.png";
	alien2.src = "alien02_01.png";
	alien3.src = "alien03_01.png";
	cannon.src = "cannon.png";
	bullet.src = "bullet.png";

	canvas = document.getElementById("spaceInvaders");
	context = canvas.getContext("2d");
	context.fillStyle="black";
	context.fillRect(0,0,400,500);


	loadAssets();

	// tick();
}

// var map = {39}
function handleInput(e) {
	if(e.keyCode == 39){
		// alert("right");
		player.moveRight();
	}
	if(e.keyCode == 37){
		// alert("left");
		player.moveLeft();
	}

	if(e.keyCode == 38){
		player.shoot();
	}
}

function loadAssets(){
	alien1.onload = function() {
		var startX = 60;
		for(var i = 0; i < 9; i++){
			alien1Array.push(new Invader(alien1, startX += 25, 20));
		}

		// alien1Array.push(new Invader(alien1, 24, 20));
	};

	alien2.onload = function() {
		var startX = 50;
		for(var i = 0; i < 8; i++){
			alien2Array.push(new Invader(alien2, startX += 30, 45));
		}
	};

	alien3.onload = function() {
		var startX = 50;
		for(var i = 0; i < 8; i++){
			alien3Array.push(new Invader(alien3, startX += 30, 75));
		}
	};


	cannon.onload = function() {
		player = new Cannon(180, 450);
		tick();
	};

	window.addEventListener('keydown', handleInput, true);
}





// ************************************************************************ 
// Invader Class Object
// *********************************************************************** 
function Invader(type, x, y){
	this.constructor.population++;

	var alive=true;
	this.type = type;
	this.x = x;
	this.y = y;

	this.moveDown=function(){

	};

	this.moveLeft=function(){

	};

	this.moveRight=function(){

	};

	this.draw=function(){
		context.drawImage(this.type, this.x, this.y);
	};
	
}

Invader.population = 0;

// Invader.prototype.draw = function(context){
// context.drawImage(this.type, this.x, this.y);
// };

// ************************************************************************ 

// ************************************************************************ 
// Cannon Class Object
// *********************************************************************** 
function Cannon(x, y){

	var alive=true;
	this.x = x;
	this.y = y;

	this.moveLeft=function(){
		this.x -= 5;
	};

	this.moveRight=function(){
		this.x += 5;
	};

	this.shoot=function(){
		projectiles.push(new Projectile(this.x + 11, this.y-10));
	};

	this.draw=function(){
		context.drawImage(cannon, this.x, this.y);

	};

}


// ************************************************************************ 

// ************************************************************************ 
// Projectile Class Object
// *********************************************************************** 
function Projectile(x, y){

	this.x = x;
	this.y = y;

	this.draw=function(){
		context.drawImage(bullet, this.x, this.y-=5);
		if(this.y < 0){
			//deallocate self
		}

		for(var i = 0; i < alien3Array.length; i++){
			// alert("YOO");
			if(( Math.abs(alien3Array[i].x - this.x) < 20) &&
				(Math.abs(alien3Array[i].y - this.y) < 10)){

				alien3Array.splice(i, 1);
			}
		}

		for(i = 0; i < alien2Array.length; i++){
			// alert("YOO");
			if(( Math.abs(alien2Array[i].x - this.x) < 20) &&
				(Math.abs(alien2Array[i].y - this.y) < 10)){

				alien2Array.splice(i, 1);
			}
		}

		for(i = 0; i < alien1Array.length; i++){
			// alert("YOO");
			if(( Math.abs(alien1Array[i].x - this.x) < 10) &&
				(Math.abs(alien1Array[i].y - this.y) < 10)){

				alien1Array.splice(i, 1);
			}
		}
	};

}


// ************************************************************************ 

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="black";
	context.fillRect(0,0,400,500);


	player.draw();

	for(var i = 0; i < alien1Array.length; i++){
		alien1Array[i].draw();
	}

	for(i = 0; i < alien2Array.length; i++){
		alien2Array[i].draw();
	}

	for(i = 0; i < alien3Array.length; i++){
		alien3Array[i].draw();
	}

	for(i = 0; i < projectiles.length; i++){
		projectiles[i].draw();
	}



}

function tick(){
	// randomly select invader to drop bomb

	draw();
	setTimeout(function(){tick();}, 1);
}




