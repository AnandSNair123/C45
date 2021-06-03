var rocket_img,rocket_sound;
var space_img,space;
var earth_img,mars_img,jupiter_img,saturn_img,uranus_img,neptune_img;
var meteorite_img;
var meteorite,meteoriteGroup;
var rocket;
var earth,mars,jupiter,saturn,uranus,neptune;
var coins,coins_img,coinsGroup;
var gameState;
var PLAY=1;
var END=0;
var score = 0;


function preload(){
space_img = loadImage("space.jpg");
rocket_img = loadImage("rocket.png");
rocket_sound = loadSound("rocketsound.wav");
earth_img = loadImage("earth.png");
mars_img = loadImage("mars.png");
jupiter_img = loadImage("jupiter.png");
saturn_img = loadImage("saturn.png");
uranus_img = loadImage("uranus.png");
neptune_img = loadImage("neptune.png");
meteorite_img = loadImage("meteorite.png");
coins_img = loadImage("coins.png");
}

function setup() {
 var canvas = createCanvas(1200,500);

 space = createSprite(600,250);
 space.addImage("space",space_img);
 space.velocityX = -3;

 rocket = createSprite(100,250,50,50);
 rocket.addImage("rocket",rocket_img);
 rocket.scale = 0.5;
 rocket.setCollider("rectangle",20,0,300,100);
 //rocket_sound.loop();

 coinsGroup = new Group();
 meteoriteGroup = new Group();
 gameState = PLAY;
 
}

function draw() {
    background("black");
    fill("yellow");
    textSize(30) ;
     text("Score :"+score,600,250);
    
    if(gameState === PLAY){
        var edges = createEdgeSprites();
        rocket.bounceOff(edges);
        if(coinsGroup.isTouching(rocket)){
            score++
            coinsGroup.destroyEach();
        }
        console.log(score);
        if(space.x<500){
            space.x = space.width/2;
        }
        if(keyDown(DOWN_ARROW)){
            rocket.y = rocket.y+5;
        }
        if(keyDown(UP_ARROW)){
            rocket.y = rocket.y-5;
        }
        spawnMeteorites();
        spawnCoins();
if(meteoriteGroup.isTouching(rocket)){
    gameState = END;
}   
 
    }
   else if(gameState === END){
        rocket.destroy();
        coinsGroup.destroyEach();
        coinsGroup.setVelocityXEach(0);
        coinsGroup.setLifetimeEach(-1);
        meteoriteGroup.destroyEach();
        meteoriteGroup.setVelocityXEach(0);
        meteoriteGroup.setLifetimeEach(-1);
        space.velocityX = 0;
    }
      
 drawSprites();
}

function spawnMeteorites(){
    if(frameCount%180===0){
        var rand = Math.round(random(50,450));
        meteorite = createSprite(1200,rand,50,50);
        meteorite.addImage(meteorite_img);
        meteorite.velocityX = -4;
        meteorite.lifetime = 300;
        meteorite.scale = 0.5
        meteorite.setCollider("rectangle",0,0,200,200)
        meteoriteGroup.add(meteorite);
    }
}

function spawnCoins(){
    if(frameCount%120===0){
        var rand = Math.round(random(50,450));
        coins = createSprite(1200,rand,50,50);
        coins.addImage(coins_img);
        coins.velocityX = -4;
        coins.lifetime = 300;
        coins.scale = 0.1;
coinsGroup.add(coins);

    }
}