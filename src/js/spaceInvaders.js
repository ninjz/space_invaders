var canvas, context;
var alien1, alien2, alien3, cannon, bullet, logo;
var invaderArray = [];
var alien1Array = [];
var alien2Array = [];
var alien3Array = [];
var projectiles = [];
var player;
var switchFrame = false;
var lives = 2;
var score = 0;


// ************************************************************************ 
// INIT
// called on load of the page
// *********************************************************************** 

function init(){
	
	alien1 = new Image();
	alien1_1 = new Image();

	alien2 = new Image();
	// alien2_1 = newImage();

	alien3 = new Image();
	// alien2_1 = newImage();
	cannon = new Image();
	bullet = new Image();
	logo = new Image();

	alien1.src = "alien01_01.png";
	alien1_1.src = "alien01_02.png";

	alien2.src = "alien02_01.png";
	alien3.src = "alien03_01.png";
	cannon.src = "cannon.png";
	bullet.src = "bullet.png";

	logo.src = "logo.png";

	canvas = document.getElementById("spaceInvaders");
	context = canvas.getContext("2d");
	context.fillStyle="black";
	context.fillRect(0,0,400,500);

	displayMenu();
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

	if(e.keyCode == 32){
		player.shoot();
	}

	if(e.keyCode == 9){
		// loadAssets();
		tick();
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

		// tick();
	};

	setFrame();
	
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
		this.y++;
	};

	this.moveLeft=function(){
		this.x--;
	};

	this.moveRight=function(){
		this.x++;
	};

	this.draw=function(){
		// context.drawImage(this.type, this.x, this.y);
		if(switchFrame){
			context.drawImage(alien1, this.x, this.y);
		} else {
			context.drawImage(alien1_1, this.x , this.y);
		}
		
	};

	this.testHit = function(x , y){

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
		if(this.x < 0){
			this.x = 0;
		} 
	};

	this.moveRight=function(){
		this.x += 5;
		if (this.x > 400){
			this.x = 380;
		}
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

	var active = true;
	this.x = x;
	this.y = y;

	this.draw=function(){
		context.drawImage(bullet, this.x, this.y-=5);
		if(this.y < 0){
			//deallocate self
		}
		if(active){
			for(var i = 0; i < alien3Array.length; i++){
			// alert("YOO");
				if(( Math.abs(alien3Array[i].x - this.x) < 20) &&
					(Math.abs(alien3Array[i].y - this.y) < 10)){

					alien3Array.splice(i, 1);
					score += 100;
					active = false;
				}
			}

			for(i = 0; i < alien2Array.length; i++){
				// alert("YOO");
				if(( Math.abs(alien2Array[i].x - this.x) < 20) &&
					(Math.abs(alien2Array[i].y - this.y) < 10)){

					alien2Array.splice(i, 1);
					score += 200;
					active = false;	
				}
			}

			for(i = 0; i < alien1Array.length; i++){
				// alert("YOO");
				if(( Math.abs(alien1Array[i].x - this.x) < 10) &&
					(Math.abs(alien1Array[i].y - this.y) < 10)){

					alien1Array.splice(i, 1);
					score += 100;
					active = false;
				}
			}
		}
		
	};

}


// ************************************************************************ 
// Main game loop.
// *********************************************************************** 

function draw(){
	var i = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="black";
	context.fillRect(0,0,400,500);

	// HUD
	var lifeX = 310;
	context.font="15px Georgia";
	context.fillStyle="white";
	context.fillText("LIVES",250,485);	
	context.fillText("SCORE:", 28,485);
	context.fillText(score, 100,483);
	for(i = 0; i < lives; i++){
		context.drawImage(cannon, lifeX, 470);
		lifeX += 40;
	}

	// ********************************************************************

	player.draw();

	for(i = 0; i < alien1Array.length; i++){
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

function displayMenu(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="black";
	context.fillRect(0,0,400,500);

	context.drawImage(logo, 85, 80);

	context.font="20px Georgia";
	context.fillStyle="white";

	context.fillText("Press [TAB} to start!",110,300);
	window.addEventListener('keydown', handleInput, true);

}

function tick(){
	// HUD 

	// move aliens
	// if(){
		// for(var i = 0; i < alien1Array.length; i++){
		// 	alien1Array[i].moveDown();
		// }

		// for(i = 0; i < alien2Array.length; i++){
		// 	alien2Array[i].moveDown();
		// }

		// for(i = 0; i < alien3Array.length; i++){
		// 	alien3Array[i].moveDown();
		// }
	// }
	

	// randomly select invader to drop bomb

	draw();
	setTimeout(function(){tick();}, 5);
	
}

function setFrame(){
	switchFrame = !switchFrame;
	setTimeout(function(){setFrame();}, 300);
}




