var mass = [];
var dia = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
var diaSun = 20;
var displaceX = 0;
var displaceY = 0;
var adim = 4;
var density = 2;
var G = 0.5;
var acc = 0;
var oran = 5.;
var ilkHiz = 4.;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	fill(64, 255, 255, 192);
	dia.push(diaSun);
	mass.push(pow(diaSun,3)*density);
	positionX.push(windowWidth / 2);
	positionY.push(windowHeight / 2);
	velocityX.push(0);
	velocityY.push(0);
}

function draw() {
	background(20);
	textSize(20);
	textAlign(LEFT, TOP);
	text("press 'a' to travel around", 30, 15);
	text("press 'c' to return back to the sun", 30, 35);
	text("create planets by mouse click", 30, 55);
	for (var particleA = 0; particleA < dia.length; particleA++) {
		var accelerationX = 0, accelerationY = 0;
		// Parcalar arasi etkilesim
		for (var particleB = 0; particleB < dia.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				acc =  G * mass[particleB] / (distance * distance) * distance / Math.abs(distance);
				
				//birleşme varsa
				if (Math.abs(distance) <= Math.abs((dia[particleA]+dia[particleB])* oran / 2)){ 
					acc = 0;
					velocityX[particleA] = (velocityX[particleA]*mass[particleA] + velocityX[particleB]*mass[particleB])/(mass[particleA]+mass[particleB]);
					velocityX[particleB] = (velocityX[particleA]*mass[particleA] + velocityX[particleB]*mass[particleB])/(mass[particleA]+mass[particleB]);
					velocityY[particleA] = (velocityY[particleA]*mass[particleA] + velocityY[particleB]*mass[particleB])/(mass[particleA]+mass[particleB]);
					velocityY[particleB] = (velocityY[particleA]*mass[particleA] + velocityY[particleB]*mass[particleB])/(mass[particleA]+mass[particleB]);
				}
				accelerationX += acc * distanceX / distance;
				accelerationY += acc * distanceY / distance;
			}
		}
		//Gunesle etkilesim

		velocityX[particleA] = velocityX[particleA] + accelerationX ;
		velocityY[particleA] = velocityY[particleA] + accelerationY ;
	}

	//Partikuller cizdir
	if(keyIsPressed==true && key == 'c'){
		var center = true;
		var	disX = windowWidth/2 -  positionX[0];
		var disY = windowHeight/2 - positionY[0];
	}
	for (var particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
		positionY[particle] += velocityY[particle];
		if(keyIsPressed==true && key == 'a' && !center){
			
			var lengthMouseCenterX = windowWidth/2 - mouseX;
			var lengthMouseCenterY = windowHeight/2 - mouseY;
			displaceX = lengthMouseCenterX/(10*oran); 
			displaceY = lengthMouseCenterY/(5*oran); 
					positionX[particle] += displaceX;
					positionY[particle] += displaceY;
		}
		if(center){
			positionX[particle] += disX;
			positionY[particle] += disY;
		}
			
		fill(180);
		ellipse(positionX[particle], positionY[particle], dia[particle] * oran, dia[particle] * oran);
		if(keyIsPressed==true && key == 'a'){
		stroke(180);
		strokeWeight(2);
		line(windowWidth/2, windowHeight/2, mouseX, mouseY);	
		}
	}
	

	
	
}


function addNewParticle() {
	dia.push(random(0.3, 0.9));
	mass.push(density * Math.pow(dia[dia.length-1],3));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(ilkHiz);
	velocityY.push(0);

}

function mouseClicked() {
	addNewParticle();
}

function mouseDragged() {
	addNewParticle();
}
	