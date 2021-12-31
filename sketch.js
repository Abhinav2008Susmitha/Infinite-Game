var rocket,rocketImg;
var space,spaceImg;
var asteriod,asteriod1,asteriod2,asteriodsGroup;
var gameState = "play"

function preload(){
    rocketImg = loadImage("Rocket.png");
    spaceImg = loadImage("Space.png");
    asteriod1 = loadImage("Asteriod1.png");
    asteriod2 = loadImage("Asteriod2.png");

}

function setup() {
    createCanvas(800,800);

    space = createSprite(400,400);
    space.addImage("space",spaceImg);
    space.velocityY = 5;

    asteriodsGroup = new Group();

    rocket = createSprite(380,500,20,20);
    rocket.addImage(rocketImg);
    rocket.scale = 0.5;
    rocket.setCollider("rectangle",0,0,10,10);
 
}

function draw() {
    background(0);

    if(space.y > 600){
        space.y = 500;
    }

    if (gameState === "play") {

        if(keyDown("LEFT_ARROW")){
            rocket.x = rocket.x -6;
        }
        if(keyDown("RIGHT_ARROW")){
            rocket.x = rocket.x +6;
        }
        if(keyDown("UP_ARROW")){
            rocket.velocityY = -8;
        }
        rocket.velocityY = rocket.velocityY +0.3;
        spawnAsteriods();
        if(asteriodsGroup.isTouching(rocket) || rocket.y > 800){
            rocket.velocityY = 0;
            space.velocityY = 0;
            rocket.destroy();            
            gameState = "end"
        }
    }
    drawSprites();
    if (gameState === "end"){
        stroke("yellow");
        fill("yellow");
        textSize(50);
        text("Game Over", 280,400)
        asteriod.destroy();
      }
     
}

function spawnAsteriods(){
    if (frameCount % 150 === 0) {
    asteriod = createSprite(random(10,750),-15);
    asteriod.velocityY = 10;
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: asteriod.addImage(asteriod1);
              break;
      case 2: asteriod.addImage(asteriod2);
              break;
     default: break;
    }
    asteriod.scale = 0.20;
    asteriodsGroup.add(asteriod);
    }
}