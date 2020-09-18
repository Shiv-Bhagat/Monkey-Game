var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0
var survivalTime = 0
var END = 0
var PLAY = 1
var gameState = PLAY

function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");

}



function setup() {
  createCanvas(400, 400);

  bananaGroup = new Group();
  obstacleGroup = new Group();


  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addImage(bananaImage)
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;


}


function draw() {

  background(255);

  console.log(monkey.y)








  if (gameState === PLAY) {
    fruit();
    obstacle1();

    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.setLifetimeEach(0);
      score = score + 1;

    }
    if (keyDown("space") && monkey.y >= 314.3) {
      monkey.velocityY = -17;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    text("SurvivalTime:" + survivalTime, 100, 50);
    survivalTime = Math.ceil(frameCount / frameRate())
    stroke("black")
    textSize(20)


    text("Score : " + score, 150, 30);

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END

    }


  }

  if (gameState === END) {
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0
    ground.velocityX = 0
    // monkey.addImage(gameOverImg)
    monkey.lifetime = 0
    gameOver = createSprite(200, 200)
    gameOver.addImage(gameOverImg)
  }







  monkey.collide(ground);




  drawSprites();

}

function fruit() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(120, 200)), 10, 10)
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana.velocityX = -4
    banana.lifetime = 300
    bananaGroup.add(banana)
  }

}

function obstacle1() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 320, 20, 20)
    obstacle.velocityX = -3
    obstacle.scale = 0.2
    obstacle.addImage(obstacleImage)
    obstacle.lifetime = 300
    obstacleGroup.add(obstacle)

  }
}