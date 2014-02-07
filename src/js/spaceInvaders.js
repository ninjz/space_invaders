var canvas, context;
var alien1, alien2, alien3, cannon, cannon_death, bullet, logo, bomb, 
death, alien1_1, alien2_1, alien3_1, bunker_01, bunker_02, bunker_03, bunker_04, bunker_05;
var invaderArray = []; // contains 2d array of aliens

var alien1Array = [];
var alien2Array = [];
var alien2Array_1 = [];
var alien3Array = [];
var alien3Array_1 = [];


var projectiles = [];
var bombs = [];

var player;
var switchFrame = false;
var lives;
var score;
var level;

var leftMark, rightMark;	// objects used as reference for when alien array should switch dirs
var moveState; // 0: right, 1: left, 2: down

var gameOverState = false;
var gameStarted = false;



function Marker(x,y){
	this.x = x;
	this.y = y;

	this.moveLeft = function(){
		this.x -= invaderSpeed;
	};

	this.moveRight = function(){
		this.x += invaderSpeed;
	};

	this.moveDown = function(){
		this.y += invaderSpeed;
	};

}

// ************************************************************************ 
// INIT
// called on load of the page
// *********************************************************************** 

function init(){
	
	alien1 = document.getElementById("alien1");
	alien1_1 = document.getElementById("alien1_1");
	alien2 = document.getElementById("alien2");
	alien2_1 = document.getElementById("alien2_1");
	alien3 = document.getElementById("alien3");
	alien3_1 = document.getElementById("alien3_1");
	bullet = document.getElementById("bullet");
	logo = document.getElementById("logo");
	bomb = document.getElementById("bomb");
	death = document.getElementById("death");
	cannon = document.getElementById("cannon");
	cannon_death = document.getElementById("cannon_death");
	bunker_01 = document.getElementById("bunker_01");

	canvas = document.getElementById("spaceInvaders");
	context = canvas.getContext("2d");
	context.fillStyle="black";
	context.fillRect(0,0,400,500);

	displayMenu();
	loadAssets();

}

var canShoot = true;
var delay = 800;

function handleInput(e) {
	if(e.keyCode == 39){
		// alert("right");
		player.moveRight();
	}
	if(e.keyCode == 37){
		// alert("left");
		player.moveLeft();
	}

	// space
	if(e.keyCode == 32){
		if(!gameStarted){
			gameStarted = true;
			newGame();
		} else {
			if(canShoot){
				player.shoot();
				canShoot = false;
				setTimeout(function(){canShoot = true;}, delay);
			}
		}
	}
}



var invaderPop;
function loadAssets(){
	var i;
	var alien1X = 63;
	var alien1Y = 20;
	var alien1num = 9;

	var alien2X = 50;
	var alien2X_1 = 50;
	var alien2Y = 45;
	var alien2Y_1 = 70;

	var alien2num = 8;

	var alien3X = 50;
	var alien3X_1 = 50;
	var alien3Y = 95;
	var alien3Y_1 = 120;
	var alien3num = 8;
	
	for(i = 0; i < alien1num; i++){
		alien1Array.push(new Invader(alien1, alien1X += 25, alien1Y));
	}


	for(i = 0; i < alien2num; i++){
		alien2Array.push(new Invader(alien2, alien2X += 30, alien2Y));
	}

	for(i = 0; i < alien2num; i++){
		alien2Array_1.push(new Invader(alien2, alien2X_1 += 30, alien2Y_1));
	}

	for(i = 0; i < alien3num; i++){
		alien3Array.push(new Invader(alien3, alien3X += 30, alien3Y));
	}

	for(i = 0; i < alien3num; i++){
		alien3Array_1.push(new Invader(alien3, alien3X_1 += 30, alien3Y_1));
	}

	invaderArray = [alien1Array, alien2Array, alien2Array_1, alien3Array, alien3Array_1];
	
	invaderPop = (alien1Array.length + alien2Array_1.length + alien2Array.length + alien3Array.length + alien3Array_1.length);

	leftMark = new Marker(50, alien1Y);
	rightMark = new Marker(alien3X + 50, alien1Y);


	player = new Cannon(canvas.width/2 - cannon.width/2, 440);
	if(bunkers.length != 3){
		bunkers[0] = new Bunker(canvas.width/2 - 20, 390);
		bunkers[1] = new Bunker(canvas.width/2 - 120, 390);
		bunkers[2] = new Bunker(canvas.width/2 + 80, 390);
	}
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
	context.font="15px monospace";
	context.fillStyle="white";
	context.fillText("LIVES",250,485);	
	context.fillText("SCORE:", 28,485);
	context.fillText(score, 100,483);
	for(i = 1; i < lives; i++){
		context.drawImage(cannon, lifeX, 470);
		lifeX += 40;
	}

	// ********************************************************************

	
	for(i = 0; i < bunkers.length; i++){
		bunkers[i].draw();
	}

	for(i = 0; i < bunkers.length; i++){
		for(var j = 0; j < bunkers[i].sections.length; j++){
			bunkers[i].sections[j].draw();
		}
	}

	for(i = 0; i < projectiles.length; i++){
		projectiles[i].draw();
	}

	for(i = 0; i < bombs.length; i++){
		if(bombs[i].active){
			bombs[i].draw();
		} else {
			context.drawImage(death, bombs[i].x - 10, bombs[i].y);
			bombs.splice(i, 1);
		}
		
	}

	for(i = 0; i < alien1Array.length; i++){
		alien1Array[i].draw();
	}

	for(i = 0; i < alien2Array.length; i++){
		alien2Array[i].draw();
	}

	for(i = 0; i < alien2Array_1.length; i++){
		alien2Array_1[i].draw();
	}

	for(i = 0; i < alien3Array.length; i++){
		alien3Array[i].draw();
	}

	for(i = 0; i < alien3Array_1.length; i++){
		alien3Array_1[i].draw();
	}


	player.draw();

	

	if(gameOverState){
		clearInterval(interval);
		clearInterval(frameInterval);
		gameOver();
	}
	

}



function displayMenu(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="black";
	context.fillRect(0,0,400,500);

	context.drawImage(logo, 85, 80);

	context.font="13px monospace";
	context.fillStyle="white";

	context.fillText("Press [SPACE] to start!",110,300);
	window.addEventListener('keydown', handleInput, true);

}


var lastY, prevState;

function tick(){
	var notEmpty = [];
	var temp = 0;

	for(var aliens in invaderArray){
		if(aliens.length > 0){
			notEmpty.push(temp);
			temp++;
		}
	}



	// randomly select invader to drop bomb
	if(time > decisionTime){
		var decision = Math.floor((Math.random()* choices) + 1);
		var rowDecision = Math.floor((Math.random()* notEmpty.length)+1);  // random number between 1 and lenght of temp.
		if(decision%2 == 0){

			switch(rowDecision){
				case 1:
					invaderArray[notEmpty[0]][Math.floor((Math.random()*(invaderArray[notEmpty[0]].length - 1)) + 0)].shoot();
					break;
				case 2:
					invaderArray[notEmpty[1]][Math.floor((Math.random()*(invaderArray[notEmpty[1]].length - 1)) + 0)].shoot();
					break;
				case 3:
					invaderArray[notEmpty[2]][Math.floor((Math.random()*(invaderArray[notEmpty[2]].length - 1)) + 0)].shoot();
					break;
				case 4:
					invaderArray[notEmpty[3]][Math.floor((Math.random()*(invaderArray[notEmpty[3]].length - 1)) + 0)].shoot();
					break;
				case 5:
					invaderArray[notEmpty[4]][Math.floor((Math.random()*(invaderArray[notEmpty[4]].length - 1)) + 0)].shoot();
					break;
			}

		}
		time = 0;
	}
	
	time++;

	// Alien array movement
	
	var i,j;

	// move right
	if(moveState == 0){
		for(i = 0; i < alien1Array.length; i++){
				alien1Array[i].moveRight();
			}
		for(i = 0; i < alien2Array.length; i++){
			alien2Array[i].moveRight();
		}
		for(i = 0; i < alien3Array.length; i++){
			alien3Array[i].moveRight();
		}
		for(i = 0; i < alien2Array_1.length; i++){
			alien2Array_1[i].moveRight();
		}
		for(i = 0; i < alien3Array_1.length; i++){
			alien3Array_1[i].moveRight();
		}

		leftMark.moveRight();
		rightMark.moveRight();

		if(rightMark.x >= canvas.width ){
			moveState = 2;
			prevState = 0;
			lastY = rightMark.y;
		}
	}

	// move down
	else if(moveState == 2){

		for(i = 0; i < alien1Array.length; i++){
			alien1Array[i].moveDown();
		}
		for(i = 0; i < alien2Array.length; i++){
			alien2Array[i].moveDown();
		}
		for(i = 0; i < alien3Array.length; i++){
			alien3Array[i].moveDown();
		}
		for(i = 0; i < alien2Array_1.length; i++){
			alien2Array_1[i].moveDown();
		}
		for(i = 0; i < alien3Array_1.length; i++){
			alien3Array_1[i].moveDown();
		}
		leftMark.moveDown();
		rightMark.moveDown();

		if( (rightMark.y - lastY) >= 20){
			if(prevState == 0){
				moveState = 1;
			} else {
				moveState = 0;
			}
			

		}
	}

	// move left
	else if (moveState == 1) {
		for(i = 0; i < alien1Array.length; i++){
			alien1Array[i].moveLeft();
		}
		for(i = 0; i < alien2Array.length; i++){
			alien2Array[i].moveLeft();
		}
		for(i = 0; i < alien3Array.length; i++){
			alien3Array[i].moveLeft();
		}
		for(i = 0; i < alien2Array_1.length; i++){
			alien2Array_1[i].moveLeft();
		}
		for(i = 0; i < alien3Array_1.length; i++){
			alien3Array_1[i].moveLeft();
		}
		leftMark.moveLeft();
		rightMark.moveLeft();

		if(leftMark.x <= 0){
			moveState = 2;
			prevState = 1;
			lastY = rightMark.y;
		}
	}

	if((leftMark.y >= (canvas.height/4)) && speedIncrease == 0){
		invaderSpeed += 0.1;
		speedIncrease++;
	}

	if((leftMark.y >= (canvas.height/2)) && speedIncrease == 1){
		invaderSpeed += 0.1;
		speedIncrease++;
	}

	if(leftMark.y >= ((canvas.height*2)/3)){
		clearInterval(frameInterval);
		clearInterval(interval);
		gameOverState = true;
	}

	if(invaderPop == 0){
		clearInterval(frameInterval);
		clearInterval(interval);
		nextLevel();
	}

	draw();
	
}

var decisionTime;
var choices;
var time;
var invaderSpeed;
var speedIncrease;

function newGame(){
	gameOverState = false;
	player.alive = true;

	delay = 800;
	speedIncrease = 0;
	invaderSpeed = 0.2;
	moveState = 0;
	lives = 3;
	level = 0;
	score = 0;
	time = 0;
	decisionTime = 50;
	choices = 95;

	// empty these arrays
	projectiles.length = 0;
	bombs.length = 0;

	alien1Array.length = 0;
	alien2Array.length = 0;
	alien2Array_1.length = 0;
	alien3Array.length = 0;
	alien3Array_1.length = 0;
	invaderArray.length = 0;
	bunkers.length = 0;

	loadAssets();

	frameInterval = setInterval(setFrame, 400);
	interval = setInterval(tick, 20);
}

function nextLevel(){
	time = 0;
	decisionTime -= 1;
	choices -= 3;
	invaderSpeed += 0.1;
	moveState = 0;
	speedIncrease = 0;
	delay -= 100;

	if(delay <= 0){
		delay = 0;
	}

	if(decisionTime == 0){
		decisionTime = 0;
	}

	if(choices <= 0 ){
		choices = 0;
	}


	// empty these arrays
	projectiles.length = 0;
	bombs.length = 0;

	alien1Array.length = 0;
	alien2Array.length = 0;
	alien2Array_1.length = 0;
	alien3Array.length = 0;
	alien3Array_1.length = 0;
	invaderArray.length = 0;

	loadAssets();

	frameInterval = setInterval(setFrame, 400);
	interval = setInterval(tick, 20);

}

function gameOver(){
	gameStarted = false;

	context.font="23px monospace";
	context.fillStyle="white";

	context.fillText("GAME OVER",130,250);

}


function setFrame(){
	switchFrame = !switchFrame;
}

// ************************************************************************ 
// Bunker Class Object
// *********************************************************************** 
var bunkers = [];

function Bunker(x, y){
	this.state = 1; // state 0 == destroyed
	this.sections = [];

	this.x = x;
	this.y = y;

	// setup sections
	this.numSections = bunker_01.width/(bomb.width - 4) ;
	for(var i = 0; i < this.numSections; i++){
		if((i > (this.numSections/3)) && (i < (this.numSections - (this.numSections/3) - 1))){
			this.sections[i] = new BunkerSection(this.x + (i*(bomb.width - 4)), this.y, 2);
		} else {
			this.sections[i] = new BunkerSection(this.x + (i*(bomb.width - 4)), this.y, 3);
		}
		
	}

	this.draw=function(){
		switch(this.state){
			case 1:
				context.drawImage(bunker_01, this.x, this.y);
				this.width = bunker_01.width;
				this.height = bunker_01.height;
				break;
			case 2:
				context.drawImage(bunker_02, this.x, this.y);
				break;
			case 3:
				context.drawImage(bunker_03, this.x, this.y);
				break;
			case 4:
				context.drawImage(bunker_04, this.x, this.y);
				break;
			case 5:
				context.drawImage(bunker_05, this.x, this.y);
				break;
		}
	};
}

function BunkerSection(x, y, lives){
	this.destroyed = false;
	this.startY = y;
	this.startX = x;
	this.x = x;
	this.y = y;
	this.width = bomb.width;
	this.height = bunker_01.height;
	this.origLife = lives;
	this.lives = lives;
	this.timesHitTop = 0;
	this.timesHitBottom = 0;

	this.draw = function(){
		context.fillStyle="black";
		context.fillRect(this.startX,this.startY, bomb.width - 4, (this.timesHitTop*bomb.height) + 1);
		if(this.origLife == 2 && this.lives == 0){
			context.fillRect(this.startX, 
					((this.startY + bunker_01.height) - (this.timesHitBottom * bomb.height) - 10), 
					bomb.width - 4, 
					(this.timesHitBottom*bomb.height) + 2);
		} else {
			context.fillRect(this.startX, 
					((this.startY + bunker_01.height) - (this.timesHitBottom * bomb.height) + 2), 
					bomb.width - 4, 
					(this.timesHitBottom*bomb.height) + 2);
		}
		
	};

	this.destroy = function(){
		this.destroyed = true;
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
	};
}


// ************************************************************************ 
// Invader Class Object
// *********************************************************************** 


function Invader(type, x, y){
	this.constructor.population++;
	this.alive=true;
	this.type = type;
	this.x = x;
	this.y = y;
	this.width = type.width;
	this.height = type.height;

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
		if(this.alive){
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
		}
	};

	this.kill = function(){
		this.alive = false;
		context.fillStyle="black";
		context.fillRect(this.x,this.y,this.width,this.height);
		context.drawImage(death, this.x - 3, this.y);
		invaderPop--;

	};

	this.shoot=function(){
		if(this.alive){
			bombs.push(new Bomb(this.x + 11, this.y+10));
		}
		
	};
	
}


// ************************************************************************ 

// ************************************************************************ 
// Cannon Class Object
// *********************************************************************** 
function Cannon(x, y){

	this.alive = true;
	this.x = x;
	this.y = y;
	this.width = cannon.width;
	this.height = cannon.height;

	this.moveLeft=function(){
		this.x -= 5;
		if(this.x < 0){
			this.x = 0;
		} 
	};

	this.moveRight=function(){
		this.x += 5;
		if ((this.x + cannon.width) > canvas.width){
			this.x = canvas.width - cannon.width;
		}
	};

	this.shoot=function(){
		projectiles.push(new Projectile(this.x + 11, this.y-10));
	};

	this.kill=function(){
		this.alive = true;
		context.drawImage(cannon_death, this.x, this.y);
	};

	this.draw=function(){
		if(this.alive){
			context.drawImage(cannon, this.x, this.y);
		} else {
			this.alive = true;
			context.drawImage(cannon_death, this.x, this.y);
		}
		

	};

}


// ************************************************************************ 

// ************************************************************************ 
// Projectile Class Object
// *********************************************************************** 
function Projectile(x, y){

	this.active = true;
	this.x = x;
	this.y = y;
	this.width = bullet.width;
	this.height = bullet.height;

	this.draw=function(){
		
		if(this.active && this.y >= 0){
			//deallocate self
			context.drawImage(bullet, this.x, this.y-=5);
		}
		if(this.active){

			for(var i = 0; i < alien3Array.length; i++){
				if(alien3Array[i].alive){
					if(testHit(alien3Array[i], this)){
						alien3Array[i].kill();
						score += 100;
						this.active = false;
					}
				}
				
			}

			for(i = 0; i < alien2Array.length; i++){
				if(alien2Array[i].alive){
					if(testHit(alien2Array[i], this)){
						alien2Array[i].kill();
						score += 100;
						this.active = false;	
					}
				}
			}

			for(i = 0; i < alien1Array.length; i++){
				if(alien1Array[i].alive){
					if(testHit(alien1Array[i], this)){
						alien1Array[i].kill();
						score += 100;
						this.active = false;
					}
				}
				
			}
			for(i = 0; i < alien2Array_1.length; i++){
				if(alien2Array_1[i].alive){
					if(testHit(alien2Array_1[i], this)){
						alien2Array_1[i].kill();
						score += 100;
						this.active = false;
					}
				}
				
			}
			for(i = 0; i < alien3Array_1.length; i++){
				if(alien3Array_1[i].alive){
					if(testHit(alien3Array_1[i], this)){
						alien3Array_1[i].kill();
						score += 100;
						this.active = false;
					}
				}
				
			}


			for(var k = 0; k < bunkers.length; k++){
				for(var j = 0; j < bunkers[k].numSections; j++){


					if(!bunkers[k].sections[j].destroyed){
						if(testHit(bunkers[k].sections[j], this)){
								bunkers[k].sections[j].height -= this.height;

								bunkers[k].sections[j].lives--;
								bunkers[k].sections[j].timesHitBottom++;

						 		if(bunkers[k].sections[j].lives == 0){
									bunkers[k].sections[j].destroy();
								}
								this.active = false;
					 	}
							
					}
				}
			}
		}	
	};
}

// ************************************************************************ 
// Tests if two entities collide with each other.
// both entities must have x,y,width,height defined.
// *********************************************************************** 
function testHit(a, b){
	return !(a.x + a.width < b.x ||
           b.x + b.width < a.x ||
           a.y + b.height < b.y ||
           b.y + b.height < a.y);
}

// ************************************************************************ 
// Bomb Class Object
// *********************************************************************** 
function Bomb(x, y){

	this.hitBunker = false;
	this.active = true;
	this.x = x;
	this.y = y;
	this.width = bomb.width;
	this.height = bomb.height;

	this.draw=function(){

		if(this.y <= 500){
			context.drawImage(bomb, this.x, this.y += 3);
		}

		if(testHit(player, this)){
			player.alive = false;
			lives--;
			// restart game?
			if(lives == 0){
				// GAME OVER
				gameOverState = true;
			}
			this.active = false;
		}

		for(var k = 0; k < bunkers.length; k++){
			for(var j = 0; j < bunkers[k].numSections; j++){


				if(!bunkers[k].sections[j].destroyed){
					if(testHit(bunkers[k].sections[j], this)){

							this.hitBunker = true;
							bunkers[k].sections[j].y += this.height;

							bunkers[k].sections[j].lives--;
							bunkers[k].sections[j].timesHitTop++;

					 		if(bunkers[k].sections[j].lives == 0){
					 			console.log("destroyed");
								bunkers[k].sections[j].destroy();
							}
							this.active = false;
				 	}
						
				}
			}
				
		}
			
			
		if(this.y >= canvas.height){
			this.active = false;
		}
			

		
	};
}



