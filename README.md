space_invaders
==============

           ___________________  _____  _________ ___________            
          /   _____/\______   \/  _  \ \_   ___ \\_   _____/            
          \_____  \  |     ___/  /_\  \/    \  \/ |    __)_             
          /        \ |    |  /    |    \     \____|        \            
         /_______  / |____|  \____|__  /\______  /_______  /            
                 \/                  \/        \/        \/             
.___ ___________   _________  ________  _____________________  _________
|   |\      \   \ /   /  _  \ \______ \ \_   _____/\______   \/   _____/
|   |/   |   \   Y   /  /_\  \ |    |  \ |    __)_  |       _/\_____  \ 
|   /    |    \     /    |    \|    `   \|        \ |    |   \/        \
|___\____|__  /\___/\____|__  /_______  /_______  / |____|_  /_______  /
            \/              \/        \/        \/         \/        \/ 

CREATED BY: c1chengc
			Calvin Cheng
			997717840


//===============================================//
// HOW TO PLAY:                                  //
// [SPACE] : To shoot 							 //
// [<-]    : Move Left							 //
// [->]    : Move Right							 //
//===============================================// 

All the game logic is implemented in the javascript code: '/js/spaceInvaders.js'. 
I defined Objects: for individual invaders, the player cannon, defense bunkers, 
player projectiles, and invader bombs. Within each of these objects, each had a
draw function, that is called in the main game draw loop 'draw()'. Within each of 
the draw functions, for the projectiles; the collision detection is handled. Each
object was given a height, width, x and y which was able to determine their hitboxes.
	The bunkers are fully destroyable, and I implemented this by having a number of 
column sections within each bunker that are destroyable. Depending if the player 
or the invader hit the bunker, its corresponding side would break. The breaking of 
the bunkers is done, through just drawing a black rectangle in its place, and making 
sure the draw call to those black rectangles are after the bunkers in the 'draw()' 
function. 
	As the invaders move closer and closer to the bottom, their speed increases. And 
as you pass each level, their decision on when to shoot bombs becomes faster and 
faster resulting in more bombs being thrown down. All of the AI logic and movement is 
implemented in the 'tick()' function which is always called before the 'draw()'. 
	
* All the art used was replicated from the original. I did not have enough time to  *
* make my own design, though i would have liked to do that. 						*
	