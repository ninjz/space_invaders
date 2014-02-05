var canvas, context;
var alien1, alien2, alien3, cannon, bullet, logo, bomb;
var alien1_1, alien2_1, alien3_1;
var images = [];
var invaderArray = [];
var alien1Array = [];
var alien2Array = [];
var alien3Array = [];
var projectiles = [];
var bombs = [];
var player;
var switchFrame = false;
var lives = 2;
var score = 0;
var moveState = 0; // 0: right, 1: left, 2: down


// ************************************************************************ 
// INIT
// called on load of the page
// *********************************************************************** 

function init(){
	
	alien1 = new Image();
	alien1_1 = new Image();

	alien2 = new Image();
	alien2_1 = new Image();

	alien3 = new Image();
	alien3_1 = new Image();
	bullet = new Image();
	logo = new Image();
	bomb = new Image();

	cannon = new Image();
	

	alien1.src = "alien01_01.png";
	alien1_1.src = "alien01_02.png";
	alien2_1.src = "alien02_02.png";
	alien3_1.src = "alien03_02.png";

	alien2.src = "alien02_01.png";
	alien3.src = "alien03_01.png";
	bullet.src = "bullet.png";

	logo.src = "logo.png";
	bomb.src = "alien_bomb.png";
	cannon.src = "cannon.png";
	
	images = [alien1,alien2,alien3, alien1_1, alien2_1, alien3_1, cannon, bullet, logo];

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
var invaderSpeed = 0.5;
function Invader(type, x, y){
	this.constructor.population++;
	var alive=true;
	this.type = type;
	this.x = x;
	this.y = y;

	this.moveDown=function(){
		this.y += invaderSpeed;
	};

	this.moveLeft=function(){
		this.x -= invaderSpeed;
	};

	this.moveRight=function(){
		this.x += invaderSpeed;
	};

	this.draw=function(){
		// context.drawImage(this.type, this.x, this.y);
		switch(this.type)
		{
			case alien1:
				if(switchFrame){
					context.drawImage(alien1, this.x, this.y);
				} else {
					context.drawImage(alien1_1, this.x , this.y);
				}
				break;
			case alien2:
				if(switchFrame){
					context.drawImage(alien2, this.x, this.y);
				} else {
					context.drawImage(alien2_1, this.x , this.y);
				}
				break;
			case alien3:
				if(switchFrame){
					context.drawImage(alien3, this.x, this.y);
				} else {
					context.drawImage(alien3_1, this.x , this.y);
				}
				break;
			default:
				break;

		}
		
		
	};

	this.shoot=function(){
		bombs.push(new Bomb(this.x + 11, this.y+10));
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
// Bomb Class Object
// *********************************************************************** 
function Bomb(x, y){

	var active = true;
	this.x = x;
	this.y = y;

	this.draw=function(){
		context.drawImage(bomb, this.x, this.y += 5);
		if(this.y > 0){
			//deallocate self
		}
		if(active){
			if( Math.abs(this.x - player.x) < 30){
				lives--;
				// restart game?
				if(lives == 0){
					// GAME OVER
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

	for(i = 0; i < bombs.length; i++){
		bombs[i].draw();
	}

}



function displayMenu(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="black";
	context.fillRect(0,0,400,500);

	context.drawImage(logo, 85, 80);

	context.font="20px Georgia";
	context.fillStyle="white";

	context.fillText("Press [TAB] to start!",110,300);
	window.addEventListener('keydown', handleInput, true);

}


function tick(){
	// HUD 
	var colDecision;
	var rowDecision = Math.floor((Math.random()*3)+1);  // random number between 1 and 3.
	switch(rowDecision){
		case 1:
			alien1Array[Math.floor((Math.random()*(alien1Array.length - 1)) + 0)].shoot();
			break;
		case 2:
			alien2Array[Math.floor((Math.random()*(alien2Array.length - 1)) + 0)].shoot();
			break;
		case 3:
			alien3Array[Math.floor((Math.random()*(alien2Array.length - 1)) + 0)].shoot();
			break;
	}


	switch(moveState){
		case 0:
			for(var i = 0; i < alien1Array.length; i++){
				alien1Array[i].moveRight();
			}

			for(i = 0; i < alien2Array.length; i++){
				alien2Array[i].moveRight();
			}

			for(i = 0; i < alien3Array.length; i++){
				alien3Array[i].moveRight();
			}

			// if(alien3Array[alien3Array.length - 1].x == 350){
			// 	startMove = 1;
			// }
			break;
		case 1:
			for(var i = 0; i < alien1Array.length; i++){
				alien1Array[i].moveLeft();
			}

			for(i = 0; i < alien2Array.length; i++){
				alien2Array[i].moveLeft();
			}

			for(i = 0; i < alien3Array.length; i++){
				alien3Array[i].moveLeft();
			}
			// if(alien3Array[0].x <= 10){
			// 	startMove = 0;
			// }

			break;
		case 2:
			for(var i = 0; i < alien1Array.length; i++){
				alien1Array[i].moveDown();
			}

			for(i = 0; i < alien2Array.length; i++){
				alien2Array[i].moveDown();
			}

			for(i = 0; i < alien3Array.length; i++){
				alien3Array[i].moveDown();
			}

			break;

	}
	
	

	// randomly select invader to drop bomb

	draw();
	setTimeout(function(){tick();}, 5);
	
}

var startX = 0;
function setFrame(){
	switchFrame = !switchFrame;
	// move aliens
	startX++;
	console.log(startX);
	if(startX >= 10){
		moveState = 2;
	} 

	if(startX >= 11){
		moveState = 1;
	}

	if(startX >= 21){
		moveState = 2;
	}

	if(startX >= 22){
		moveState = 0;
		startX = 0;
	}



	

	setTimeout(function(){setFrame();}, 300);
}




