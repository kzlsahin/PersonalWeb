const planeSpeedScale = 0.3;
const planeMaxSpeed = 10;
const planeSpeed = {x : 0, y : 0};
const planePos = { x : 40, y:300};

planeFrame = 0;
planeTime = 0;

let ufoImg;

const FIRST_TOUCH = {id:0,x:0,y:0, isTouched:false};

const UFOs = new Map();
const Bullets = new Map();
const HitAnims = new Map();

function getId(){
  if(this.Id == undefined){
    this.Id = 0;
  }
  return Id++;
}

function deviceTurned(){
  resizecanvas(windowWidth, windowHeight);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ufoImg = loadImage("ufo_1.png");
  createDefaultUFO(width + 200, 250);
  createDefaultUFO(width + 100, 200);
  console.log(getId());
}

function windowResized(){
  resizeCanvas(windowWidth, Math.min(windowHeight, windowWidth));
}
function draw() {
  if(deviceOrientation === 'portrait'){
    background(0);
    stroke(200,200,200);
    fill(200,200,200);
    textSize(16);
    text("Kamerayı Döndürün", (width/2)-100, height/2);
  }
  else{
  background(255);
  
  checkplaneLocation();
  drawScene();  
  
  drawTree(180,300);
   
  drawUFOs();

  drawPlane(planePos.x, planePos.y);
  drawTree(280,330); 

  drawBullets();
  drawHitAnims();

  drawControls();

  checkHits();
  
  CheckTouchControl(); 
  NextTime(); 
  }
}

const DUMPING = 0.93;
function NextTime(){
  planeFrame = planeTime % 8;
  planeTime = ++planeTime % 360;
  planePos.x += planeSpeedScale * planeSpeed.x;
  planePos.y += planeSpeedScale * planeSpeed.y;
  planeSpeed.x = planeSpeed.x * DUMPING
  planeSpeed.y = planeSpeed.y * DUMPING
  timeForwardUFOs();
  bulletsNext();
}
function drawScene(){
  stroke(0,200,0);
  fill(0,200,0);
  line(0, height-100, width,height-100);
  rect(3,height-100, width,100)
}

function drawPlane(x,y){
  fill(200,0,0);
  stroke(200,0,0);
  rect(x, y+15, 52,10); // hull
  rect(x-3,y+5,5,10); // tail
  rect(x+24, y+18, 8, 16); // legs
  rect(x+55, y+31, -10, -5); // gun foundation
  fill(110,120,250);
  stroke(110,120,250);
  rect(x+15, y+15, 36,-10); // glass  
  fill(0,0,0)
  noStroke();
  rect(x+55, y+29, 15, 2); // gun
  rect(x+35, y,planeFrame * 10,3); // rotar wings
  rect(x+35, y,planeFrame * -10,3); // rotar wings
  rect(x, y + 34, 50, 2); 
}
function checkplaneLocation(){
  if(planePos.x < - 100 || planePos.x > width){
    planePos.x = 100;
    planeSpeed.x = 0;
  }
  if(planePos.y < - 100 || planePos.y > height){
    planePos.y = 200;
    planeSpeed.y = 0;
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    planeSpeed.y -= 1.5;
  } else if (keyCode === DOWN_ARROW) {
    planeSpeed.y += 1.5;
  } else if (keyCode === LEFT_ARROW) {
    planeSpeed.x -= 1;
  } else if (keyCode === RIGHT_ARROW) {
    planeSpeed.x += 1;
  }
}

function CheckTouchControl(){
    if(FIRST_TOUCH.isTouched){
      let difX = mouseX - FIRST_TOUCH.x;
      let difY = mouseY - FIRST_TOUCH.y;
      FIRST_TOUCH.x = mouseX;
      FIRST_TOUCH.y = mouseY;
      if(planeSpeed.x > planeMaxSpeed) {
        planeSpeed.x = planeMaxSpeed;
      }
      else if(planeSpeed.x < -planeMaxSpeed){
        planeSpeed.x = -planeMaxSpeed;
      }
      else {
        planeSpeed.x += difX / 20;
      }
      if(planeSpeed.y > planeMaxSpeed){
        planeSpeed.y = planeMaxSpeed;
      }
      else if(planeSpeed.y < -planeMaxSpeed){
        planeSpeed.y = -planeMaxSpeed;
      }
      else{
        planeSpeed.y += difY / 15;  
      }
  }else{
    FIRST_TOUCH.isTouched = false;
  }
}
function touchStarted(){
  if(touches.length === 0) return;
  FIRST_TOUCH.x = mouseX;
  FIRST_TOUCH.y = mouseY;
  FIRST_TOUCH.isTouched = true;
}
function touchEnded(){
  FIRST_TOUCH.isTouched = false;
}
function mouseClicked(){
  if(!fullscreen()){
    fullscreen(true);
  }
  let x = planePos.x + 70;
  let y = planePos.y + 30;
  createBullet(x, y, 4, {x:1, y:0});  
}


function drawTree(x, y){
  fill(155,0,100);
  rect(x-5, y, 8, -25);
  fill(0,165,0);
  circle(x-1, y-35, 30);
}

function drawUFOs(){
  UFOs.forEach(ufo => drawUFO(ufo));
}
function timeForwardUFOs(){
   UFOs.forEach(ufo => ufo.next());
} 

const ufoNext = (ufo) => {
  ufo.posX = ufo.posX + ufo.direction.x * ufo.speed;
  ufo.posY = ufo.posY + ufo.direction.y * ufo.speed;
  
  if(ufo.posX < 0){
    ufo.posX = width+100;
    ufo.posY = 50 * random(2,5);
  }
 }
function drawUFO(ufo){
    fill(120,120,0);
    //circle(ufo.posX,ufo.posY, ufo.size);
    image(ufoImg, ufo.posX - 36, ufo.posY - 18);
  }
function createDefaultUFO(x, y){
  let ufo = {id:getId(), health:20, posX:x, posY:y, size:40, speed:1, direction:{x:-1, y:0}, next:function(){ufoNext(this);}};
  UFOs.set(ufo.id, ufo);
}

function createUFO(health, x, y, _size, _speed, _direction){
  let ufo = {id:getId(), health:20, posX:x, posY:y, size:_size, speed:_speed, direction:_direction, next:function(){ufoNext(this);}};
  UFOs.set(ufo.id, ufo);
}

function bulletsNext(){
  Bullets.forEach( bullet => {
    bullet.posX = bullet.posX + bullet.direction.x * bullet.speed;
    //bullet.posY = bullet.posY + bullet.direction.y * bullet.speed;
  });
}
function drawBullets(){
  for(let bullet of Bullets.values()){
    drawBullet(bullet);
  }
}
function drawBullet(bullet){
  fill(255,20,20);
  circle(bullet.posX, bullet.posY, 5);
}
function createBullet(x,y,_speed, _direction){
  let newBullet = {id:getId(), posX : x, posY : y, speed:_speed, direction:_direction};
  Bullets.set(newBullet.id, newBullet);
}

function isInCircle(x, y, cX, cY, radius){
  return (Math.pow(x- cX, 2) + Math.pow(y - cY,2)) < Math.pow(radius, 2)
}
function checkHitOfBullet(bullet){
  for(let ufo of UFOs.values()){    
    if(isInCircle(bullet.posX, bullet.posY, ufo.posX, ufo.posY, ufo.size/2)){
      ufoGotHit(ufo);
      bulletGotHit(bullet);
      return true;
    }
  }  
}

function ufoGotHit(ufo){
  newhitAnim(ufo.posX,ufo.posY);
  ufo.posX = 700;
  ufo.posY = 50 * random(2,5);
  
}

function bulletGotHit(bullet){
  Bullets.delete(bullet.id);
}

function checkHits(){
  for(let bullet of Bullets.values()){
  checkHitOfBullet(bullet);
  }
}

function newhitAnim(x,y){
  let hitAnim = {id:getId(), posX:x, posY:y, frame:0};
  HitAnims.set(hitAnim.id, hitAnim);
}
function drawHitAnim(hitAnim){
  let diameter = 10 + hitAnim.frame * 2;
  if(hitAnim.frame++ < 60){
    stroke(170,0,0);
    strokeWeight(4);
    noFill();
    circle(hitAnim.posX, hitAnim.posY, diameter );
    noStroke();
    strokeWeight(1);
  } else {
    HitAnims.delete(hitAnim.id);
  }
}
function drawHitAnims(){
  
  HitAnims.forEach( hitAnim =>
    drawHitAnim(hitAnim)
  );
}

function drawControls(){
  drawAltitudeMeter(width/2, height-100);
}
function drawAltitudeMeter(x, y, relativeAltitude=false){
  this.alt = planePos.y;
  //this.relAlt = planePos.y;
  let stepSize = 10; // for pixel steps
  let altScale = 1; // altitude per pixel
  stroke(25,50,10);
  fill(140,160,13);
  rect(x,y-stepSize*6, 10, stepSize*12);
  line(x-15, x+25);

  stroke(125,0,0);
  text("Alt", x - 15, y - stepSize);
  let relY = y - (planePos.y % stepSize);
  let val = this.alt - (this.alt % 10);
  if(!relativeAltitude){
    let i = 0;
    let lineY = relY + i*stepSize;
    do{
      
      line(x + 3, lineY , x+10, lineY );      
      text(`${val - i * 10}`,x+13, lineY );
      ++i;
      lineY = relY + i*stepSize;
    }while(lineY < y + stepSize*(6));
    i = 1;
    lineY = relY - i*stepSize;
    do{      
      line(x + 3, lineY, x+10, lineY);      
      text(`${val - i * 10}`,x+13, lineY);
      ++i;
      lineY = relY - i*stepSize;
    }while(lineY > y - stepSize*(6));
  }
}