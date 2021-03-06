//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg;

function preload()
{
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,1,1);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  //add styles here
  
  if(foodS!==undefined){
    textSize(20);
    fill(255);
    text("Food Remaining: "+foodS,150,150);
    text("Press 'up' key to feed your pet",125,50); 
}  
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })

}





