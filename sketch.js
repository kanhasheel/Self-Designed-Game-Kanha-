var backgroundImg;
var Ron, RonImg
var hunter,hunter1Img,hunter2Img,hunter3Img,hunter4Img
var bird1,bird1Img
var bird2,bird2Img
var bird3,bird3Img
var bird4,bird5Img
var arrow, arrowImg
var hunterGroup, arrowGroup
var RonVoice, ArrowHitSound,BonusSound,gameOverSound
var score = 0; 
var gameState = "safe"
function preload(){
  backgroundImg = loadImage("background.jpg")
  RonImg = loadImage("JungleRon.png")
  bird1Img = loadImage("Bird1Img.png")
  bird2Img = loadImage("Bird2Img.png")
  bird3Img = loadImage("Bird3Img.png")
  bird4Img = loadImage("Bird4Img.png")
  hunter1Img = loadImage("HunterImg1.png")
  hunter2Img = loadImage("HunterImg2.png")
  hunter3Img = loadImage("HunterImg3.png")
  hunter4Img = loadImage("HunterImg4.png") 
  arrowImg = loadImage("arrow.png")
  RonVoice = loadSound("RonVoice.wav")
  ArrowHitSound = loadSound("ArrowHitting.wav")
  BonusSound = loadSound("Bonus.wav")
  gameOverSound = loadSound("GameOver.wav")

}
function setup() {
  createCanvas(1500,800);

  Ron = createSprite(1300,400,50,55)
  Ron.addImage(RonImg)
  Ron.scale = 0.8
  //Ron.debug = true
  Ron.setCollider("rectangle",0,0,50,50)
  
  bird1 = createSprite(250,100,50,50)
  bird1.addImage(bird1Img)
  bird1.scale = 0.15

  bird2 = createSprite(470,40,50,50)
  bird2.addImage(bird2Img)
  bird2.scale = 0.15

  bird3 = createSprite(900,50,50,50)
  bird3.addImage(bird3Img)
  bird3.scale = 0.15
  
  bird4 = createSprite(600,95,50,50)
  bird4.addImage(bird4Img)
  bird4.scale = 0.2

  hunterGroup = new Group()
  arrowGroup = new Group()
}


function draw() {
  background(backgroundImg);  
  textSize(35)
  fill("white")
  text("Safety Level:"+score,50,50)

  if (gameState==="safe") {
    if(keyDown(UP_ARROW)){
      Ron.y = Ron.y-4;
    }
    if(keyDown(DOWN_ARROW)){
      Ron.y = Ron.y+4;
    }
    spawnHunters()
   
    if(hunterGroup.isTouching(arrowGroup)) {
      hunter.destroy()
      score= score + 1
    }
    if (score%10===0&& score>0) {
      text("Forest is Safe",550,250)
      BonusSound.play();
    }

    if (hunterGroup.isTouching(Ron)) {
      gameState = "unsafe"
      Ron.destroy();
      RonVoice.play();
      setTimeout(function(){gameOverSound.play()},2000)
    }
  }
  drawSprites()
  if(gameState==="unsafe"){
  
    textSize(50)
    fill("red")
    text("Forest is not Safe",550,250)
    textSize(45)
    fill(235)
    text("Press Refresh Button or F5 on your keyboard to Play Again. All the Best!! ",5,375)
   
  }
  
}

function spawnHunters(){
  if(frameCount%160===0){
    hunter = createSprite(0,400,100,100)
    hunter.y = random(200,400)
    hunter.velocityX = 8;
   

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: hunter.addImage(hunter1Img);
              break;
      case 2: hunter.addImage(hunter2Img);
              break;
      case 3: hunter.addImage(hunter3Img);
              break;
      case 4: hunter.addImage(hunter4Img);
              break;
              default: break;
            }
       Ron.depth = hunter.depth
       Ron.depth+=1     
       hunterGroup.add(hunter)
  }
}

function keyPressed(){
  if(keyCode === 32){
  arrow = createSprite(Ron.x-2,Ron.y-95)
  arrow.addImage(arrowImg)
  arrow.velocityX = -15
  arrow.scale = 0.5
  arrowGroup.add(arrow)
  arrow.debug = false
  arrow.setCollider("rectangle",0,0,100,20)
  ArrowHitSound.play()
  }
}