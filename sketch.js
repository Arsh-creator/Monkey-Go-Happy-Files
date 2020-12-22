var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground,ground_img, invisible;
var survivalTime = 0;
var GameState;
var PLAY, END;
var endimg;

function preload() {
  
   monkey_running = loadAnimation("Monkey_0.png", " Monkey_1.png"," Monkey_2.png", "Monkey_3.png",
  "Monkey_4.png", "Monkey_5.png", "Monkey_6.png","Monkey_7.png", "Monkey_8.png","Monkey_9.png",
  "Monkey_10.png");
  
  endimg = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground_img = loadImage("jungle.png");
}

function setup(){
  
createCanvas(500, 500);
  
PLAY = 1;
GameState = PLAY;
END = 0;
  
FoodGroup = new Group();
obstacleGroup = new Group();
  
monkey = createSprite(70, 370, 50, 50);
monkey.addAnimation ("monkey", monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(250, 405, 1000, 10);
ground.addImage("ground",ground_img);
ground.x = ground.width / 2;
  
invisible = createSprite(250, 407, 1000, 10);
invisible.x = ground.width / 2;
}  

function draw() {
 background("white");
  
  //monkey.x = 40;
  //monkey.y = 370;
  
if (GameState === PLAY) {
  
  
if (ground.x < 0) {
   ground.velocityX = 3;
   ground.x = ground.width / 2;
}
  
  
if (invisible.x < 0) {
invisible.x = invisible.width / 2;
}
invisible.velocityX = -5;
  
if (keyWentDown("space") && monkey.isTouching (ground)) {
monkey.velocityY = -20;
}
  
score = Math.round(frameCount / 3);
survivalTime = Math.ceil(frameCount / frameRate());
ground.velocityX = -(5 + 2 * score / 100);
  
if (monkey.isTouching (FoodGroup)) {
FoodGroup.destroyEach();
}
  
Food();
Obstacle();
  
if (monkey.isTouching(obstacleGroup)) {
GameState = END;
}
  
}
else if (GameState === END) {
ground. velocityX = 0;
invisible.velocityX = 0;
obstacleGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);

FoodGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
monkey.changeAnimation("end", endimg);  
}
monkey.velocityY = monkey.velocityY + 0.9;
  
monkey.collide(invisible);
  
stroke ("black");
textSize (20);
fill("red");
text ("score:" + score, 400, 50);

stroke ("black");
textSize(20);
fill("black");
text("survival Time:" + survivalTime, 100, 50);
  
  
 drawSprites();
}  
  
  
function Food() {
  
if (frameCount % 80 === 0) {
banana = createSprite(500, 10, 10, 20);
banana.addImage("banana", bananaImage);
banana.velocityX = -(5 + 2 * score / 100);
banana.y = Math.round(random(120, 200));
banana.scale = 0.1;
FoodGroup.add(banana);
FoodGroup.setLifetimeEach(100);
banana.setCollider("rectangle",  0,  0, 400, 400);
}
  
  
}
  
function Obstacle() {
  
if (frameCount % 50 === 0) {
obstacle = createSprite(500, 365, 23, 32);
obstacle.velocityX = -(5 + 2 * score / 100);
obstacle.addImage("obstacle", obstacleImage);
obstacle.scale = 0.2;
obstacleGroup.add(obstacle);
obstacleGroup.setLifetimeEach(100);
obstacle.setCollider("circle", 0, 0, 200);
 }
  
  
}  