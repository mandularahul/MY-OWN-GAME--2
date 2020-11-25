var kid,kid_img;
var bg,bg_img;
var gameState="play"
var gameLevel="level1"
var coin,coin_Img,coin_gif;
var monster,monster_Img;
var invisibleground;
var coinGroup,monsterGroup,invisibleBlockGroup;
var score=0;
var life1,life2,life3,life_Img;
var count=0;
var invisibleBlock;
function preload(){
  kid_img=loadAnimation("images/kid1.png","images/kid2.png","images/kid3.png");
  bg_img=loadImage("images/bgImg.jpg");
  coin_Img=loadAnimation("images/coin1.png","images/coin2.png","images/coin3.png","images/coin4.png","images/coin5.png","images/coin6.png","images/coin7.png","images/coin8.png","images/coin9.png");
  monster_Img=loadImage("monster1.jpg");
  life_Img=loadImage("images/lives.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(0, 0, width, height);
  bg.addImage(bg_img);
  bg.scale=2.5;
  invisibleground=createSprite(10,height-200,500,20);
  invisibleground.visible=false;
  kid=createSprite(100,height-220);
  kid.addAnimation("kid",kid_img);
  kid.scale=1.5;
  coinGroup=new Group();
  monsterGroup=new Group();
  invisibleBlockGroup=new Group();
  life1=createSprite(width-250,height-700);
  life1.addImage(life_Img);
  life1.scale=0.2;
  life2=createSprite(width-150,height-700);
  life2.addImage(life_Img);
  life2.scale=0.2;
  life3=createSprite(width-50,height-700);
  life3.addImage(life_Img);
  life3.scale=0.2;
  count=0;
}

function draw() {
  background(255,255,255); 
  if(gameState=="play"){
    //GAMELEVEL STAGE 1
    if(gameLevel=="level1"){
    bg.velocityX=-10;
    if(bg.x<0){
      bg.x=bg.width/2
    }
    if(touches.length>0||keyDown("SPACE")&&kid.y>=100){
      kid.velocityY=-10;
      touches=[];
    }
    kid.velocityY=kid.velocityY+0.8;
    console.log(kid.y);
    kid.collide(invisibleground);
    coins();
    monsters();
    if(coinGroup.isTouching(kid)){
      score+=10;
      coinGroup.destroyEach();
    }
    if(invisibleBlockGroup.isTouching(kid)){
      count+=1;

    }
    if(count==5){
      life3.destroy();
    }
    else if(count==100){
      life2.destroy();
    }
    else if(count==200){
      life1.destroy();
      gameState="end";
      bg.velocityX=0;
      invisibleBlockGroup.velocityX=0;
      coinGroup.velocityX=0;
      monsterGroup.velocityX=0;
    }
  }
  //GAMELEVEL STAGE 2
  }
  drawSprites();
  fill("Black");
  textSize(40);
  text("Score: "+score,width-500,height-680);
 
}
function coins(){
  if(frameCount%200==0){
    coin=createSprite(width,height-500);
    coin.addAnimation("coin",coin_Img);
    coin.velocityX=-7;
    coinGroup.add(coin);
    //coin.scale=0.5;
  }
}
function monsters(){
  if(frameCount%350==0){
    monster=createSprite(width,height-220);
    monster.addImage(monster_Img);
    monster.velocityX=-7;
    monster.scale=1.8;
    invisibleBlockGroup.add(monster);
    invisibleBlock=createSprite(width,height-150,240,400);
    invisibleBlock.velocityX=-7;
    invisibleBlock.visible=false;
  }
}
