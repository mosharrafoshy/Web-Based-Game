var context;
var queue;
var WIDTH = 1350;
var HEIGHT = 640;
var mouseXPosition;
var mouseYPosition;
var pandaImage;
var stage;
var animation;
var deathAnimation;
var canonanimation;
var bulletanimation1;
var bulletanimation2;
var bulletanimation3;
var bulletanimation4;
var spriteSheet;
var pandaXPos=100;
var pandaYPos=100;
var pandaXPosb=100;
var pandaYPosb=200;
var pandaXSpeed = 10.0;
var pandaYSpeed = 1.75;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var timerText;
var xx=0;
var current=true;
var serial=1;
var flapserial=1;
var distX;
var distY;
var right=true;
var left=false;
window.onload = function()
{
    /*
     *      Set up the Canvas with Size and height
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    /*
     *      Set up the Asset Queue and load sounds
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    /*
     *      Create a load manifest for all assets
     *
     */
    queue.loadManifest([
        {id: 'backgroundImage', src: 'assets/bg.png'},
        {id: 'crossHair', src: 'assets/crosshair.png'},
        {id: 'shot', src: 'assets/shot.mp3'},
        {id: 'background', src: 'assets/bgmusic.mp3'},
        {id: 'gameOverSound', src: 'assets/gameOver.mp3'},
        {id: 'tick', src: 'assets/tick.mp3'},
        {id: 'deathSound', src: 'assets/die.mp3'},
        {id: 'pandaSpritesheet1', src: 'assets/panda_final11.png'},
        {id: 'pandaSpritesheet2', src: 'assets/panda_final11.png'},
        {id: 'pandaSpritesheet3', src: 'assets/panda_final11.png'},
        {id: 'pandaSpritesheet4', src: 'assets/panda_final11.png'},
        {id: 'pandaSpritesheetflap1', src: 'assets/panda_final2.png'},
        {id: 'pandaSpritesheetflap2', src: 'assets/panda_final2.png'},
        {id: 'pandaSpritesheetflap3', src: 'assets/panda_final2.png'},
        {id: 'pandaSpritesheetflap4', src: 'assets/panda_final2.png'},
        {id: 'pandaDeath', src: 'assets/pandadeath.png'},
        {id: 'pandaDeathflip', src: 'assets/pandadeath2.png'},        
        {id: 'canon', src: 'assets/kaman.png'},
        {id: 'canon1', src: 'assets/kaman1.png'},
        {id: 'SpriteSheetStand', src: 'assets/panda_final1.png'},
        {id: 'bullet', src: 'assets/bullet.png'},
        {id: 'bullet2', src: 'assets/bullet2.png'},
        
           
    ]);
    queue.load();

    /*
     *      Create a timer that updates once per second
     *
     */
    gameTimer = setInterval(updateTime, 1000);

}

function queueLoaded(event)
{
    // Add background image
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"))
    stage.addChild(backgroundImage);

    //Add Score
    scoreText = new createjs.Text("1UP: " + score.toString(), "36px Arial", "#FFF");
    scoreText.x = 10;
    scoreText.y = 10;
    stage.addChild(scoreText);

    //Ad Timer
    timerText = new createjs.Text("Time: " + gameTime.toString(), "36px Arial", "#FFF");
    timerText.x = 800;
    timerText.y = 10;
    stage.addChild(timerText);

    // Play background sound
    createjs.Sound.play("background", {loop: -1});

    // Create panda spritesheet
    spriteSheet1 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheet1')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [0,0] }
    });
    spriteSheet2 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheet2')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [1,1] }
    });
    spriteSheet3 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheet3')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [2,2] }
    });
    spriteSheet4 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheet4')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [3,3] }
    });
    
    SpriteSheetStand = new createjs.SpriteSheet({
        "images": [queue.getResult('SpriteSheetStand')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [0,0] }
    });
    
    spriteSheetflap1 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheetflap1')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [0,0] }
    });
     spriteSheetflap2 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheetflap2')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [1,1] }
    }); spriteSheetflap3 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheetflap3')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [2,2] }
    }); spriteSheetflap4 = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaSpritesheetflap4')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [3,3] }
    });

    // Create panda death spritesheet
    pandaDeathSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaDeath')],
        "frames": {"width": 198, "height" : 117},
        "animations": {"die": [0,7, false,1 ] }
    });

    pandaDeathSpriteSheetflip = new createjs.SpriteSheet({
        "images": [queue.getResult('pandaDeathflip')],
        "frames": {"width": 198, "height" : 117},
        "animations": {"die": [0,7, false,1 ] }
    });
    
    canonSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('canon')],
        "frames": {"width": 200, "height" : 128},
        "animations": { "flap": [0,0] }
    });
    canonSpriteSheet1 = new createjs.SpriteSheet({
        "images": [queue.getResult('canon1')],
        "frames": {"width": 200, "height" : 128},
        "animations": { "flap": [0,0] }
    });
    bulletSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bullet')],
        "frames": {"width": 45, "height" : 46},
        "animations": { "flap": [0,0] }
    });
    bulletSpriteSheetflip = new createjs.SpriteSheet({
        "images": [queue.getResult('bullet2')],
        "frames": {"width": 45, "height" : 46},
        "animations": { "flap": [0,0] }
    });
    
    
    // Create panda sprite
    createBullet1(); 
    createBullet3(); 
       
    createCanon();
    createpanda();
    

   /*
    // Create crosshair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = WIDTH/2;
    crossHair.y = HEIGHT/2;
    stage.addChild(crossHair);
    */

    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    // Set up events AFTER the game is loaded
   // window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
    window.onkeydown = checkKey;
}

function createpanda()
{
    if(xx==0)
    {
        stage.removeChild(animation);
        animation = new createjs.Sprite(SpriteSheetStand, "flap");
        animation.regX = 120;
        animation.regY = -10;
        animation.x = pandaXPos;
        animation.y = pandaYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);
        xxx=1;

    }

    
}

function createCanon()
{
    //if(xxx==0)
    //{
    
        canonanimation = new createjs.Sprite(canonSpriteSheet, "flap");
        canonanimation.regX = 99;
        canonanimation.regY = 58;
        canonanimation.x = pandaXPos+1300;
        canonanimation.y = pandaYPos+80;
        canonanimation.gotoAndPlay("flap");
        stage.addChildAt(canonanimation,1);
        canonanimation1 = new createjs.Sprite(canonSpriteSheet1, "flap");
        canonanimation1.regX = 99;
        canonanimation1.regY = 58;
        canonanimation1.x = pandaXPos-155;
        canonanimation1.y = pandaYPos+330;
        canonanimation1.gotoAndPlay("flap");
        stage.addChildAt(canonanimation1,2);
        //xxx=1;
        
    //}

    
}
function createBullet1()
{
    //if(xxx==0)
    //{
        pandaXPosb1=1349;
        pandaYPosb1=200;
        
        stage.removeChild(bulletanimation1);
        bulletanimation1 = new createjs.Sprite(bulletSpriteSheet, "flap");
        bulletanimation1.regX = 99;
        bulletanimation1.regY = 58;
        bulletanimation1.x = pandaXPosb1;
        bulletanimation1.y = pandaYPosb1;
        bulletanimation1.gotoAndPlay("flap");
        stage.addChildAt(bulletanimation1,1);
        //xxx=1;
        
    //}

    
}
function createBullet2()
{
    //if(xxx==0)
    //{
        pandaXPosb2=1349;
        pandaYPosb2=200;
        
        stage.removeChild(bulletanimation2);
        bulletanimation2 = new createjs.Sprite(bulletSpriteSheet, "flap");
        bulletanimation2.regX = 99;
        bulletanimation2.regY = 58;
        bulletanimation2.x = pandaXPosb2;
        bulletanimation2.y = pandaYPosb2;
        bulletanimation2.gotoAndPlay("flap");
        stage.addChildAt(bulletanimation2,1);
        //xxx=1;
        
    //}

    
}
function createBullet3()
{
    //if(xxx==0)
    //{
        pandaXPosb3=150;
        pandaYPosb3=450;
        
        stage.removeChild(bulletanimation3);
        bulletanimation3 = new createjs.Sprite(bulletSpriteSheetflip, "flap");
        bulletanimation3.regX = 99;
        bulletanimation3.regY = 58;
        bulletanimation3.x = pandaXPosb3;
        bulletanimation3.y = pandaYPosb3;
        bulletanimation3.gotoAndPlay("flap");
        stage.addChildAt(bulletanimation3,1);
        //xxx=1;
        
    //}

    
}
function createBullet4()
{
    //if(xxx==0)
    //{
        pandaXPosb4=150;
        pandaYPosb4=450;
        
        stage.removeChild(bulletanimation4);
        bulletanimation4 = new createjs.Sprite(bulletSpriteSheetflip, "flap");
        bulletanimation4.regX = 99;
        bulletanimation4.regY = 58;
        bulletanimation4.x = pandaXPosb;
        bulletanimation4.y = pandaYPosb;
        bulletanimation4.gotoAndPlay("flap");
        stage.addChildAt(bulletanimation4,1);
        //xxx=1;
        
    //}

    
}


function pandaDeath()
{
     stage.removeChild(animation);
     deathAnimation = new createjs.Sprite(pandaDeathSpriteSheet, "die");
     if(left){
        deathAnimation.regX = 99;
         deathAnimation = new createjs.Sprite(pandaDeathSpriteSheetflip, "die");
}
else if(right
    ){
  deathAnimation.regX = 99;
   deathAnimation = new createjs.Sprite(pandaDeathSpriteSheet, "die");
}
  deathAnimation.regY = 10;
  deathAnimation.x = pandaXPos;
  deathAnimation.y = pandaYPos+30;
  deathAnimation.gotoAndPlay("die");
  stage.addChild(deathAnimation);
   timerText.text = "GAME OVER";
    createjs.Sound.removeSound("background");
    var si =createjs.Sound.play("gameOverSound");
  //stage.removeChild(deathAnimation);
   
}

function tickEvent()
{

    
    //Make sure panda panda is within game boundaries and move panda panda
    if(pandaXPosb1 < WIDTH && pandaXPosb1 > 0)
    {
        pandaXPosb1 -= pandaXSpeed;
    } 
    else 
    {
       // pandaXSpeed = pandaXSpeed * (-1);
       createBullet1();
        pandaXPosb1 -= pandaXSpeed;
    }
    if(gameTime>=7){
    if(pandaXPosb2 < WIDTH && pandaXPosb2 > 0)
    {
        pandaXPosb2 -= pandaXSpeed;
    } 
    else 
    {
       // pandaXSpeed = pandaXSpeed * (-1);
       createBullet2();
        pandaXPosb2 -= pandaXSpeed;
    }
    
    bulletanimation2.x = pandaXPosb2;
    bulletanimation2.y = pandaYPosb2;
    }
    
    if(pandaXPosb3 < WIDTH && pandaXPosb3 > 0)
    {
        pandaXPosb3 += pandaXSpeed;
    } 
    else 
    {
        //pandaXSpeed = pandaXSpeed * (-1);
       createBullet3();
        pandaXPosb3 += pandaXSpeed;
    }
    if(gameTime>=6){
    if(pandaXPosb4 < WIDTH && pandaXPosb4 > 0)
    {
        pandaXPosb4 += pandaXSpeed;
    } 
    else 
    {
       // pandaXSpeed = pandaXSpeed * (-1);
       createBullet4();
        pandaXPosb4 += pandaXSpeed;
    }
    
    bulletanimation4.x = pandaXPosb4;
    bulletanimation4.y = pandaYPosb4;
    }
    /*
    if(pandaYPos < HEIGHT && pandaYPos > 0)
    {
        pandaYPos += pandaYSpeed;
    } else
    {
        pandaYSpeed = pandaYSpeed * (-1);
        pandaYPos += pandaYSpeed;
    }*/

    bulletanimation1.x = pandaXPosb1;
    bulletanimation1.y = pandaYPosb1;

    bulletanimation3.x = pandaXPosb3;
    bulletanimation3.y = pandaYPosb3;

    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    // Compute the X and Y distance using absolte value
    distX1 = Math.abs(bulletanimation1.x - spriteX);
    distY1 = Math.abs(bulletanimation1.y - spriteY);
    if(gameTime>=7)
    {
        distX2 = Math.abs(bulletanimation2.x - spriteX);
        distY2 = Math.abs(bulletanimation2.y - spriteY);
    }
    else
    {
        distX2 = 10000;
        distY2 = 10000;
    }
    distX3 = Math.abs(bulletanimation3.x - spriteX);
    distY3 = Math.abs(bulletanimation3.y - spriteY);
    if(gameTime>=6)
    {
        distX4 = Math.abs(bulletanimation4.x - spriteX);
        distY4 = Math.abs(bulletanimation4.y - spriteY);
    }
    else
    {
        distX4 = 10000;
        distY4 = 10000;
    }
    //distX4 = Math.abs(bulletanimation4.x - spriteX);
    //distY4 = Math.abs(bulletanimation4.y - spriteY);

 



    if((distX1 < 30 && pandaYPos==100) || (distX2 < 30 && pandaYPos==100) || (distX3 < 30 && pandaYPos==340) || (distX4 < 30 && pandaYPos==340))
    {
        //Hit
        
        
         stage.removeChild(animation);
         if(distX1 < 30 && pandaYPos==100){ 
         stage.removeChild(bulletanimation1);
        }
        if(distX2 < 30 && pandaYPos==100){
             stage.removeChild(bulletanimation2);
        
        }
        if(distX3 < 30 && pandaYPos==340){
             stage.removeChild(bulletanimation3);
        
        }
        if(distX4 < 30 && pandaYPos==340){
         stage.removeChild(bulletanimation4);
            
        }
        pandaDeath();
        scoreText.text = "1UP: " + score.toString();
        createjs.Sound.play("deathSound");
       for(var i=0;i<100000000;i++)
       {

       }
       var s="game_result.php?score="+score;
        window.location.replace(s);
        //Make it harder next time
        pandaYSpeed *= 1.0;
        pandaXSpeed *= 1.0;
        xxx=0;
        //Create new panda
        var timeToCreate = Math.floor((Math.random()*3500)+1);
        setTimeout(createpanda,timeToCreate);

    } 
    else
    {
        //Miss

    }
        
        
    
    
}


function checkKey(e) {

    e = e || window.event;
     pandaXSpeed *= 1.008;
    pandaYSpeed *= 1.008;

    if (e.keyCode == '38' && pandaYPos!=100) {
        pandaYPos-=240;

        //current=true;
        // up arrow
     /*   stage.removeChild(animation);
    animation = new createjs.Sprite(spriteSheet, "flap");
    //animation.flap=[0,0];
     animation.regX = 99;
        animation.regY = 58;
        animation.x = pandaXPos;
        animation.y = pandaYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);
        */
    }
    else if (e.keyCode == '40' && pandaYPos!=340) { 
        // down arrow
        pandaYPos+=240;
        //current=false;
       // animation = new createjs.Sprite(spriteSheetflap, "flap");
          /*stage.removeChild(animation);
    animation = new createjs.Sprite(spriteSheetflap, "flap");
    //animation.flap=[0,0];
     animation.regX = 99;
        animation.regY = 58;
        animation.x = pandaXPos;
        animation.y = pandaYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);
    */
    }
    else if (e.keyCode == '37' && pandaXPos>30) {
       // left arrow
       left=true;
       right=false;

       pandaXPos-=20;
        stage.removeChild(animation);
    //animation = new createjs.Sprite(spriteSheetflap, "flap");
    //animation.flap=[0,0];
     if(flapserial==1){
      animation = new createjs.Sprite(spriteSheetflap1, "flap");
      flapserial=2;
      }
      else if(flapserial==2){
      animation = new createjs.Sprite(spriteSheetflap2, "flap");
      flapserial=3;
        
      }
      else if(flapserial==3){
      animation = new createjs.Sprite(spriteSheetflap3, "flap");
      flapserial=4;
        
      }
      else if(flapserial==4){
      animation = new createjs.Sprite(spriteSheetflap4, "flap");
      flapserial=1;
        
      }
      
        animation.regX = 120;
        animation.regY = -10;
        animation.x = pandaXPos;
        animation.y = pandaYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);
    }
    else if (e.keyCode == '39' && pandaXPos<WIDTH-100) {
       // right arrow
       left=false;
       right=true;
       
       pandaXPos+=20;
       stage.removeChild(animation);
       if(serial==1){
      animation = new createjs.Sprite(spriteSheet1, "flap");
      serial=2;
      }
      else if(serial==2){
      animation = new createjs.Sprite(spriteSheet2, "flap");
      serial=3;
        
      }
      else if(serial==3){
      animation = new createjs.Sprite(spriteSheet3, "flap");
      serial=4;
        
      }
      else if(serial==4){
      animation = new createjs.Sprite(spriteSheet4, "flap");
      serial=1;
        
      }
      
     // animation = new createjs.Sprite(spriteSheet, "flap");
      
    //animation.flap=[0,0];
        animation.regX = 120;
        animation.regY = -10;
        animation.x = pandaXPos;
        animation.y = pandaYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);
    }

    animation.x = pandaXPos;
    animation.y = pandaYPos;
/*
stage.removeChild(animation);
 animation = new createjs.Sprite(SpriteSheetStand, "flap");
        animation.regX = 99;
        animation.regY = 58;
        animation.x = pandaXPos;
        animation.y = pandaYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);*/
}

/*
function handleMouseMove(event)
{
    //Offset the position by 45 pixels so mouse is in center of crosshair
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
}
*/

function handleMouseDown(event)
{
    
    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    //stage.addChild(crossHair);
    //createjs.Tween.get(crossHair).to({alpha: 0},100);
    
    //Play Gunshot sound
    //createjs.Sound.play("shot");

    //Increase speed of panda slightly
    pandaXSpeed *= 1.05;
    pandaYSpeed *= 1.05;

    //Obtain Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    // Compute the X and Y distance using absolte value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit - but not the wings
    /*
    if(distX < 30 && distY < 59 )
    {
        //Hit
        stage.removeChild(animation);
        pandaDeath();
        score += 100;
        scoreText.text = "1UP: " + score.toString();
        createjs.Sound.play("deathSound");
        
        //Make it harder next time
        pandaYSpeed *= 1.0;
        pandaXSpeed *= 1.0;
        xxx=0;
        //Create new panda
        var timeToCreate = Math.floor((Math.random()*3500)+1);
        setTimeout(createpanda,timeToCreate);

    } else
    {
        //Miss
        score -= 10;
        scoreText.text = "1UP: " + score.toString();

    }
    */
}


function updateTime()
{
    gameTime += 1;
    if(gameTime<=10)
        score+=1;
    else if(gameTime<=20)
        score+=2;
    else if(gameTime<=30)
        score+=3;
    else if(gameTime<=40)
        score+=4;
    else if(gameTime<=50)
        score+=5;
    else
        score+=6;
    scoreText.text = "1UP: " + score.toString();
    timerText.text = "Time: " + gameTime;
    createjs.Sound.play("tick");
     if(gameTime==7){
        createBullet2();

    }
    if(gameTime==6){
        createBullet4();

    }
    

}
