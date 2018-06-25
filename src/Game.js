/*
* JavaScript Zombie Shooter
* Made By Michael Chambers
*/

//Window Size
var baseWidth = 1280;
var baseHeight = 720;

var maxWidth = 1920;
var maxHeight = 1080;

//Check user browser size and get difference for scaling
var browserWidth = document.getElementById("viewDiv").getBoundingClientRect().right - document.getElementById("viewDiv").getBoundingClientRect().left;
var browserHeight = document.getElementById("viewDiv").getBoundingClientRect().bottom - document.getElementById("viewDiv").getBoundingClientRect().top - 3;
if(browserWidth < baseWidth || browserHeight < baseHeight){
	var widthRatio = browserWidth / baseWidth;
	var heightRatio = browserHeight / baseHeight;
	if(widthRatio <= heightRatio){
		scaleRatio = widthRatio;
	}
	else{
		scaleRatio = heightRatio;
	}
}
else{
	scaleRatio = 1;
}
windowWidth = baseWidth * scaleRatio;
windowHeight = baseHeight * scaleRatio;

//Set viewport size to fit
browserWidth = document.getElementById("viewDiv").getBoundingClientRect().right - document.getElementById("viewDiv").getBoundingClientRect().left;
browserHeight = document.getElementById("viewDiv").getBoundingClientRect().bottom - document.getElementById("viewDiv").getBoundingClientRect().top - 3;

if(browserWidth < maxWidth || browserHeight < maxHeight){
	var widthRatio = browserWidth / baseWidth;
	var heightRatio = browserHeight / baseHeight;
	if(widthRatio <= heightRatio){
		scaleRatio = widthRatio;
	}
	else{
		scaleRatio = heightRatio;
	}
	windowWidth = baseWidth * scaleRatio;
	windowHeight = baseHeight * scaleRatio;
	document.getElementById("viewPort").width = windowWidth;
	document.getElementById("viewPort").height = windowHeight;
	document.getElementById("viewPort").style.marginLeft = (
		(((document.getElementById("viewDiv").getBoundingClientRect().right - document.getElementById("viewDiv").getBoundingClientRect().left)
		- (document.getElementById("viewPort").getBoundingClientRect().right - document.getElementById("viewPort").getBoundingClientRect().left))/2) + "px"
	);
	document.getElementById("viewPort").style.marginTop = (
		(((document.getElementById("viewDiv").getBoundingClientRect().bottom - document.getElementById("viewDiv").getBoundingClientRect().top)
		- (document.getElementById("viewPort").getBoundingClientRect().bottom - document.getElementById("viewPort").getBoundingClientRect().top))/2) - 2 + "px"
	);
}
var ctx = document.getElementById("viewPort").getContext("2d");

//FPS Setup
var baseFps = 60;
var fps = 60;
var gameSpeedMultiplier = fps / baseFps;
var fpsInterval = Math.round(1000 / fps);

var renderCount = 0;
var updateCount = 0;
var showFps = 1;

//Game Loop
var Game = {};
Game.staticVars = {};
Game.persistantVars = {};
Game.update = function(){
	Game.state.events.update();
}
Game.render = function(){
	Game.state.events.render();
}
Game.run = function(){
	Game.update();
	Game.render();
};
Game.globalVars = {
	
};
//End of Game Loop

//Render Functions
function createGradient(v1, v2, colours){
	var tempGradient = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
	for(var i = 0; i < colours.length; i++){
		tempGradient.addColorStop(colours[i].pos, colours[i].colour);
	}
	return tempGradient;
}
function loadImage(path){
	var tempImg = new Image();
	tempImg.src = path;
	return tempImg;
}
function getImage(imageArray, id){
	var img = 0;
	for(var i = 0; i < imageArray.length; i++){
		if(imageArray[i].id === id){
			img = imageArray[i].img;
		}
	}
	if(img === 0){
		img = spriteList[0].img;
		console.log("Error, could not find image " + id);
	}
	return img;
}
function drawImg(rotV1, v1, v2, angle, img, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	////v1.y = Math.floor(v1.y);
	////v2.x = Math.floor(v2.x);
	////v2.y = Math.floor(v2.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	//ctx.translate(v1.x, v1.y);
	ctx.globalAlpha = alpha;
	ctx.drawImage(img, v1.x - v2.x/2, v1.y - v2.y/2, v2.x, v2.y);
	ctx.restore();
}
function drawTextFilled(rotV1, v1, v2, angle, colour, font, text, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	//v2.x = Math.floor(v2.x);
	//v2.y = Math.floor(v2.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	//ctx.translate(v1.x, v1.y);
	ctx.font = font;
	ctx.fillStyle = colour;
	ctx.globalAlpha = alpha;
	ctx.fillText(text, v1.x, v1.y, v2.x, v2.y);
	ctx.restore();
}
function drawTextOutline(rotV1, v1, v2, angle, colour, font, text, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	//v2.x = Math.floor(v2.x);
	//v2.y = Math.floor(v2.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	//ctx.translate(v1.x, v1.y);
	ctx.font = font;
	ctx.strokeStyle = colour;
	ctx.globalAlpha = alpha;
	ctx.strokeText(text, v1.x, v1.y, v2.x, v2.y);
	ctx.restore();
}
function drawLine(rotV1, v1, v2, angle, colour, thickness, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	//v2.x = Math.floor(v2.x);
	//v2.y = Math.floor(v2.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	//ctx.translate(v1.x, v1.y);
	ctx.beginPath();
	ctx.strokeStyle = colour;
	ctx.lineWidth = thickness;
	ctx.globalAlpha = alpha;
	ctx.moveTo(v1.x, v1.y);
	ctx.lineTo(v2.x, v2.y);
	ctx.stroke();
	ctx.restore();
}
function drawRectFilled(rotV1, v1, v2, angle, colour, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	//v2.x = Math.floor(v2.x);
	//v2.y = Math.floor(v2.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	//ctx.translate(v1.x, v1.y);
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.globalAlpha = alpha;
	ctx.fillRect(v1.x - v2.x/2, v1.y - v2.y/2, v2.x, v2.y);
	ctx.restore();
}
function drawRectOutline(rotV1, v1, v2, angle, colour, thickness, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	//v2.x = Math.floor(v2.x);
	//v2.y = Math.floor(v2.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	//ctx.translate(v1.x, v1.y);
	ctx.beginPath();
	ctx.strokeStyle = colour;
	ctx.lineWidth = thickness;
	ctx.globalAlpha = alpha;
	ctx.strokeRect(v1.x - v2.x/2, v1.y - v2.y/2, v2.x, v2.y);
	ctx.restore();
}
function drawCircleFilled(rotV1, v1, radius, vScale, angle, colour, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	ctx.translate(v1.x, v1.y);
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.globalAlpha = alpha;
	ctx.scale(vScale.x, vScale.y);
	ctx.arc(v1.x, v1.y, radius, 0, 2*Math.PI);
	ctx.fill();
	ctx.restore();
}
function drawCircleOutline(rotV1, v1, radius, vScale, angle, colour, thickness, alpha){
	//angle = Math.floor(angle);
	var radians = toRadians(angle);
	//rotV1.x = Math.floor(rotV1.x);
	//rotV1.y = Math.floor(rotV1.y);
	//v1.x = Math.floor(v1.x);
	//v1.y = Math.floor(v1.y);
	ctx.save();
	ctx.translate(rotV1.x, rotV1.y);
	ctx.rotate(radians);
	ctx.translate(v1.x, v1.y);
	ctx.beginPath();
	ctx.strokeStyle = colour;
	ctx.lineWidth = thickness;
	ctx.globalAlpha = alpha;
	ctx.scale(vScale.x, vScale.y);
	ctx.arc(v1.x, v1.y, radius, 0, 2*Math.PI);
	ctx.stroke();
	ctx.restore();
}

//Object Array Functions
function addObject(obj, oldObjectList){
	newobjectList = oldObjectList;
	newobjectList.push(obj);
	return newobjectList;
}
function removeObject(objIndex, oldObjectList){
	var newobjectList = [];
	/*for(var i = oldObjectList.length-1; i > 0; i--){
		if(i !== objIndex){
			newobjectList.push(oldObjectList[i]);
		}
	}*/
	for(var i = 0; i < oldObjectList.length; i++){
		if(i !== objIndex){
			newobjectList.push(oldObjectList[i]);
		}
	}
	return newobjectList;
}
function sortObjectListByDepth(objectList){
	//Sorts objectList based on their depth variable. Lower values will be further down the list and thus rendered last (on top).
	/*var newObjectList = [];
	var tempObjectList = [];
	var addedIndex = [];
	
	while(tempObjectList.length < objectList.length){
		for(var i = 0; i < objectList.length; i++){
			var isLarger = 1;
			var notAdded = 1;
			for(var i2 = 0; i2 < addedIndex.length; i2++){
				if(i === addedIndex[i2]){
					notAdded = 0;
				}
			}
			if(notAdded === 1){
				for(var i2 = 0; i2 < objectList.length; i2++){
					var notAdded2 = 1;
					for(var i3 = 0; i3 < addedIndex.length; i3++){
						if(i2 === addedIndex[i3]){
							notAdded2 = 0;
						}
					}
					if(notAdded2 === 1){
						if(objectList[i].vars.depth > objectList[i2].vars.depth){
							isLarger = 0;
						}
					}
				}
				if(isLarger === 1 && i != i2){
					tempObjectList.push(objectList[i]);
					addedIndex.push(i);
				}
			}
			
		}
	}
	for(var i = 0; i < tempObjectList.length; i++){
		newObjectList.push(tempObjectList[i]);
	}
	
	return newObjectList;*/
	objectList = quickSortObj(objectList);
	return objectList;
}

////////////////////////
function quickSortObj(objArray){ // pivotIndex = objArray.length - 1
	var newArray = []
	if(objArray.length > 2){
		var partitioned = partitionArrayObj(objArray);
		var subArray1 = []; // Left of pivot
		var subArray2 = []; // Right of pivot
		for(var i = 0; i < partitioned.pivotIndex; i++){
			subArray1.push(partitioned.a[i]);
		}
		for(var i = partitioned.pivotIndex + 1; i < partitioned.a.length; i++){
			subArray2.push(partitioned.a[i]);
		}
		subArray1 = quickSortObj(subArray1);
		subArray2 = quickSortObj(subArray2);
		for(var i = 0; i < subArray1.length; i++){
			newArray.push(subArray1[i]);
		}
		newArray.push(partitioned.a[partitioned.pivotIndex]);
		for(var i = 0; i < subArray2.length; i++){
			newArray.push(subArray2[i]);
		}
	}
	else if(objArray.length === 2){
		if(objArray[0].vars.drawDepth > objArray[1].vars.drawDepth){
			var leftValue = objArray[0];
			objArray[0] = objArray[1];
			objArray[1] = leftValue;
		}
		newArray = objArray;
	}
	else{
		newArray = objArray;
	}
	
	return newArray;
}

function partitionArrayObj(objArray){
	var wallIndex = -1;
	var leftIndex = 0;
	var pivot = objArray[objArray.length - 1];
	while(leftIndex < objArray.length - 1){
		if(objArray[leftIndex].vars.drawDepth > pivot.vars.drawDepth){
			leftIndex++;
		}
		else{
			//swap
			wallIndex++;
			var leftValue = objArray[leftIndex];
			objArray[leftIndex] = objArray[wallIndex];
			objArray[wallIndex] = leftValue;
			leftIndex++;
		}
	}
	//swap
	objArray[objArray.length - 1] = objArray[wallIndex + 1];
	objArray[wallIndex + 1] = pivot;
	
	// a is the array and newPivot is the index where the original pivot is now
	return {a: objArray, pivotIndex: wallIndex + 1};
}//////////////////

function chooseFromList(list){
	var chosenElement;
	var randNum = Math.random();
	var range = 1 / list.length;
	for(var i = 0; i < list.length; i++){
		if((randNum >= range * i) && (randNum < range * (i + 1))){
			chosenElement = list[i];
		}
	}
	return chosenElement;
}

//Room Functions
function loadRoom(room, roomID, gsVars){
	
	var index = null;
	for(var i = 0; i < gsVars.rooms.roomList.length; i++){
		if( gsVars.rooms.roomList[i].roomVars.roomID.name === roomID.name){
			index = i;
		}
	}
	gsVars = gsVars.rooms.currentRoom.onClose(room, index, gsVars).gsVars;
	gsVars.rooms.currentRoom = room;
	gsVars = gsVars.rooms.currentRoom.onLoad(room, gsVars).gsVars;
	return {gsVars: gsVars};
}

function loadState(gs, ngs){
	/*var stateVars = {oldState: gsVars};
	Game.globalVars = stateVars.vars.persistVars;
	*/
	if(gs != null){
		gs.vars = gs.events.onClose(gs.vars);
		Game.globalVars = gs.vars.globalVars;
	}
	ngs.vars.globalVars = Game.globalVars;
	ngs.vars = ngs.events.onLoad(ngs.vars);
	var states = {oldState: gs, newState: ngs};
	return states;
}

//Timer Functions
function updateTimer(timer){
	if(timer.loops < timer.maxLoops || timer.maxLoops === -1){
		timer.time += timer.rate;
		if(timer.time < timer.maxTime){
			timer.done = 0;
		}
		else if(timer.time >= timer.maxTime){
			timer.done = 1;
			timer.loops += 1;
			timer.time = 0;
		}
	}
	return timer;
}

function resetTimer(timer){
	timer.loops = timer.minLoops;
	timer.done = 0;
	timer.time = 0;
	return timer;
}

function updateAnimation(animation){
	if(animation.loops < animation.maxLoops || animation.maxLoops === -1){
		if(animation.nextFrame > 0){
			if(animation.currentFrame.index < animation.frames.length - 1){
				animation.currentFrame.index += 1;
				animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
			}
			else if(animation.currentFrame.index >= animation.frames.length - 1){
				// New system
				if(animation.maxLoops === -1){
					animation.currentFrame.index = 0;
					animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
				}
				else{
					animation.loops += 1;
					if(animation.loops === animation.maxLoops){
						animation.currentFrame.index = animation.finalFrameIndex;
						animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
					}
					else{
						animation.currentFrame.index = 0;
						animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
					}
				}
				
				// Old system
				/*animation.currentFrame.index = 0;
				animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
				if(animation.maxLoops != -1){
					animation.loops += 1;
				}*/
			}
		}
		else if(animation.nextFrame < 0){
			if(animation.currentFrame.index > 0){
				animation.currentFrame.index -= 1;
				animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
			}
			else if(animation.currentFrame.index <= 0){
				animation.currentFrame.index = animation.frames.length - 1;
				animation.currentFrame.imgObj = animation.frames[animation.currentFrame.index];
				if(animation.maxLoops != -1){
					animation.loops += 1;
				}
			}
		}
	}
	return animation;
}

function resetAnimation(animation){
	animation.loops = animation.minLoops;
	animation.currentFrame.index = 0;
	animation.currentFrame.imgObj = animation.frames[0];
	return animation;
}

//Shooting Functions
function moveInstant(v, dir, speedPerCheck, maxDistance){
	var newV = {x: v.x, y: v.y};
	var newVel = {x: lengthDirX(dir, speedPerCheck), y: lengthDirY(dir, speedPerCheck)};
	var colliding = 0;
	while(
	(!colliding)// !colliding with wall
	&& (getDistanceV(v, newV) <= maxDistance)
	){
		newV.x += newVel.x;
		newV.y += newVel.y;
	}
	return newV;
}

function moveInstantCollide(v, originV, dir, speedPerCheck, speed, maxDistance, collideCheck){
	var newV = {x: v.x, y: v.y};
	var stop = 0;
	var collided = 0;
	var index = null;
	while(stop === 0){
		var colliding = 0;
		for(var i = 0; i < collideCheck.length; i++){
			if(collideCheck[i].vars.collisionSystem.type === "rect"){
				if(containsV({x: newV.x, y: newV.y}, {v1: {x: collideCheck[i].vars.v.x - collideCheck[i].vars.v2.x / 2, y: collideCheck[i].vars.v.y - collideCheck[i].vars.v2.y / 2},
				v2: {x: collideCheck[i].vars.v.x + collideCheck[i].vars.v2.x / 2, y: collideCheck[i].vars.v.y + collideCheck[i].vars.v2.y / 2}}) === 1){
					colliding = 1;
					collided = 1;
					index = i;
				}
			}
			if(collideCheck[i].vars.collisionSystem.type === "circle"){
				if(getDistanceV(newV, collideCheck[i].vars.v) < (collideCheck[i].vars.collisionSystem.radius)){
					colliding = 1;
					collided = 1;
					index = i;
				}
			}
		}
		/*var distanceFromOrigin = getDistanceV(originV, newV);
		distanceFromOrigin = Math.round(distanceFromOrigin);*/
		var distanceTravelled = getDistanceV(v, newV);
		distanceTravelled = Math.round(distanceTravelled);
		if(
		/*(distanceFromOrigin < maxDistance)
		&& */(distanceTravelled < speed)
		&& (colliding === 0)
		){
			newV.x += speedPerCheck.x;
			newV.y += speedPerCheck.y;
		}
		else{
			stop = 1;
		}
	}
	return {v: newV, collided: collided, index: index};
}

//Initial objectList and vars declared and specified here
var initobjectList = [];

//Initialize spriteList
var spriteList = [];

function loadSprites(){
	var defaultSprite = {img: loadImage("\images/Default_Sprite.png"), id: "default"};
	defaultSprite.img.width = 64;
	defaultSprite.img.height = 64;
	spriteList.push(defaultSprite);

	var circleSprite = {img: loadImage("\images/Circle_Sprite.png"), id: "circle"};
	circleSprite.img.width = 64;
	circleSprite.img.height = 64;
	spriteList.push(circleSprite);
	
	// Load Zombies Sprites
	var zombie1_walk0Sprite = {img: loadImage("\images/zombie1_walk/img_0.png"), id: "zombie1_walk0"};
	zombie1_walk0Sprite.img.width = 64;
	zombie1_walk0Sprite.img.height = 64;
	spriteList.push(zombie1_walk0Sprite);

	var zombie1_walk1Sprite = {img: loadImage("\images/zombie1_walk/img_1.png"), id: "zombie1_walk1"};
	zombie1_walk1Sprite.img.width = 64;
	zombie1_walk1Sprite.img.height = 64;
	spriteList.push(zombie1_walk1Sprite);

	var zombie1_walk2Sprite = {img: loadImage("\images/zombie1_walk/img_2.png"), id: "zombie1_walk2"};
	zombie1_walk2Sprite.img.width = 64;
	zombie1_walk2Sprite.img.height = 64;
	spriteList.push(zombie1_walk2Sprite);

	var zombie1_walk3Sprite = {img: loadImage("\images/zombie1_walk/img_3.png"), id: "zombie1_walk3"};
	zombie1_walk3Sprite.img.width = 64;
	zombie1_walk3Sprite.img.height = 64;
	spriteList.push(zombie1_walk3Sprite);

	var zombie1_walk4Sprite = {img: loadImage("\images/zombie1_walk/img_4.png"), id: "zombie1_walk4"};
	zombie1_walk4Sprite.img.width = 64;
	zombie1_walk4Sprite.img.height = 64;
	spriteList.push(zombie1_walk4Sprite);

	var zombie1_walk5Sprite = {img: loadImage("\images/zombie1_walk/img_5.png"), id: "zombie1_walk5"};
	zombie1_walk5Sprite.img.width = 64;
	zombie1_walk5Sprite.img.height = 64;
	spriteList.push(zombie1_walk5Sprite);

	var zombie1_walk6Sprite = {img: loadImage("\images/zombie1_walk/img_6.png"), id: "zombie1_walk6"};
	zombie1_walk6Sprite.img.width = 64;
	zombie1_walk6Sprite.img.height = 64;
	spriteList.push(zombie1_walk6Sprite);

	var zombie1_deadSprite = {img: loadImage("\images/zombie1_dead/img_0.png"), id: "zombie1_dead0"};
	zombie1_deadSprite.img.width = 128;
	zombie1_deadSprite.img.height = 64;
	spriteList.push(zombie1_deadSprite);

	// Load Gun Shot Effect Sprites
	var gun1_shot_effect0Sprite = {img: loadImage("\images/effects/gun_shots/gun1/img_0.png"), id: "gun1_shot_effect0"};
	gun1_shot_effect0Sprite.img.width = 16;
	gun1_shot_effect0Sprite.img.height = 16;
	spriteList.push(gun1_shot_effect0Sprite);
	
	// Load Blood Splat Effect Sprites
	var blood_splat1_effect0Sprite = {img: loadImage("\images/effects/blood_splats/blood_splat_1/img_0.png"), id: "blood_splat1_effect0"};
	blood_splat1_effect0Sprite.img.width = 96;
	blood_splat1_effect0Sprite.img.height = 96;
	spriteList.push(blood_splat1_effect0Sprite);
	
	var blood_splat1_effect1Sprite = {img: loadImage("\images/effects/blood_splats/blood_splat_1/img_1.png"), id: "blood_splat1_effect1"};
	blood_splat1_effect1Sprite.img.width = 96;
	blood_splat1_effect1Sprite.img.height = 96;
	spriteList.push(blood_splat1_effect1Sprite);
	
	var blood_splat1_effect2Sprite = {img: loadImage("\images/effects/blood_splats/blood_splat_1/img_2.png"), id: "blood_splat1_effect2"};
	blood_splat1_effect2Sprite.img.width = 96;
	blood_splat1_effect2Sprite.img.height = 96;
	spriteList.push(blood_splat1_effect2Sprite);
	
	var blood_splat1_effect3Sprite = {img: loadImage("\images/effects/blood_splats/blood_splat_1/img_3.png"), id: "blood_splat1_effect3"};
	blood_splat1_effect3Sprite.img.width = 96;
	blood_splat1_effect3Sprite.img.height = 96;
	spriteList.push(blood_splat1_effect3Sprite);
	
	var blood_splat1_effect4Sprite = {img: loadImage("\images/effects/blood_splats/blood_splat_1/img_4.png"), id: "blood_splat1_effect4"};
	blood_splat1_effect4Sprite.img.width = 96;
	blood_splat1_effect4Sprite.img.height = 96;
	spriteList.push(blood_splat1_effect4Sprite);
	
	var blood_splat1_effect5Sprite = {img: loadImage("\images/effects/blood_splats/blood_splat_1/img_5.png"), id: "blood_splat1_effect5"};
	blood_splat1_effect5Sprite.img.width = 96;
	blood_splat1_effect5Sprite.img.height = 96;
	spriteList.push(blood_splat1_effect5Sprite);
	
	// Load Background Sprites
	var backgroundSprite = {img: loadImage("\images/Dirt_Background_Sprite.png"), id: "background_dirt"};
	backgroundSprite.img.width = 2560;
	backgroundSprite.img.height = 1440;
	spriteList.push(backgroundSprite);
}
loadSprites();

Game.staticVars.spriteList = spriteList;
//****************//

zombie1_walkAnimation = [
	{
		img: getImage(spriteList, "zombie1_walk0"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk1"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk2"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk3"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk3"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk2"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk1"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk0"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk4"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk5"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk6"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk6"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk5"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk4"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "zombie1_walk0"),
		v1: {x: 0, y: 0},
		v2: {x: 10, y: 10},
		vOffset: {x: 0, y: 0},
		dir: 0
	}
]

zombie1_deadAnimation = [
	{
		img: getImage(spriteList, "zombie1_dead0"),
		v1: {x: 0, y: 0},
		v2: {x: 64, y: 0},
		vOffset: {x: -32, y: 0},
		dir: 0
	}
];

gun1_shot_effectAnimation = [
	{
		img: getImage(spriteList, "gun1_shot_effect0"),
		v1: {x: 0, y: 0},
		v2: {x: -32, y: -32},
		vOffset: {x: 48, y: 0},
		dir: 0
	}
];

blood_splat1_effectAnimation = [
	{
		img: getImage(spriteList, "blood_splat1_effect0"),
		v1: {x: 0, y: 0},
		v2: {x: 96, y: 96},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "blood_splat1_effect1"),
		v1: {x: 0, y: 0},
		v2: {x: 96, y: 96},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "blood_splat1_effect2"),
		v1: {x: 0, y: 0},
		v2: {x: 96, y: 96},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "blood_splat1_effect3"),
		v1: {x: 0, y: 0},
		v2: {x: 96, y: 96},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "blood_splat1_effect4"),
		v1: {x: 0, y: 0},
		v2: {x: 96, y: 96},
		vOffset: {x: 0, y: 0},
		dir: 0
	},
	{
		img: getImage(spriteList, "blood_splat1_effect5"),
		v1: {x: 0, y: 0},
		v2: {x: 96, y: 96},
		vOffset: {x: 0, y: 0},
		dir: 0
	}
]

//****************//Objects

//HUD Object
var hudObj = {
	events: {
		update: function(vars, events, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			for(var i = 0; i < vars.huds.length; i++){
				//vars.huds[i].vars = vars.huds[i].events.update(vars.huds[i].vars);
				var tempHud = vars.huds[i];
				
				tempHud.vars = tempHud.events.update(tempHud.vars, gsVars);
				
			}
			
			rVars.hudObj.vars = vars;
			gsVars.rooms.currentRoom.roomVars = rVars;
			return {gsVars: gsVars};
		},
		render: function(vars, events, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			for(var i = 0; i < vars.huds.length; i++){
				//vars.huds[i].vars = vars.huds[i].events.update(vars.huds[i].vars);
				var tempHud = vars.huds[i];
				
				tempHud.events.render(tempHud.vars, gsVars);
				
			}
			
		}/*,
		addHud: function(hudEvents, hudVars, vars){
			var newVars = vars;
			
			var newHud = {
				events: hudEvents,
				vars: hudVars
			};
			vars.huds.push(newHud);
			
			return newVars;
		}*/
	},
	vars: {
		
		huds: []
		
	}
}

var playerHud = {
	events: {
		update: function(vars, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			vars.offset.x = rVars.camObj.vars.finalV.x;
			vars.offset.y = rVars.camObj.vars.finalV.y;
			
			var tempBulletAdvCount = 0;
			var tempZombieCount = 0;
			for(var i = 0; i < rVars.objectList.length; i++){
				var tempObj = rVars.objectList[i];
				
				if(tempObj.vars.id === "bulletAdv"){
					tempBulletAdvCount += 1;
				}
				if(tempObj.vars.id === "zombie"){
					tempZombieCount += 1;
				}
			}
			vars.objectCounter.bulletAdvCount = tempBulletAdvCount;
			vars.objectCounter.zombieCount = tempZombieCount;
			
			return vars;
		},
		render: function(vars, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			if(vars.showHud === 1){
				drawRectOutline({x: vars.v.x - vars.offset.x, y: vars.v.y - vars.offset.y}, {x: 0, y: 0}, vars.v2, vars.dir, vars.drawVars.lineColour, 2, 1);
				drawTextFilled({x: vars.v.x - vars.offset.x + 10, y: vars.v.y - vars.offset.y + 48}, {x: 0, y: 0}, vars.v2, vars.dir, "#000000", "20px Arial", "Advanced Bullet count: " + vars.objectCounter.bulletAdvCount, 1);
				drawTextFilled({x: vars.v.x - vars.offset.x + 10, y: vars.v.y - vars.offset.y + 16}, {x: 0, y: 0}, vars.v2, vars.dir, "#000000", "20px Arial", "Zombie count: " + vars.objectCounter.zombieCount, 1);
			}
			
		}
	},
	vars: {
		offset: {x: 0, y: 0},
		v: {x: baseWidth - 256/2, y: baseHeight - 256/2},
		v2: {x: 256, y: 256},
		target: {v: {x: 0, y: 0}},
		id: "playerHud",
		dir: 0,
		drawVars: {
			lineColour: "#000000",
			lineAlpha: 1
		},
		showHud: 1,
		cells: [],
		objectCounter: {
			bulletAdvCount: 0,
			zombieCount: 0
		}
	}
}
//hudObj.vars.huds.push(playerHud);

//Object counter
var objCounter = {
	events: {
		update: {
			
		},
		render: {
			
		}
	},
	vars: {
		
	}
}

var mainHud = {
	events: {
		update: function(vars, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			vars.offset.x = rVars.camObj.vars.finalV.x;
			vars.offset.y = rVars.camObj.vars.finalV.y;
			
			// Objects
			vars.objectCounter.bulletAdvCount = 0;
			vars.objectCounter.zombieCount = 0;
			for(var i = 0; i < rVars.objectList.length; i++){
				var tempObj = rVars.objectList[i];
				if(tempObj.vars.id === "bulletAdv"){
					vars.objectCounter.bulletAdvCount += 1;
				}
				if(tempObj.vars.id === "zombie"){
					vars.objectCounter.zombieCount += 1;
				}
			}
			
			// Particles
			vars.objectCounter.zombieBlood = 0;
			vars.objectCounter.zombieBodyDead = 0;
			for(var i = 0; i < rVars.particleList.length; i++){
				var tempObj = rVars.particleList[i];
				if(tempObj.vars.id === "zombie_blood"){
					vars.objectCounter.zombieBlood += 1;
				}
				if(tempObj.vars.id === "zombie_body_dead"){
					vars.objectCounter.zombieBodyDead += 1;
				}
			}
			
			return vars;
		},
		render: function(vars, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			drawRectOutline({x: vars.v.x - vars.offset.x, y: vars.v.y - vars.offset.y}, {x: 0, y: 0}, vars.v2, vars.dir, vars.drawVars.lineColour, 2, vars.drawVars.lineAlpha);
			drawTextFilled({x: vars.v.x - vars.offset.x - vars.v2.x/2, y: vars.v.y - vars.offset.y + 16}, {x: 0, y: 0}, vars.v2, vars.dir, vars.drawVars.lineColour, "20px Arial", "ZBlood Particle count: " + vars.objectCounter.zombieBlood, vars.drawVars.lineAlpha);
			drawTextFilled({x: vars.v.x - vars.offset.x - vars.v2.x/2, y: vars.v.y - vars.offset.y + 48}, {x: 0, y: 0}, vars.v2, vars.dir, vars.drawVars.lineColour, "20px Arial", "Zbody Particle count: " + vars.objectCounter.zombieBodyDead, vars.drawVars.lineAlpha);
			drawTextFilled({x: vars.v.x - vars.offset.x - vars.v2.x/2, y: vars.v.y - vars.offset.y + 80}, {x: 0, y: 0}, vars.v2, vars.dir, vars.drawVars.lineColour, "20px Arial", "Zombie count: " + vars.objectCounter.zombieCount, vars.drawVars.lineAlpha);
			drawTextFilled({x: vars.v.x - vars.offset.x - vars.v2.x/2, y: vars.v.y - vars.offset.y + 112}, {x: 0, y: 0}, vars.v2, vars.dir, vars.drawVars.lineColour, "20px Arial", "Advanced Bullet count: " + vars.objectCounter.bulletAdvCount, vars.drawVars.lineAlpha);
		}
	},
	vars: {
		offset: {x: 0, y: 0},
		v: {x: baseWidth - 256/2, y: baseHeight - 256/2},
		v2: {x: 256, y: 256},
		id: "mainHud",
		dir: 0,
		drawVars: {
			lineColour: "#000000",
			lineAlpha: 1
		},
		cells: [],
		objectCounter: {
			bulletAdvCount: 0,
			zombieCount: 0,
			zombieBlood: 0,
			zombieBodyDead: 0
		}
	}
}
hudObj.vars.huds.push(mainHud);

//Camera Object
var camObj = {
	events: {
		update: function(vars, events, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			if(rVars.mouseObj.vars.buttons[2].finalDown === 1){
				vars.timer1 = updateTimer(vars.timer1);
			}
			else{
				vars.timer1.time = 0;
			}
			
			//Experimental Mouse-Camera Tweening
			var targetMouseOffsetV = {x: 0, y: 0};
			if(rVars.mouseObj.vars.buttons[2].finalDown === 1 && vars.timer1.done === 1){
				targetMouseOffsetV.x = (baseWidth/2 - rVars.mouseObj.vars.baseV.x)/2;//Target Position plus mouse-camera tween
				targetMouseOffsetV.y = (baseHeight/2 - rVars.mouseObj.vars.baseV.y)/2;//Target Position plus mouse-camera tween
			}
			if(rVars.mouseObj.vars.buttons[2].finalDown === 0 && vars.timer1.done === 1){
				if(vars.timer1.loops > vars.timer1.minLoops){
					vars.timer1.loops -= 1;
				}
			}
			vars.offset.x = targetMouseOffsetV.x;
			vars.offset.y = targetMouseOffsetV.y;
			//End of Experimental Mouse-Camera Tweening
			
			vars.totalOffset.x = vars.offset.x + (-vars.target.v.x); 
			vars.totalOffset.y = vars.offset.y + (-vars.target.v.y);
			
			vars.v.x += vars.vel.x;
			vars.v.y += vars.vel.y;
			
			vars.finalV.x = vars.v.x + vars.totalOffset.x;
			vars.finalV.y = vars.v.y + vars.totalOffset.y;
			
			rVars.camObj.vars = vars;
			gsVars.rooms.currentRoom.roomVars = rVars;
			return {gsVars: gsVars};
		}
	},
	vars: {
		v: {x: baseWidth/2, y: baseHeight/2},
		finalV: {x: 0, y: 0},
		offset: {x: 0, y: 0},
		mouseFollowSpeed: 3,
		followSpeedMultiplier: 2,
		offsetVel: {x: 0, y: 0},
		totalOffset: {x: 0, y: 0},
		vel: {x: 0, y: 0},
		panSpeed: 4,
		target: {
			v: {x: 0, y: 0},
			obj: {}
		},
		timer1: {
			time: 0,
			rate: 1 / 60,
			maxTime: 0.25,
			maxLoops: 1,
			minLoops: 0,
			loops: 0,
			done: 0,
			restart: 0
		}
	}
}

//Mouse Object
var mouseObj = {
	events: {
		update: function(vars, events, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			/*if(vars.buttons[0].down === 1){
				console.log("Left mouse button is pressed.");
			}
			if(vars.mousePressed.button[2] === 1){
				console.log("Right mouse button is pressed.");
			}
			if(vars.mousePressed.button[1] === 1){
				console.log("Middle mouse button is pressed.");
			}*/
			
			vars.offset.x = rVars.camObj.vars.finalV.x;
			vars.offset.y = rVars.camObj.vars.finalV.y;
			
			vars.v.x = vars.baseV.x - vars.offset.x;
			vars.v.y = vars.baseV.y - vars.offset.y;
			
			vars.buttons[0].v.x = vars.buttons[0].baseV.x - vars.offset.x;
			vars.buttons[0].v.y = vars.buttons[0].baseV.y - vars.offset.y;
			
			vars.buttons[2].v.x = vars.buttons[2].baseV.x - vars.offset.x;
			vars.buttons[2].v.y = vars.buttons[2].baseV.y - vars.offset.y;
			
			vars.buttons[1].v.x = vars.buttons[1].baseV.x - vars.offset.x;
			vars.buttons[1].v.y = vars.buttons[1].baseV.y - vars.offset.y;
			
			//Left Mouse Button
			if(vars.buttons[0].down === 1 && vars.buttons[0].up === 1){
				
				/*rVars.camObj.vars.target.v.x = vars.buttons[0].v.x - vars.offset.x;
				rVars.camObj.vars.target.v.y = vars.buttons[0].v.y - vars.offset.y;*/
				
				vars.buttons[0].finalDown = 1;
				vars.buttons[0].finalUp = 0;
				
				vars.clickTimer1.loops = 0;
				vars.clickTimer1.done = 0;
				
				vars.buttons[0].up = 0;
				
			}
			else if(vars.buttons[0].down === 1 && vars.buttons[0].up === 0){
				
				vars.buttons[0].finalDown = 1;
				vars.buttons[0].finalUp = 0;
				
			}
			if(vars.buttons[0].down === 0 && vars.buttons[0].up === 0){
				
				vars.buttons[0].finalDown = 0;
				vars.buttons[0].finalUp = 1;
				
				vars.clickTimer2.loops = 0;
				vars.clickTimer2.done = 0;
				
				vars.buttons[0].up = 1;
				
			}
			else if(vars.buttons[0].down === 0 && vars.buttons[0].up === 1){
				
				vars.buttons[0].finalDown = 0;
				vars.buttons[0].finalUp = 1;
				
			}
			
			//Right Mouse Button
			if(vars.buttons[2].down === 1 && vars.buttons[2].up === 1){
				
				vars.buttons[2].finalDown = 1;
				vars.buttons[2].finalUp = 0;
				
				vars.clickTimer1.loops = 0;
				vars.clickTimer1.done = 0;
				
				vars.buttons[2].up = 0;
				
			}
			else if(vars.buttons[2].down === 1 && vars.buttons[2].up === 0){
				
				vars.buttons[2].finalDown = 1;
				vars.buttons[2].finalUp = 0;
				
			}
			if(vars.buttons[2].down === 0 && vars.buttons[2].up === 0){
				
				vars.buttons[2].finalDown = 0;
				vars.buttons[2].finalUp = 1;
				
				vars.clickTimer2.loops = 0;
				vars.clickTimer2.done = 0;
				
				vars.buttons[2].up = 1;
				
			}
			else if(vars.buttons[2].down === 0 && vars.buttons[2].up === 1){
				
				vars.buttons[2].finalDown = 0;
				vars.buttons[2].finalUp = 1;
				
			}
			
			//Middle Mouse Button
			if(vars.buttons[1].down === 1 && vars.buttons[1].up === 1){
				
				vars.buttons[1].finalDown = 1;
				vars.buttons[1].finalUp = 0;
				
				vars.clickTimer1.loops = 0;
				vars.clickTimer1.done = 0;
				
				vars.buttons[1].up = 0;
				
			}
			else if(vars.buttons[1].down === 1 && vars.buttons[1].up === 0){
				
				vars.buttons[1].finalDown = 1;
				vars.buttons[1].finalUp = 0;
				
			}
			if(vars.buttons[1].down === 0 && vars.buttons[1].up === 0){
				
				vars.buttons[1].finalDown = 0;
				vars.buttons[1].finalUp = 1;
				
				vars.clickTimer2.loops = 0;
				vars.clickTimer2.done = 0;
				
				vars.buttons[1].up = 1;
				
			}
			else if(vars.buttons[1].down === 0 && vars.buttons[1].up === 1){
				
				vars.buttons[1].finalDown = 0;
				vars.buttons[1].finalUp = 1;
				
			}
			
			rVars.mouseObj.vars = vars;
			gsVars.rooms.currentRoom.roomVars = rVars;
			return {gsVars: gsVars};
		},
		render: function(vars){
			
			if(vars.buttons[0].down === 1){
				drawCircleFilled(vars.v, {x: 0, y: 0}, 8, {x: 1, y: 1}, 0, "#ff1100", 1);
			}
			else{
				drawCircleFilled(vars.v, {x: 0, y: 0}, 8, {x: 1, y: 1}, 0, "#000000", 1);
			}
			
		}
	},
	vars: {
		v: {x: 0, y: 0},
		baseV: {x: 0, y: 0},
		offset: {x: 0, y: 0},
		buttonsDown: 0,
		buttons: [{finalDown: 0, finalUp: 0, clickDown: 0, clickUp: 0, down: 0, up: 1, baseV: {x: 0, y: 0}, v: {x: 0, y: 0}}, {finalDown: 0, finalUp: 0, clickDown: 0, clickUp: 0, down: 0, up: 1, baseV: {x: 0, y: 0}, v: {x: 0, y: 0}}, {finalDown: 0, finalUp: 0, clickDown: 0, clickUp: 0, down: 0, up: 1, baseV: {x: 0, y: 0}, v: {x: 0, y: 0}}],
		clickTimer1: {
			time: 0,
			maxTime: 4,
			rate: 1 / 60,
			loops: 1,
			maxLoops: 1,
			done: 1
		},
		clickTimer2: {
			time: 0,
			maxTime: 4,
			rate: 1 / 60,
			loops: 1,
			maxLoops: 1,
			done: 1
		}
	}
};

//keyController
var keyObj = {
	events: {
		update: function(vars, events, gsVars){
			var rVars = gsVars.rooms.currentRoom.roomVars;
			
			//W & S Keys
			if(vars.keyChecks.wKey === 1 && vars.keyChecks.sKey === 0){
				vars.keysPressed.wKey = 1;
				vars.keysPressed.sKey = 0;
			}
			if(vars.keyChecks.wKey === 0 && vars.keyChecks.sKey === 1){
				vars.keysPressed.wKey = 0;
				vars.keysPressed.sKey = 1;
			}
			if((vars.keyChecks.wKey === 1 && vars.keyChecks.sKey === 1) || (vars.keyChecks.wKey === 0 && vars.keyChecks.sKey === 0)){
				vars.keysPressed.wKey = 0;
				vars.keysPressed.sKey = 0;
			}
			
			//A & D Keys
			if(vars.keyChecks.aKey === 1 && vars.keyChecks.dKey === 0){
				vars.keysPressed.aKey = 1;
				vars.keysPressed.dKey = 0;
			}
			if(vars.keyChecks.aKey === 0 && vars.keyChecks.dKey === 1){
				vars.keysPressed.aKey = 0;
				vars.keysPressed.dKey = 1;
			}
			if((vars.keyChecks.aKey === 1 && vars.keyChecks.dKey === 1) || (vars.keyChecks.aKey === 0 && vars.keyChecks.dKey === 0)){
				vars.keysPressed.aKey = 0;
				vars.keysPressed.dKey = 0;
			}
			
			/*//W and S Keys
			if(vars.keyChecks.wKey === 1 && vars.keyChecks.sKey === 0){
				Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.vel.y = Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.panSpeed;
			}
			if(vars.keyChecks.sKey === 1 && vars.keyChecks.wKey === 0){
				Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.vel.y = -Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.panSpeed;
			}
			if((vars.keyChecks.wKey === 1 && vars.keyChecks.sKey === 1) || (vars.keyChecks.wKey === 0 && vars.keyChecks.sKey === 0)){
				Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.vel.y = 0;
			}
			
			//A and D Keys
			if(vars.keyChecks.aKey === 1 && vars.keyChecks.dKey === 0){
				Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.vel.x = Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.panSpeed;
			}
			if(vars.keyChecks.dKey === 1 && vars.keyChecks.aKey === 0){
				Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.vel.x = -Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.panSpeed;
			}
			if((vars.keyChecks.aKey === 1 && vars.keyChecks.dKey === 1) || (vars.keyChecks.aKey === 0 && vars.keyChecks.dKey === 0)){
				Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.vel.x = 0;
			}*/
			
			rVars.keyObj.vars = vars;
			gsVars.rooms.currentRoom.roomVars = rVars;
			return {gsVars: gsVars};
		}
	},
	vars: {
		keyChecks: {wKey: 0, sKey: 0, aKey: 0, dKey: 0},
		keysPressed: {wKey: 0, sKey: 0, aKey: 0, dKey: 0}
	}
};

function createPlayer(v){
	var player = {
		events: {
			update: function(vars, events, gsVars, objIndex){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				var objectListToAdd = [];
				var particleListToAdd = [];
				
				vars.pointTarget.v = rVars.mouseObj.vars.v;
				
				//Smooth/Tweened Movement
				if(rVars.keyObj.vars.keysPressed.wKey === 1){
					if(vars.vel.y >= -vars.movement.speed){
						vars.vel.y -= vars.movement.acceleration;
					}
					if(vars.vel.y <= -vars.movement.speed){
						vars.vel.y = -vars.movement.speed;
					}
				}
				if(rVars.keyObj.vars.keysPressed.sKey === 1){
					if(vars.vel.y <= vars.movement.speed){
						vars.vel.y += vars.movement.acceleration;
					}
					if(vars.vel.y >= vars.movement.speed){
						vars.vel.y = vars.movement.speed;
					}
				}
				if(rVars.keyObj.vars.keysPressed.wKey === 0 && rVars.keyObj.vars.keysPressed.sKey === 0){
					if(vars.vel.y >= 0 + vars.movement.damping){
						vars.vel.y -= vars.movement.damping;
					}
					if(vars.vel.y <= 0 - vars.movement.damping){
						vars.vel.y += vars.movement.damping;
					}
					if(vars.vel.y >= 0 - vars.movement.damping && vars.vel.y <= 0 + vars.movement.damping){
						vars.vel.y = 0;
					}
				}
				
				if(rVars.keyObj.vars.keysPressed.aKey === 1){
					if(vars.vel.x >= -vars.movement.speed){
						vars.vel.x -= vars.movement.acceleration;
					}
					if(vars.vel.x <= -vars.movement.speed){
						vars.vel.x = -vars.movement.speed;
					}
				}
				if(rVars.keyObj.vars.keysPressed.dKey === 1){
					if(vars.vel.x <= vars.movement.speed){
						vars.vel.x += vars.movement.acceleration;
					}
					if(vars.vel.x >= vars.movement.speed){
						vars.vel.x = vars.movement.speed;
					}
				}
				if(rVars.keyObj.vars.keysPressed.aKey === 0 && rVars.keyObj.vars.keysPressed.dKey === 0){
					if(vars.vel.x >= 0 + vars.movement.damping){
						vars.vel.x -= vars.movement.damping;
					}
					if(vars.vel.x <= 0 - vars.movement.damping){
						vars.vel.x += vars.movement.damping;
					}
					if(vars.vel.x >= 0 - vars.movement.damping && vars.vel.x <= 0 + vars.movement.damping){
						vars.vel.x = 0;
					}
				}
				//End of Smooth/Tweened Movement
				
				vars.dir = getAngleV(vars.v, vars.pointTarget.v);
				
				if(vars.dir > 180){
					vars.dir = -180;
				}
				if(vars.dir < -180){
					vars.dir = 180;
				}
				
				// Update Animation and timers
				for(var i = 0; i < vars.sprite.parts.length; i++){
					if(vars.sprite.parts[i].on === 1){
						if(vars.sprite.parts[i].id != "shot_effect"){
							if(vars.sprite.parts[i].animation.loops < vars.sprite.parts[i].animation.maxLoops || vars.sprite.parts[i].animation.maxLoops === -1){
								vars.sprite.parts[i].animation.frameTimer = updateTimer(vars.sprite.parts[i].animation.frameTimer);
								if(vars.sprite.parts[i].animation.frameTimer.done === 1){
									vars.sprite.parts[i].animation = updateAnimation(vars.sprite.parts[i].animation);
									vars.sprite.parts[i].animation.frameTimer.done = 0;
								}
							}
						}
					}
				}
				
				vars.spawnVars.timers.spawnTimer = updateTimer(vars.spawnVars.timers.spawnTimer);
				if(vars.spawnVars.timers.spawnTimer.done === 1){
					vars.spawnVars.canSpawn = 1;
				}
				
				// Check mouse button inputs
				// Left mouse button
				// Down
				if(rVars.mouseObj.vars.buttons[0].finalDown === 1){
					// Only do something when button is first pressed down
					if(vars.clickVars.clickDownToggle[0] === 1){
						// Toggle attack to on
						vars.attackVars.on = 1;
						vars.clickVars.clickDownToggle[0] = 0;
					}
					// Do something as long as the button is pressed
				}
				else{
					vars.clickVars.clickDownToggle[0] = 1;
				}
				// Up
				if(rVars.mouseObj.vars.buttons[0].finalUp === 1){
					// Only do something when button is first pressed down
					if(vars.clickVars.clickUpToggle[0] === 1){
						// Toggle attack to off
						vars.attackVars.on = 0;
						vars.clickVars.clickUpToggle[0] = 0;
					}
					// Do something as long as the button is not pressed
				}
				else{
					vars.clickVars.clickUpToggle[0] = 1;
				}
				
				// Middle mouse button
				// Down
				if(rVars.mouseObj.vars.buttons[1].finalDown === 1){
					// Only do something when button is first pressed down
					if(vars.clickVars.clickDownToggle[1] === 1){
						vars.clickVars.clickDownToggle[1] = 0;
					}
					// Do something as long as the button is pressed
					// Make some zombies
					if(vars.spawnVars.canSpawn === 1){
						//Spawn a Zombie at mouse position
						var zombie;
						var numZ = 4;/*4*/
						for(var i = 0; i < numZ; i++){
							var tempMultiplier = Math.round(Math.random() * 2);
							var tempSize = 64;
							var tempV2 = {x: tempSize, y: tempSize};
							var tempSpeed = tempMultiplier * tempMultiplier + 2;
							zombie = createZombie({x: rVars.mouseObj.vars.v.x, y: rVars.mouseObj.vars.v.y}, tempV2, tempSpeed);
							if(numZ > 1){
								if(i % 2 === 0){
									zombie.vars.v.x += zombie.vars.v2.x/4 + (zombie.vars.v2.x * i)/2;
								}
								else{
									zombie.vars.v.x += -zombie.vars.v2.x/4 -(zombie.vars.v2.x * i)/2;
								}
							}
							objectListToAdd = addObject(zombie, objectListToAdd);
						}
						vars.spawnVars.canSpawn = 0;
						vars.spawnVars.timers.spawnTimer.loops = 0;
					}
				}
				else{
					vars.clickVars.clickDownToggle[1] = 1;
				}
				// Up
				if(rVars.mouseObj.vars.buttons[1].finalUp === 1){
					// Only do something when button is first pressed down
					if(vars.clickVars.clickUpToggle[1] === 1){
						vars.clickVars.clickUpToggle[1] = 0;
					}
					// Do something as long as the button is not pressed
				}
				else{
					vars.clickVars.clickUpToggle[1] = 1;
				}
				
				// Item System
				if(vars.itemSystem.currentItem.currentWeapon.id === "none"){
					for(var i = 0; i < vars.itemSystem.weaponList.length; i++){
						if(vars.itemSystem.weaponList[i].id === "minigun"){
							vars.itemSystem.currentItem.currentWeapon = vars.itemSystem.weaponList[i];
						}
					}
				}
				var tempVars = vars.itemSystem.currentItem.currentWeapon.update(vars, rVars, objectListToAdd, particleListToAdd, objIndex);
				rVars = tempVars.rVars;
				vars = tempVars.vars;
				objectListToAdd = tempVars.objectListToAdd;
				//console.log("objects to add = " + objectListToAdd);
				particleListToAdd = tempVars.particleListToAdd;
				
				//Set Camera v to player v
				rVars.camObj.vars.target.v.x = vars.v.x;
				rVars.camObj.vars.target.v.y = vars.v.y;
				
				vars.v.x += vars.movement.force.x;
				vars.v.y += vars.movement.force.y;
				vars.movement.force.x = 0;
				vars.movement.force.y = 0;
				
				vars.v.x += vars.vel.x;
				vars.v.y += vars.vel.y;
				
				rVars.objectList[objIndex].vars = vars;
				if(vars.destroy === 1){
					rVars.objectList[objIndex] = null;
				}
				/*for(var i = 0; i < objectListToAdd.length; i++){
					rVars.objectList = addObject(objectListToAdd[i], rVars.objectList);
				}*/
				for(var i = 0; i < particleListToAdd.length; i++){
					rVars.particleList = addObject(particleListToAdd[i], rVars.particleList);
				}
				gsVars.rooms.currentRoom.roomVars = rVars;
				return {gsVars: gsVars, objectListToAdd: objectListToAdd};
				
			},
			render: function(vars, oldEvents, gsVars){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				//Draw Object
				//drawRectFilled(vars.v, {x: 0, y: 0}, vars.v2, vars.dir, "#ffffff", 1);//"#eac086"
				
				//drawRectFilled(vars.v, {x: 0, y: 0}, vars.v2, 0, "#dddddd", 1);
				//drawRectOutline(vars.v, {x: 0, y: 0}, vars.v2, 0, "#000000", 2, 1);
				drawLine(vars.v, {x: 0, y: 0}, {x: vars.v2.x/2, y: 0}, vars.dir, "#000000", 2, 1);
				//var tempDrawList = [];
				for(var i = 0; i < vars.sprite.parts.length; i++){
					if(vars.sprite.parts[i].on === 1){
						//tempDrawList.push(vars.sprite.parts[i]);
						var tempImg = vars.sprite.parts[i];
						if(tempImg.animation.currentFrame.imgObj != null && tempImg.animation.currentFrame.imgObj != "none"){
							drawImg(
								{x: vars.v.x + tempImg.animation.currentFrame.imgObj.v1.x, y: vars.v.y + tempImg.animation.currentFrame.imgObj.v1.y},
								{x: tempImg.animation.currentFrame.imgObj.vOffset.x, y: tempImg.animation.currentFrame.imgObj.vOffset.y},
								{x: vars.v2.x + tempImg.animation.currentFrame.imgObj.v2.x, y: vars.v2.y + tempImg.animation.currentFrame.imgObj.v2.y},
								vars.dir + tempImg.animation.currentFrame.imgObj.dir, tempImg.animation.currentFrame.imgObj.img, 1
							);
						}
					}
				}
				for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts.length; i++){
					if(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].on === 1){
						//tempDrawList.push(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i]);
						var tempImg = vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i];
						if(tempImg.animation.currentFrame.imgObj != null && tempImg.animation.currentFrame.imgObj != "none"){
							drawImg(
								{x: vars.v.x + tempImg.animation.currentFrame.imgObj.v1.x, y: vars.v.y + tempImg.animation.currentFrame.imgObj.v1.y},
								{x: tempImg.animation.currentFrame.imgObj.vOffset.x, y: tempImg.animation.currentFrame.imgObj.vOffset.y},
								{x: vars.v2.x + tempImg.animation.currentFrame.imgObj.v2.x, y: vars.v2.y + tempImg.animation.currentFrame.imgObj.v2.y},
								vars.dir + tempImg.animation.currentFrame.imgObj.dir, tempImg.animation.currentFrame.imgObj.img, 1
							);
						}
					}
				}
				/*tempDrawList = sortObjectListByDepth(tempDrawList);
				for(var i = 0; i < tempDrawList.length; i++){
					if(tempImg.animation.currentFrame.imgObj != null && tempImg.animation.currentFrame.imgObj != "none"){
						drawImg(
							{x: vars.v.x + tempImg.animation.currentFrame.imgObj.v1.x, y: vars.v.y + tempImg.animation.currentFrame.imgObj.v1.y},
							{x: tempImg.animation.currentFrame.imgObj.vOffset.x, y: tempImg.animation.currentFrame.imgObj.vOffset.y},
							{x: vars.v2.x + tempImg.animation.currentFrame.imgObj.v2.x, y: vars.v2.y + tempImg.animation.currentFrame.imgObj.v2.y},
							vars.dir + tempImg.animation.currentFrame.imgObj.dir, tempImg.animation.currentFrame.imgObj.img, 1
						);
					}
				}*/
			},
			onCreate: function(vars, gsVars){
				
				return {gsVars: gsVars};
			},
			onLoad: function(vars, gsVars){
				//Load persistant/global vars from room
				return {gsVars: gsVars};
			},
			onClose: function(vars, gsVars){
				//Save persistant/global vars from room
			}
		},
		vars: {
			destroy: 0,
			v: v,
			v2: {x: 64, y: 64},
			dir: 0,
			vel: {x: 0, y: 0},
			id: "player",
			depth: 90,
			hp: 100, maxHp: 100,
			tempTarget: {v: {x: 0, y: 0}},
			pointTarget: {v: {x: 0, y: 0}},
			hud: {
				vars: {show: 0}
			},
			sprite: {
				hasImage: 1,
				parts: [
					{
						id: "body",
						depth: 0,
						on: 1,
						animation: {
							nextFrame: 1,
							finalFrameIndex: 0,
							loops: 0,
							maxLoops: -1,
							currentFrame: {
								index: 0,
								imgObj: zombie1_walkAnimation[0]
							},
							frames: zombie1_walkAnimation,
							frameTimer: {
								time: 0,
								rate: 1 / 60,
								maxTime: 0.1,
								maxLoops: -1,
								minLoops: 0,
								loops: 0,
								done: 0
							}
						}
					}
				]
			},
			clickVars: {
				clickDownToggle: [0, 0, 0],
				clickUpToggle: [0, 0, 0],
			},
			timers: [],
			movement: {
				speed: 8,
				acceleration: 0.6,
				damping: 0.6,
				force: {x: 0, y: 0}
			},
			collisionSystem: {
				type: "circle",
				hitByBullet: 0,
				radius: 32
			},
			itemSystem: {
				currentItem: {
					currentWeapon: {
						id: "none"
					},
					currentActive: {},
					currentPasssive: {}
				},
				weaponList: [
					{
						id: "assault_rifle",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							// Update timers
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on === 1){
									vars.itemSystem.currentItem.currentWeapon.vars.timers[i] = updateTimer(vars.itemSystem.currentItem.currentWeapon.vars.timers[i]);
								}
							}
							
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "reload"){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done === 1){
										vars.itemSystem.currentItem.currentWeapon.vars.canShoot = 1;
									}
								}
							}
							
							//Shoot a bullet
							if(vars.attackVars.on === 1 && vars.itemSystem.currentItem.currentWeapon.vars.canShoot === 1){
								for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "shot_delay"){
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done = 1;
										for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i2++){
											if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].id === "reload"){
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].on = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].time = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].done = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].loops -= 1;
											}
										}
									}
								}
							}
							
							var bulletDetails = vars.itemSystem.currentItem.currentWeapon.vars.bulletDetails;
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "shot_delay"){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done === 1){
										if(bulletDetails.bulletsPerAttack < bulletDetails.maxBulletsPerAttack){
											// Create Bullets
											var tempBullet;
											
											for(var i2 = 0; i2 < bulletDetails.bulletsPerShot; i2++){
												var accuracyDir = (Math.random() * bulletDetails.bulletAccuracyOffset) - (Math.random() * bulletDetails.bulletAccuracyOffset);
												var spreadDir = 0;
												var tempOffset = {x: 0, y: 0};
												if(bulletDetails.fastFire.on === 1){
													tempRand = Math.random();
													tempOffset.x += lengthDirX(vars.dir + bulletDetails.fastFire.offsetDir, tempRand * (bulletDetails.fastFire.maxOffset / bulletDetails.bulletsPerShot) * i2);
													tempOffset.y += lengthDirY(vars.dir + bulletDetails.fastFire.offsetDir, tempRand * (bulletDetails.fastFire.maxOffset / bulletDetails.bulletsPerShot) * i2);
												}
												if(bulletDetails.bulletsPerShot > 1){
													spreadDir = (bulletDetails.bulletSpread*i2) + (bulletDetails.bulletSpread/2) - (bulletDetails.bulletSpread*bulletDetails.bulletsPerShot)/2;
													/*if(bulletDetails.bulletsPerShot % 2 === 0){
														spreadDir = (bulletDetails.bulletSpread * i2) - bulletDetails.bulletSpread * (bulletDetails.bulletsPerShot - 1.5);
													}
													else{
														console.log(1);
														spreadDir = (bulletDetails.bulletSpread * i2) - bulletDetails.bulletSpread;
													}*/
												}
												var tempDir = spreadDir + accuracyDir;
												tempBullet = createBulletAdvanced({x: vars.v.x + tempOffset.x, y: vars.v.y + tempOffset.y}, {x: vars.v.x + tempOffset.x, y: vars.v.y + tempOffset.y}, bulletDetails.bulletSpeed, vars.dir + tempDir, 200);
												objectListToAdd = addObject(tempBullet, objectListToAdd);
											}
											vars.itemSystem.currentItem.currentWeapon.vars.canShoot = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 0;
											bulletDetails.bulletsPerAttack += 1;
										}
										else{
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on = 0;
											bulletDetails.bulletsPerAttack = 0;
											for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i2++){
												if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].id === "reload"){
													vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].on = 1;
												}
											}
										}
									}
								}
							}
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							
							timers: [
								{
									id: "reload",
									on: 1,
									time: 0,
									rate: 1 / 60,
									maxTime: 16 / 60,
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0,
								},
								{
									id: "shot_delay",
									on: 0,
									time: 0,
									rate: 1 / 60,
									maxTime: 4 / 60,
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0,
								}
							],
							bulletDetails: {
								bulletsPerAttack: 0,
								maxBulletsPerAttack: 3,
								bulletsPerShot: 1,
								bulletSpread: 0,
								bulletAccuracyOffset: 5,
								bulletSpeed: 60,
								fastFire: {on: 0, offsetDir: 0, maxOffset: 0}
							},
							canShoot: 1,
							loaded: 1
						}
					},
					{
						id: "shotgun",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							// Update timers
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on === 1){
									vars.itemSystem.currentItem.currentWeapon.vars.timers[i] = updateTimer(vars.itemSystem.currentItem.currentWeapon.vars.timers[i]);
								}
							}
							
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "reload"){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done === 1){
										vars.itemSystem.currentItem.currentWeapon.vars.canShoot = 1;
									}
								}
							}
							
							//Shoot a bullet
							if(vars.attackVars.on === 1 && vars.itemSystem.currentItem.currentWeapon.vars.canShoot === 1){
								for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "shot_delay"){
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done = 1;
										for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i2++){
											if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].id === "reload"){
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].on = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].time = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].done = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].loops -= 1;
											}
										}
									}
								}
							}
							
							var bulletDetails = vars.itemSystem.currentItem.currentWeapon.vars.bulletDetails;
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "shot_delay"){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done === 1){
										if(bulletDetails.bulletsPerAttack < bulletDetails.maxBulletsPerAttack){
											// Create Bullets
											var tempBullet;
											
											for(var i2 = 0; i2 < bulletDetails.bulletsPerShot; i2++){
												var accuracyDir = (Math.random() * bulletDetails.bulletAccuracyOffset) - (Math.random() * bulletDetails.bulletAccuracyOffset);
												var spreadDir = 0;
												var tempOffset = {x: 0, y: 0};
												if(bulletDetails.fastFire.on === 1){
													var tempRand = Math.random();
													tempOffset.x += lengthDirX(vars.dir + bulletDetails.fastFire.offsetDir, tempRand * (bulletDetails.fastFire.maxOffset / bulletDetails.bulletsPerShot) * i2);
													tempOffset.y += lengthDirY(vars.dir + bulletDetails.fastFire.offsetDir, tempRand * (bulletDetails.fastFire.maxOffset / bulletDetails.bulletsPerShot) * i2);
												}
												if(bulletDetails.bulletsPerShot > 1){
													spreadDir = (bulletDetails.bulletSpread*i2) + (bulletDetails.bulletSpread/2) - (bulletDetails.bulletSpread*bulletDetails.bulletsPerShot)/2;
													/*if(bulletDetails.bulletsPerShot % 2 === 0){
														spreadDir = (bulletDetails.bulletSpread * i2) - bulletDetails.bulletSpread * (bulletDetails.bulletsPerShot - 1.5);
													}
													else{
														console.log(1);
														spreadDir = (bulletDetails.bulletSpread * i2) - bulletDetails.bulletSpread;
													}*/
												}
												var tempDir = spreadDir + accuracyDir;
												tempBullet = createBulletAdvanced({x: vars.v.x + tempOffset.x, y: vars.v.y + tempOffset.y}, {x: vars.v.x + tempOffset.x, y: vars.v.y + tempOffset.y}, bulletDetails.bulletSpeed, vars.dir + tempDir, 150);
												objectListToAdd = addObject(tempBullet, objectListToAdd);
											}
											vars.itemSystem.currentItem.currentWeapon.vars.canShoot = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 0;
											bulletDetails.bulletsPerAttack += 1;
										}
										else{
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on = 0;
											bulletDetails.bulletsPerAttack = 0;
											for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i2++){
												if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].id === "reload"){
													vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].on = 1;
												}
											}
										}
									}
								}
							}
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							
							timers: [
								{
									id: "reload",
									on: 1,
									time: 0,
									rate: 1 / 60,
									maxTime: 30 / 60,
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0,
								},
								{
									id: "shot_delay",
									on: 0,
									time: 0,
									rate: 1 / 60,
									maxTime: 1 / 60,
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0,
								}
							],
							bulletDetails: {
								bulletsPerAttack: 0,
								maxBulletsPerAttack: 1,
								bulletsPerShot: 5,
								bulletSpread: 2,
								bulletAccuracyOffset: 5,
								bulletSpeed: 60,
								fastFire: {on: 1, offsetDir: 0, maxOffset: 32}
							},
							canShoot: 1,
							loaded: 1
						}
					},
					{
						id: "minigun",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							// Update timers
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on === 1){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops < vars.itemSystem.currentItem.currentWeapon.vars.timers[i].maxLoops || vars.itemSystem.currentItem.currentWeapon.vars.timers[i].maxLoops === -1){
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i] = updateTimer(vars.itemSystem.currentItem.currentWeapon.vars.timers[i]);
									}
								}
							}
							
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "reload"){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done === 1){
										vars.itemSystem.currentItem.currentWeapon.vars.canShoot = 1;
									}
									else{
										vars.itemSystem.currentItem.currentWeapon.vars.isShooting = 0;
									}
								}
							}
							
							//Shoot a bullet
							if(vars.attackVars.on === 1 && vars.itemSystem.currentItem.currentWeapon.vars.canShoot === 1){
								// Change gun shot effect
								for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "shot_delay"){
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done = 1;
										for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i2++){
											if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].id === "reload"){
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].on = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].time = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].done = 0;
												vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].loops -= 1;
											}
										}
									}
								}
							}
							
							var bulletDetails = vars.itemSystem.currentItem.currentWeapon.vars.bulletDetails;
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].id === "shot_delay"){
									if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done === 1){
										if(bulletDetails.bulletsPerAttack < bulletDetails.maxBulletsPerAttack){
											// Create Bullets
											var tempBullet;
											
											for(var i2 = 0; i2 < bulletDetails.bulletsPerShot; i2++){
												var accuracyWeight = 1;
												if(accuracyPercent >= bulletDetails.bulletAccuracyPercent){
													accuracyWeight = bulletDetails.bulletAccuracyWeight;
												}
												var accuracyDir = (Math.random() * bulletDetails.bulletAccuracyOffset * accuracyWeight) - (Math.random() * bulletDetails.bulletAccuracyOffset * accuracyWeight);
												var accuracyPercent = Math.round(Math.random() * 1);
												var spreadDir = 0;
												var tempOffset = {x: 0, y: 0};
												if(bulletDetails.fastFire.on === 1){
													var tempRand = Math.random();
													tempOffset.x += lengthDirX(vars.dir + bulletDetails.fastFire.offsetDir, tempRand * (bulletDetails.fastFire.maxOffset / bulletDetails.bulletsPerShot) * i2);
													tempOffset.y += lengthDirY(vars.dir + bulletDetails.fastFire.offsetDir, tempRand * (bulletDetails.fastFire.maxOffset / bulletDetails.bulletsPerShot) * i2);
												}
												if(bulletDetails.bulletsPerShot > 1){
													spreadDir = (bulletDetails.bulletSpread*i2) + (bulletDetails.bulletSpread/2) - (bulletDetails.bulletSpread*bulletDetails.bulletsPerShot)/2;
												}
												var tempDir = spreadDir + accuracyDir;
												tempBullet = createBulletAdvanced({x: vars.v.x + tempOffset.x, y: vars.v.y + tempOffset.y}, {x: vars.v.x + tempOffset.x, y: vars.v.y + tempOffset.y}, bulletDetails.bulletSpeed, vars.dir + tempDir, 100);
												objectListToAdd = addObject(tempBullet, objectListToAdd);
											}
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 0;
											bulletDetails.bulletsPerAttack += 1;
											
										}
										if(bulletDetails.bulletsPerAttack >= bulletDetails.maxBulletsPerAttack){
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].done = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].loops = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.timers[i].on = 0;
											vars.itemSystem.currentItem.currentWeapon.vars.canShoot = 0;
											bulletDetails.bulletsPerAttack = 0;
											for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.timers.length; i2++){
												if(vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].id === "reload"){
													vars.itemSystem.currentItem.currentWeapon.vars.timers[i2].on = 1;
												}
											}
											
										}
										vars.itemSystem.currentItem.currentWeapon.vars.isShooting = 1;
									}
									else{
										vars.itemSystem.currentItem.currentWeapon.vars.isShooting = 0;
									}
								}
							}
							
							// Update bullet firing effect animation
							for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].id === "muzzle_flash_effect"){
									
									
									if(vars.itemSystem.currentItem.currentWeapon.vars.isShooting === 1){
										vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer = resetTimer(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer);
										vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayed = 0;
										vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw = 1;
									}
									else if(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayed === 0){
										
										// Find how much tiome is left in animation and if we should repeat it
										/*for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts.length; i2++){
											if(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].id === "muzzle_flash"){
												var timeLeft = (vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].animation.frames.length
												- vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].animation.currentFrame.index)
												* vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].animation.frameTimer.maxTime;
												var timeTotal = vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].animation.frames.length
												* vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].animation.frameTimer.maxTime;
												console.log("Time Left: " + timeLeft / vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].animation.frameTimer.maxTime);
												if(timeLeft >= timeTotal){
													vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw = 1;
												}
												else{
													vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw = 0;
													vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayed = 1;
												}
											}
											vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer = updateTimer(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer);
											if(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer.done === 1){
												vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayed = 1;
											}
										}*/
										vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw = 1;
										vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer = updateTimer(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer);
										if(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayTimer.done === 1){
											vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayed = 1;
										}
									}
									if(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].delayed === 1){
										vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw = 0;
									}
									
									//console.log("Shooting: " + vars.itemSystem.currentItem.currentWeapon.vars.isShooting);
									//console.log("Should Draw: " + vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw);
									for(var i2 = 0; i2 < vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts.length; i2++){
										if(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].id === "muzzle_flash"){
											if(vars.itemSystem.currentItem.currentWeapon.vars.effectsDetails[i].shouldDraw === 1){
												vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].on = 1;
											}
											else{
												vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i2].on = 0;
											}
										}
									}
									
								}
							}
							
							/*for(var i = 0; i < vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts.length; i++){
								if(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].on === 1){
									vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation.frameTimer = updateTimer(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation.frameTimer);
									if(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation.frameTimer.done === 1){
										vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation = updateAnimation(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation);
										vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation.frameTimer = resetTimer(vars.itemSystem.currentItem.currentWeapon.vars.sprite.parts[i].animation.frameTimer);
									}
								}
							}*/
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							sprite: {
								hasImage: 1,
								parts: [
									{
										id: "muzzle_flash",
										depth: 0,
										on: 1,
										animation: {
											nextFrame: 1,
											finalFrameIndex: 0,
											loops: 0,
											maxLoops: -1,
											currentFrame: {
												index: 0,
												imgObj: gun1_shot_effectAnimation[0]
											},
											frames: [gun1_shot_effectAnimation[0], "none"],
											frameTimer: {
												time: 0,
												rate: 1 / 60,
												maxTime: 10 / 60,
												maxLoops: -1,
												minLoops: 0,
												loops: 0,
												done: 0
											}
										}
									}
								]
							},
							effectChange: 0,
							isShooting: 0,
							timers: [
								{
									id: "reload",
									on: 1,
									time: 0,
									rate: 1 / 60,
									maxTime: 3 / 60,/*3 / 60*/
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0,
								},
								{
									id: "shot_delay",
									on: 0,
									time: 0,
									rate: 1 / 60,
									maxTime: 0 / 60,
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0,
								}/*,
								{
									id: "muzzle_flash_delay",
									on: 0,
									time: 0,
									rate: 1 / 60,
									maxTime: 60 / 60 - 1 / 60,
									maxLoops: -1,
									minLoops: 0,
									loops: 0,
									done: 0,
								},
								{
									id: "repeat_muzzle_flash_delay",
									on: 0,
									time: 0,
									rate: 1 / 60,
									maxTime: 60 / 60 - 1 / 60,
									maxLoops: -1,
									minLoops: 0,
									loops: 0,
									done: 0,
								}*/
							],
							bulletDetails: {
								bulletsPerAttack: 0,
								maxBulletsPerAttack: 1,
								bulletsPerShot: 2,/*2*/
								bulletSpread: 0,
								bulletAccuracyOffset: 8,/*8*/
								bulletAccuracyPercent: 0.4,
								bulletAccuracyWeight: 0.3,
								bulletSpeed: 60,
								fastFire: {on: 1/*1*/, offsetDir: 0, maxOffset: 64}
							},
							effectsDetails: [
								{
									id: "muzzle_flash_effect",
									shotNumber: 0,
									shotNumberMin: 0,
									shotNumberMax: 1,
									shouldDraw: 0,
									delayed: 1,
									delayTimer: {
										id: "muzzle_flash_delay",
										on: 0,
										time: 0,
										rate: 1 / 60,
										maxTime: 20 / 60,
										maxLoops: -1,
										minLoops: 0,
										loops: 0,
										done: 0,
									},
									repeatTimer: {
										id: "muzzle_flash_repeat",
										on: 0,
										time: 0,
										rate: 1 / 60,
										maxTime: 20 / 60,
										maxLoops: -1,
										minLoops: 0,
										loops: 0,
										done: 0,
									}
									/*sprite: {
										id: "muzzle_flash",
										depth: 0,
										on: 1,
										animation: {
											nextFrame: 1,
											finalFrameIndex: 0,
											loops: 0,
											maxLoops: -1,
											currentFrame: {
												index: 0,
												imgObj: gun1_shot_effectAnimation[0]
											},
											frames: [gun1_shot_effectAnimation[0], "none"],
											frameTimer: {
												time: 0,
												rate: 1 / 60,
												maxTime: 10 / 60,
												maxLoops: -1,
												minLoops: 0,
												loops: 0,
												done: 0
											}
										}
									}*/
								}
							],
							canShoot: 1,
							loaded: 1
						}
					}
				],
				itemList: [
					{
						id: "health",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							
						}
					}
				]
			},
			attackVars: {
				on: 0
			},
			spawnVars: {
				timers: {
					spawnTimer: {
						time: 0,
						rate: 1 / 60,
						maxTime: 0.1,
						maxLoops: 1,
						minLoops: 0,
						loops: 0,
						done: 0,
					}
				},
				canSpawn: 1
			}
		}
	};
	return player;
}

/*var partDefinition = {
	v: {x: 0, y: 0},
	v1: {x: 0, y: 0},
	v2: {x: 0, y: 0},
	target: {
		v1: {x: 0, y: 0},
		v2: {x: 0, y: 0}
	},
	baseDir: 0,
	parent: {index: 0},
	child: {index: 0}
};

function moveBodyParts(basicBody, partIndex, targetV2, speed){
	
	var part = basicBody[partIndex];
	
	var vel = {x: 0, y: 0};
	if((targetV2.x - part.v2.x > speed || targetV2.x - part.v2.x < -speed) && (targetV2.y - part.v2.y > speed || targetV2.y - part.v2.y < -speed)){
		vel.x = lengthDirX(getAngleV(part.v2, targetV2), speed);
		vel.y = lengthDirY(getAngleV(part.v2, targetV2), speed);
	}
	part.v2.x += vel.x;
	part.v2.y += vel.y;
	
	basicBody[part.child.index].v1 = part.v2;
	//basicBody[part.parentPartIndex].v1
	
	part.baseDir = getAngleV(part.v1, part.v2);
	
	
	
	basicBody[partIndex] = part;
	return basicBody;
}

function moveBodyPart(animationParts){
	
	var frames = [
		{
			parts: [
				
			]
		},
		{
			parts: [
				
			]
		}
	]
	
	return animationParts;
}*/

function createZombie(v, v2, speed){
	var zombie = {
		events: {
			update: function(vars, events, gsVars, objIndex){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				var objectListToAdd = [];
				var particleListToAdd = [];
				
				// Collision Handling
				for(var i = 0; i < rVars.objectList.length; i++){
					var tempObj = rVars.objectList[i];
					if(tempObj.vars.id === "zombie" && i != objIndex){
						if(vars.modeSystem.currentMode.id != "dead"){
							if(tempObj.vars.modeSystem.currentMode.id != "dead"){
								// Use radius of objects to check for collision and apply movement.force
								if(getDistanceV(vars.v, tempObj.vars.v) < (vars.collisionSystem.radius + tempObj.vars.collisionSystem.radius)){
									vars.v.x += lengthDirX(getAngleV(tempObj.vars.v, vars.v), (vars.collisionSystem.radius + tempObj.vars.collisionSystem.radius) - getDistanceV(vars.v, tempObj.vars.v));
									vars.v.y += lengthDirY(getAngleV(tempObj.vars.v, vars.v), (vars.collisionSystem.radius + tempObj.vars.collisionSystem.radius) - getDistanceV(vars.v, tempObj.vars.v));
								}
							}
						}
					}
					if(tempObj.vars.id === "wall"){
						if(vars.modeSystem.currentMode.id != "dead"){
							if(containsRect(// If we are colliding in update
								{v1: {x: vars.v.x - vars.v2.x/2, y: vars.v.y - vars.v2.y/2},
								v2: {x: vars.v.x + vars.v2.x/2, y: vars.v.y + vars.v2.y/2}},
								{v1: {x: tempObj.vars.v.x - tempObj.vars.v2.x/2, y: tempObj.vars.v.y - tempObj.vars.v2.y/2},
								v2: {x: tempObj.vars.v.x + tempObj.vars.v2.x/2, y: tempObj.vars.v.y + tempObj.vars.v2.y/2}}
							) === 1){
								vars.v.x += lengthDirX(getAngleV(vars.v, tempObj.vars.v), -getDistanceV(vars.v, tempObj.vars.v)/2);
								vars.v.y += lengthDirY(getAngleV(vars.v, tempObj.vars.v), -getDistanceV(vars.v, tempObj.vars.v)/2);
							}
						}
					}
					if(tempObj.vars.id === "player"){
						/*if(containsRect(// If we are colliding update
							{v1: {x: vars.v.x - vars.v2.x/2, y: vars.v.y - vars.v2.y/2},
							v2: {x: vars.v.x + vars.v2.x/2, y: vars.v.y + vars.v2.y/2}},
							{v1: {x: tempObj.vars.v.x - tempObj.vars.v2.x/2, y: tempObj.vars.v.y - tempObj.vars.v2.y/2},
							v2: {x: tempObj.vars.v.x + tempObj.vars.v2.x/2, y: tempObj.vars.v.y + tempObj.vars.v2.y/2}}
						) === 1){
							vars.movement.force.x += lengthDirX(getAngleV(vars.v, tempObj.vars.v), -getDistanceV(vars.v, tempObj.vars.v)/16);
							vars.movement.force.y += lengthDirY(getAngleV(vars.v, tempObj.vars.v), -getDistanceV(vars.v, tempObj.vars.v)/16);
							tempObj.vars.movement.force.x += lengthDirX(getAngleV(tempObj.vars.v, vars.v), -getDistanceV(tempObj.vars.v, vars.v)/16);
							tempObj.vars.movement.force.y += lengthDirY(getAngleV(tempObj.vars.v, vars.v), -getDistanceV(tempObj.vars.v, vars.v)/16);
						}*/
						if(vars.modeSystem.currentMode.id != "dead"){
							// Use radius of objects to check for collision and apply movement.force
							if(getDistanceV(vars.v, tempObj.vars.v) < (vars.collisionSystem.radius + tempObj.vars.collisionSystem.radius)){
								tempObj.vars.movement.force.x += lengthDirX(getAngleV(vars.v, tempObj.vars.v), (vars.collisionSystem.radius + tempObj.vars.collisionSystem.radius) - getDistanceV(vars.v, tempObj.vars.v));
								tempObj.vars.movement.force.y += lengthDirY(getAngleV(vars.v, tempObj.vars.v), (vars.collisionSystem.radius + tempObj.vars.collisionSystem.radius) - getDistanceV(vars.v, tempObj.vars.v));
							}
						}
					}
					/*if(tempObj.vars.id === "bulletAdv"){
						if(vars.modeSystem.currentMode.id != "dead"){
							// Use radius of objects to check for collision and apply movement.force
							if(tempObj.vars.hitSomething != 1){
								if(getDistanceV(vars.v, tempObj.vars.v) < vars.collisionSystem.radius){
									vars.collisionSystem.hitByBullet = 1;
									tempObj.vars.hitSomething = 1;
								}
							}
						}
					}*/
					rVars.objectList[i] = tempObj;
				}
				
				/*if(vars.collisionSystem.hitByBullet === 1){
					var damage = 25;
					vars.healthSystem.hp -= damage;
				}*/
				
				// Health System
				/*if(vars.collisionSystem.hits.length > 0){
					for(var i = 0; i < vars.collisionSystem.hits.length; i++){
						vars.healthSystem.hp -= vars.collisionSystem.hits[i].damage;
						
					}
					console.log(vars.collisionSystem.hits.length);
					vars.collisionSystem.hits = [];
					
				}*/
				if(vars.collisionSystem.hits.length > 0){
					for(var i = 0; i < vars.modeSystem.modes.length; i++){
						var tempMode = vars.modeSystem.modes[i];
						if(tempMode.id === "hit"){
							vars.modeSystem.currentMode = tempMode;
						}
					}
				}
				
				// Update timers
				for(var i = 0; i < vars.timers.length; i++){
					if(vars.timers[i].on === 1){
						vars.timers[i] = updateTimer(vars.timers[i]);
					}
				}
				
				// Check for kill timer
				for(var i = 0; i < vars.timers.length; i++){
					if(vars.timers[i].id === "kill"){
						if(vars.timers[i].done === 1){
							for(var i = 0; i < vars.modeSystem.modes.length; i++){
								var tempMode = vars.modeSystem.modes[i];
								if(tempMode.id === "dead"){
									vars.modeSystem.currentMode = tempMode;
								}
							}
						}
					}
				}
				
				//Mode System
				// Check how much damage has been taken and change mode accordingly
				if(vars.healthSystem.hp <= vars.healthSystem.minHp){
					for(var i = 0; i < vars.modeSystem.modes.length; i++){
						if(vars.modeSystem.modes[i].id === "dead"){
							vars.modeSystem.currentMode = vars.modeSystem.modes[i];
						}
					}
				}
				
				if(vars.modeSystem.currentMode.id === "none"){
					for(var i = 0; i < vars.modeSystem.modes.length; i++){
						if(vars.modeSystem.modes[i].id === "idle"){
							vars.modeSystem.currentMode = vars.modeSystem.modes[i];
						}
					}
				}
				var tempVars = vars.modeSystem.currentMode.update(vars, rVars, objectListToAdd, particleListToAdd, objIndex);
				rVars = tempVars.rVars;
				vars = tempVars.vars;
				objectListToAdd = tempVars.objectListToAdd;
				particleListToAdd = tempVars.particleListToAdd;
				
				//End Mode System
				
				if(vars.dir > 180){
					vars.dir = -180;
				}
				if(vars.dir < -180){
					vars.dir = 180;
				}
				
				vars.vel.x += vars.movement.force.x;
				vars.vel.y += vars.movement.force.y;
				vars.movement.force.x = 0;
				vars.movement.force.y = 0;
				
				vars.v.x += vars.vel.x;
				vars.v.y += vars.vel.y;
				
				rVars.objectList[objIndex].vars = vars;
				if(vars.destroy === 1){
					rVars.objectList[objIndex] = null;
				}
				for(var i = 0; i < particleListToAdd.length; i++){
					rVars.particleList = addObject(particleListToAdd[i], rVars.particleList);
				}
				gsVars.rooms.currentRoom.roomVars = rVars;
				return {gsVars: gsVars, objectListToAdd: objectListToAdd};
			},
			render: function(vars, oldEvents, stateVars){
				//Draw Object
				/*ctx.save();
				ctx.globalAlpha = 0.2;
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(vars.v.x - vars.v2.x/2, vars.v.y - vars.v2.y/2, vars.v2.x, vars.v2.y);
				ctx.beginPath();
				ctx.restore();
				ctx.save();
				ctx.globalAlpha = 0.4;
				ctx.fillStyle = "#000000";
				ctx.arc(vars.v.x, vars.v.y, vars.v2.x/2, 0, 2*Math.PI);
				ctx.fill();
				ctx.restore();*/
				drawImg(
					{x: vars.v.x + vars.sprite.animation.currentFrame.imgObj.v1.x, y: vars.v.y + vars.sprite.animation.currentFrame.imgObj.v1.y},
					{x: vars.sprite.animation.currentFrame.imgObj.vOffset.x, y: vars.sprite.animation.currentFrame.imgObj.vOffset.y},
					{x: vars.v2.x + vars.sprite.animation.currentFrame.imgObj.v2.x, y: vars.v2.y + vars.sprite.animation.currentFrame.imgObj.v2.y},
					vars.dir + vars.sprite.animation.currentFrame.imgObj.dir, vars.sprite.animation.currentFrame.imgObj.img, 1
				);
			},
			onCreate: function(){
				
			},
			onLoad: function(vars, gsVars, objIndex){
				vars.modeSystem.currentMode = vars.modeSystem.modes[2];
				gsVars.rooms.currentRoom.roomVars.objectList[objIndex].vars = vars;
				return {gsVars: gsVars};
			},
			onClose: function(){
				
			}
		},
		vars: {
			destroy: 0,
			v: v,
			v2: {x: v2.x, y: v2.y},
			dir: 0,
			vel: {x: 0, y: 0},
			id: "zombie",
			depth: 60,
			healthSystem: {hp: 100, maxHp: 100, minHp: 0},
			tempTarget: {v: {x: 0, y: 0}},
			movement: {
				speed: speed,
				friction: 0.04,
				maxVel: {x: speed, y: speed},
				force: {x: 0, y: 0}
			},
			collisionSystem: {
				type: "circle",
				hitByBullet: 0,
				hits: [],
				radius: v2.x/2
			},
			timers: [
				{
					id: "kill",
					on: 1,
					time: 0,
					rate: 1 / 60,
					maxTime: 30,
					maxLoops: 1,
					minLoops: 0,
					loops: 0,
					done: 0
				}
			],
			sprite: {
				hasImage: 1,
				animation: {
					nextFrame: 1,
					finalFrameIndex: 0,
					loops: 0,
					maxLoops: -1,
					currentFrame: {
						index: 0,
						imgObj: zombie1_walkAnimation[0]
					},
					frames: zombie1_walkAnimation,
					frameTimer: {
						time: 0,
						rate: 1 / 60,
						maxTime: 0.1,
						maxLoops: -1,
						minLoops: 0,
						loops: 0,
						done: 0
					}
				}
			},
			modeSystem: {
				currentMode: {id: "none", update: function(){}, vars: {}},
				modes: [
					{//attack
						id: "attack",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							
						}
					},
					{//follow
						id: "follow",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							//Update Kill Timer
							//vars.modeSystem.currentMode.vars.destroyTimer = updateTimer(vars.modeSystem.currentMode.vars.destroyTimer);
							
							//Change to walk animation
							if(vars.sprite.animation.loops < vars.sprite.animation.maxLoops || vars.sprite.animation.maxLoops === -1){
								vars.sprite.animation.frameTimer = updateTimer(vars.sprite.animation.frameTimer);
								if(vars.sprite.animation.frameTimer.done === 1){
									vars.sprite.animation = updateAnimation(vars.sprite.animation);
									vars.sprite.animation.frameTimer.done = 0;
								}
							}
							
							//Nearest Player
							var nearestObj = null;
							for(var i = 0; i < rVars.objectList.length; i++){
								var tempObj = rVars.objectList[i];
								if(tempObj.vars.id === "player"){
									if(nearestObj === null){
										nearestObj = tempObj;
									}
									else if(getDistanceV(vars.v, tempObj.vars.v) < getDistanceV(vars.v, nearestObj.vars.v)){
										nearestObj = tempObj;
									}
								}
							}
							if(nearestObj != null){
								if(getDistanceV(vars.v, nearestObj.vars.v) < 10000){
									vars.vel = {x: lengthDirX(getAngleV(vars.v, nearestObj.vars.v), vars.movement.speed), y: lengthDirY(getAngleV(vars.v, nearestObj.vars.v), vars.movement.speed)};
									vars.dir = getAngleV(vars.v, nearestObj.vars.v);
								}
								else{
									for(var i = 0; i < vars.modeSystem.modes.length; i++){
										var tempMode = vars.modeSystem.modes[i];
										if(tempMode.id === "idle"){
											vars.modeSystem.currentMode = tempMode;
										}
									}
								}
							}
							else{
								for(var i = 0; i < vars.modeSystem.modes.length; i++){
									var tempMode = vars.modeSystem.modes[i];
									if(tempMode.id === "idle"){
										vars.modeSystem.currentMode = tempMode;
									}
								}
							}
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							
						}
					},
					{//idle
						id: "idle",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							//Nearest Player
							var nearestObj = null;
							for(var i = 0; i < rVars.objectList.length; i++){
								var tempObj = rVars.objectList[i];
								if(tempObj.vars.id === "player"){
									if(nearestObj === null){
										nearestObj = tempObj;
									}
									else if(getDistanceV(vars.v, tempObj.vars.v) < getDistanceV(vars.v, nearestObj.vars.v)){
										nearestObj = tempObj;
									}
								}
							}
							if(nearestObj != null){
								if(getDistanceV(vars.v, nearestObj.vars.v) < 10000){
									for(var i = 0; i < vars.modeSystem.modes.length; i++){
										var tempMode = vars.modeSystem.modes[i];
										if(tempMode.id === "follow"){
											vars.modeSystem.currentMode = tempMode;
										}
									}
								}
							}
							else{
								vars.vel = {x: 0, y: 0};
							}
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							hi: 1
						}
					},
					{//hit
						id: "hit",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							if(vars.collisionSystem.hits.length > 0){
								for(var i = 0; i < vars.collisionSystem.hits.length; i++){
									vars.healthSystem.hp -= vars.collisionSystem.hits[i].damage;
									vars.modeSystem.currentMode.vars.particlesToCreate.push(vars.collisionSystem.hits[i].bloodParticleDetails);
								}
								//console.log(vars.collisionSystem.hits.length);
								vars.collisionSystem.hits = [];
								vars.modeSystem.currentMode.vars.finishedHit = 1;
							}
							
							// Create particle when hit
							if(vars.modeSystem.currentMode.vars.particlesToCreate.length > 0){
								for(var i = 0; i < vars.modeSystem.currentMode.vars.particlesToCreate.length; i++){
									var bPD = getParticleDetails(vars.modeSystem.currentMode.vars.particlesToCreate[i].id, vars.modeSystem.currentMode.vars.particlesToCreate[i].list);
									bPD.initialVel = {x: lengthDirX(vars.dir, bPD.initialSpeed), y: lengthDirY(vars.dir, bPD.initialSpeed)}
									bPD.initialOffset.x = lengthDirX(vars.dir + bPD.initialOffset.dir, bPD.initialOffset.offSet);
									bPD.initialOffset.y = lengthDirY(vars.dir + bPD.initialOffset.dir, bPD.initialOffset.offSet);
									var tempParticle;
									var tempNumOfParticles =  Math.round(Math.random() * bPD.rangeNumOfParticles) + bPD.minNumOfParticles;
									var otherVars = {v: vars.v, v2: vars.v2, initialOffset: {}, dir: vars.dir, tempNumOfParticles: tempNumOfParticles};
									otherVars.initialVel = {x: lengthDirX(vars.dir, bPD.initialSpeed), y: lengthDirY(vars.dir, bPD.initialSpeed)}
									otherVars.initialOffset.x = lengthDirX(vars.dir + bPD.initialOffset.dir, bPD.initialOffset.offSet);
									otherVars.initialOffset.y = lengthDirY(vars.dir + bPD.initialOffset.dir, bPD.initialOffset.offSet);
									for(var i2 = 0; i2 < tempNumOfParticles; i2++){
										//otherVars.dir = ((360/bPD.numOfParticles)*i);
										tempParticle = createBloodParticle(bPD, otherVars, i2, 1);
										particleListToAdd = addObject(tempParticle, particleListToAdd);
									}
								}
								vars.modeSystem.currentMode.vars.particlesToCreate = [];
							}
							
							if(vars.modeSystem.currentMode.vars.finishedHit){
								for(var i = 0; i < vars.modeSystem.modes.length; i++){
									var tempMode = vars.modeSystem.modes[i];
									if(tempMode.id === "follow"){
										vars.modeSystem.currentMode = tempMode;
									}
								}
							}
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							knockbackSystem: {
								knockbackTimer: {
									time: 0,
									rate: 1 / 60,
									maxTime: 1 / 60,
									maxLoops: 1,
									minLoops: 0,
									loops: 0,
									done: 0
								},
							},
							hitBloodParticle: getParticleDetails("blood_type_2", particleDetailsList1),
							particlesToCreate: [],
							finishedHit: 0
						}
					},
					{//dead
						id: "dead",
						update: function(vars, rVars, objectListToAdd, particleListToAdd, objIndex){
							
							/*
							* Create Death particles
							* createParticleSimple(v, vel, accel, id, depth, timer, imgSystem);
							*/
							
							if(vars.modeSystem.currentMode.vars.createParticles === 1){
								vars.modeSystem.currentMode.vars.createParticles = 0;
								
								// Create particle when hit
								vars.modeSystem.currentMode.vars.particlesToCreate.push(vars.modeSystem.currentMode.vars.bloodParticleDetails);
								if(vars.modeSystem.currentMode.vars.particlesToCreate.length > 0){
									for(var i = 0; i < vars.modeSystem.currentMode.vars.particlesToCreate.length; i++){
										var bPD = getParticleDetails(vars.modeSystem.currentMode.vars.particlesToCreate[i].id, vars.modeSystem.currentMode.vars.particlesToCreate[i].list);
										var tempParticle;
										var tempNumOfParticles =  Math.round(Math.random() * bPD.rangeNumOfParticles) + bPD.minNumOfParticles;
										var otherVars = {v: vars.v, v2: vars.v2, initialOffset: {}, dir: vars.dir, tempNumOfParticles: tempNumOfParticles};
										otherVars.initialVel = {x: lengthDirX(vars.dir, bPD.initialSpeed), y: lengthDirY(vars.dir, bPD.initialSpeed)}
										otherVars.initialOffset.x = lengthDirX(vars.dir + bPD.initialOffset.dir, bPD.initialOffset.offSet);
										otherVars.initialOffset.y = lengthDirY(vars.dir + bPD.initialOffset.dir, bPD.initialOffset.offSet);
										for(var i2 = 0; i2 < tempNumOfParticles; i2++){
											//otherVars.dir = ((360/bPD.numOfParticles)*i);
											tempParticle = createBloodParticle(bPD, otherVars, i2, 1);
											particleListToAdd = addObject(tempParticle, particleListToAdd);
										}
									}
									vars.modeSystem.currentMode.vars.particlesToCreate = [];
								}
								
								particleListToAdd = addObject(
									createParticleStatic({x: vars.v.x, y: vars.v.y}, {x: 0, y: 0}, {x: vars.v2.x * 2, y: vars.v2.y}, {x: 1, y: 1}, vars.dir, "zombie_body_dead_static", "under_objects",
										{
											time: 0,
											rate: 1 / 60,
											maxTime: 1800 / 60,
											maxLoops: 1,
											minLoops: 0,
											loops: 0,
											done: 0
										},
										{
											isImg: 1,
											img: zombie1_deadAnimation[0].img,
											alpha: 1
										}
									),
								particleListToAdd);
								
							}
							
							// Destroy Zombie
							vars.modeSystem.currentMode.vars.destroyTimer = updateTimer(vars.modeSystem.currentMode.vars.destroyTimer);
							if(vars.modeSystem.currentMode.vars.destroyTimer.done === 1){
								vars.destroy = 1;
							}
							
							rVars.objectList[objIndex].vars = vars;
							return {rVars: rVars, vars: vars, objectListToAdd: objectListToAdd, particleListToAdd: particleListToAdd};
						},
						vars: {
							destroyTimer: {
								time: 0,
								rate: 1 / 60,
								maxTime: 1 / 60,
								maxLoops: 1,
								minLoops: 0,
								loops: 0,
								done: 0
							},
							createParticles: 1,
							// Particle detials/specifications
							bloodParticleDetails: {id: "blood_type_3", list: particleDetailsList1},
							particlesToCreate: []
							//bloodParticleDetails: getParticleDetails("blood_type_3", particleDetailsList1)//getParticleDetails("blood_type_3", particleDetailsList1)
						}
					}
				]
			}
		}
	};
	return zombie;
}

function createBulletAdvanced(v, originV, speed, dir, maxTailLength){
	var tempBullet = {
		events: {
			update: function(vars, oldEvents, gsVars, objIndex){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				//Before
				//vars.movement.previousV = {x: vars.v.x, y: vars.v.y};
				
				for(var i = 0; i < vars.timers.length; i++){
					if(vars.timers[i].on === 1){
						vars.timers[i] = updateTimer(vars.timers[i]);
					}
				}
				
				// Update Position, check colliding, and update array of positions and collisions
				vars.vel.x = lengthDirX(vars.dir, vars.movement.speed);
				vars.vel.y = lengthDirY(vars.dir, vars.movement.speed);
				
				vars.movement.speedPerCheck.vel.x = vars.vel.x / (vars.movement.speed / vars.movement.speedPerCheck.speed);
				vars.movement.speedPerCheck.vel.y = vars.vel.y / (vars.movement.speed / vars.movement.speedPerCheck.speed);
				
				var collideCheck = [];
				var collideCheckID = ["wall", "zombie"];
				var collideCheckIndex = [];
				for(var i = 0; i < rVars.objectList.length; i++){
					for(var i2 = 0; i2 < collideCheckID.length; i2++){
						if(rVars.objectList[i].vars.id === collideCheckID[i2]){
							if(rVars.objectList[i].vars.id === "zombie"){
								if(rVars.objectList[i].vars.modeSystem.currentMode.id != "dead"){
									collideCheck.push(rVars.objectList[i]);
									collideCheckIndex.push(i);
								}
							}
							else{
								collideCheck.push(rVars.objectList[i]);
								collideCheckIndex.push(i);
							}
						}
					}
				}
				
				var moveDetails = moveInstantCollide(vars.v, vars.movement.originV, vars.dir, vars.movement.speedPerCheck.vel, vars.movement.speed, vars.movement.maxDistance, collideCheck, rVars);
				vars.v = {x: moveDetails.v.x, y: moveDetails.v.y};
				if(moveDetails.index != null){
					if(collideCheck[moveDetails.index].vars.id === "zombie"){
						var tempObj = collideCheck[moveDetails.index];
						/*if(tempObj.vars.modeSystem.currentMode.id != "dead"){
							vars.hitSomething = 1;
							tempObj.vars.collisionSystem.hitByBullet = 1;
						}*/
						if(tempObj.vars.collisionSystem.hitByBullet === 0 && vars.hitSomething === 0){
							vars.hitSomething = 1;
							//tempObj.vars.collisionSystem.hitByBullet = 1;
							tempObj.vars.collisionSystem.hits.push({id: "bullet_damage", damage: 20, bloodParticleDetails: {id: "blood_type_2", list: particleDetailsList1}});
						}
						rVars.objectList[collideCheckIndex[moveDetails.index]] = tempObj;
					}
					if(collideCheck[moveDetails.index].vars.id === "wall"){
						var tempObj = collideCheck[moveDetails.index];
						for(var i = 0; i < vars.timers.length; i++){
							if(vars.timers[i].id === "hit_wall"){
								vars.timers[i].on = 1;
								//console.log("I'm still here...");
							}
							
						}
						rVars.objectList[collideCheckIndex[moveDetails.index]] = tempObj;
					}
				}
				// End Update Position, check colliding
				
				// Check if we have hit a wall and if the despawn timer is up
				for(var i = 0; i < vars.timers.length; i++){
					if(vars.timers[i].id === "hit_wall"){
						if(vars.timers[i].done === 1){
							vars.hitSomething = 1;
						}
					}
					if(vars.timers[i].id === "lifetime"){
						if(vars.timers[i].done === 1){
							vars.hitSomething = 1;
						}
					}
				}
				// Check if we need to destroy bullet based on collisons and distance
				if(getDistanceV(vars.movement.originV, vars.v) >= vars.movement.maxDistance){
					//console.log("I've gone to far...");
					vars.hitSomething = 1;
				}
				if(vars.hitSomething === 1){
					vars.destroyTimer = updateTimer(vars.destroyTimer);
				}
				
				if(vars.destroyTimer.done === 1){
					vars.destroy = 1;
				}
				
				// Set buller tail length
				if(getDistanceV(vars.movement.originV, vars.v) < vars.renderVars.maxTailLength){
					vars.renderVars.tailLength = -getDistanceV(vars.movement.originV, vars.v);
				}
				else{
					vars.renderVars.tailLength = -vars.renderVars.maxTailLength;
				}
				
				rVars.objectList[objIndex].vars = vars;
				if(vars.destroy === 1){
					rVars.objectList[objIndex] = null;
				}
				gsVars.rooms.currentRoom.roomVars = rVars;
				return {gsVars: gsVars};
			},
			render: function(vars, oldEvents, gsVars){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				drawLine(vars.v, {x: -vars.v2.x/2, y: 0}, {x: vars.renderVars.tailLength, y: 0}, vars.dir, vars.renderVars.gradientTail/*"#F5D58E"*/, 4, vars.renderVars.alpha);
				drawRectFilled(vars.v, {x: -vars.v2.x, y: 0}, {x: vars.v2.x, y: vars.v2.y}, vars.dir, vars.renderVars.colour, vars.renderVars.alpha);
				
			},
			onCreate: function(){
				
			},
			onLoad: function(vars, gsVars, objIndex){
				gsVars.rooms.currentRoom.roomVars.objectList[objIndex].vars = vars;
				return {gsVars: gsVars};
			},
			onClose: function(){
				
			}
		},
		vars: {
			destroy: 0,
			v: {x: v.x, y: v.y},
			v2: {x: 4, y: 4},
			dir: dir,
			vel: {x: 0, y: 0},
			id: "bulletAdv",
			depth: 60,
			clickVars: {
				clickDownToggle: 0,
				clickUpToggle: 0
			},
			timers: [
				{
					id: "hit_wall",
					on: 0,
					time: 0,
					rate: 1 / 60,
					maxTime: 60 / 60,
					maxLoops: 1,
					minLoops: 0,
					loops: 0,
					done: 0
				},
				{
					id: "lifetime",
					on: 1,
					time: 0,
					rate: 1 / 60,
					maxTime: 4,
					maxLoops: 1,
					minLoops: 0,
					loops: 0,
					done: 0
				}
			],
			movement: {
				speed: speed,
				speedPerCheck: {speed: 2, vel: {x: 0, y: 0}},
				maxDistance: 1500,
				originV: {x: originV.x, y: originV.y},
				previousV: {x: v.x, y: v.y},
				currentV: {x: v.x, y: v.y},
				finished: {previous: 0, current: 0},
				collideDetails: {totalDistance: 0, points: [], collideIndex: null},
				travelDistance: {totalDistance: 0, points: []}
			},
			renderVars: {
				alpha: 1,
				colour: "#F5D58E",
				gradientTail: createGradient({x: -maxTailLength, y: 0}, {x: 0, y: 0}, [{pos: 0, colour: "#BA6E22"}, {pos: 0.7, colour: "#F7B848"}, {pos: 1, colour: "#F5D58E"}]),
				maxTailLength: maxTailLength,
				tailLength: 0
			},
			hitSystem: {
				canHit: 1,
				hits: 0,
				minHits: 0,
				maxHits: 1
			},
			hitSomething: 0,
			destroyTimer: {
				time: 0,
				rate: 1 / 60,
				maxTime: 2 / 60,
				maxLoops: 1,
				minLoops: 0,
				loops: 0,
				done: 0
			}
		}
	};
	return tempBullet;
}

function createWall(v, v2, vel, dir){
	var wall = {
		events: {
			update: function(vars, oldEvents, gsVars, objIndex){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				vars.v.x += vars.vel.x;
				vars.v.y += vars.vel.y;
				
				rVars.objectList[objIndex].vars = vars;
				if(vars.destroy === 1){
					rVars.objectList[objIndex] = null;
				}
				gsVars.rooms.currentRoom.roomVars = rVars;
				return {gsVars: gsVars};
			},
			render: function(vars, oldEvents, gsVars){
				var rVars = gsVars.rooms.currentRoom.roomVars;
				
				drawRectFilled(vars.v, {x: 0, y: 0}, vars.v2, vars.dir, vars.renderVars.colour, vars.renderVars.alpha);
				drawRectOutline(vars.v, {x: 0, y: 0}, vars.v2, vars.dir, "#000000", 2, vars.renderVars.alpha);
				drawLine(vars.v, {x: 0, y: 0}, {x: vars.v2.x / 2, y: 0}, vars.dir, "#000000", 2, vars.renderVars.alpha);
				
			},
			onCreate: function(){
				
			},
			onLoad: function(vars, gsVars, objIndex){
				gsVars.rooms.currentRoom.roomVars.objectList[objIndex].vars = vars;
				return {gsVars: gsVars};
			},
			onClose: function(){
				
			}
		},
		vars: {
			destroy: 0,
			v: {x: v.x, y: v.y},
			v2: {x: v2.x, y: v2.y},
			dir: dir,
			vel: {x: vel.x, y: vel.y},
			id: "wall",
			depth: 100,
			clickVars: {
				clickDownToggle: 0,
				clickUpToggle: 0
			},
			collisionSystem: {
				type: "rect",
				hitByBullet: 0
			},
			timers: [
				
			],
			renderVars: {
				alpha: 1,
				colour: "#aaaaaa"
			}
		}
	};
	return wall;
}

//****************//Particles
/*
* Particle Template
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
*/

function createParticleBasic(v, v1, v2, vScale, vel, accel, friction, dir, id, depth, alphaFade, timer, img){
	var particle = {
		isParticle: true,
		events: {
			/*onDestroy: function(vars, rVars){
				var objectListToAdd = [];
				var particleListToAdd = [];
				
				//
				// Do on deestroy things and add particles etc.
				//
				
				for(var i = 0; i < particleListToAdd.length; i++){
					rVars.particleList = addObject(particleListToAdd[i], rVars.particleList);
				}
				gsVars.rooms.currentRoom.roomVars = rVars;
				return {gsVars: gsVars, objectListToAdd: objectListToAdd};
			},*/
			update: function(vars){
				vars.vel.x += vars.accel.x;
				vars.vel.y += vars.accel.y;
				if(vars.vel.x >= vars.friction*2 || vars.vel.x <= -vars.friction*2){
					vars.vel.x += -vars.vel.x * vars.friction;
				}
				else{
					vars.vel.x = 0;
				}
				if(vars.vel.y >= vars.friction*2 || vars.vel.y <= -vars.friction*2){
					vars.vel.y += -vars.vel.y * vars.friction;
				}
				else{
					vars.vel.y = 0;
				}
				
				// Update Animation if there is one
				if(vars.img.isImg === 1){
					if(vars.img.sprite.isAnimation === 1){
						/*console.log("Current blood frame: " + vars.img.sprite.animation.currentFrame.index
						+ ", number of loops: " + vars.img.sprite.animation.loops);*/
						//console.log(" Static current frame: " + particleDetailsList1[2].details.img.sprite.animation.currentFrame.index);
						console.log("Velocity: " + vars.vel.y);
						if(vars.img.sprite.animation.loops < vars.img.sprite.animation.maxLoops || vars.img.sprite.animation.maxLoops === -1){
							vars.img.sprite.animation.frameTimer = updateTimer(vars.img.sprite.animation.frameTimer);
							if(vars.img.sprite.animation.frameTimer.done === 1){
								vars.img.sprite.animation = updateAnimation(vars.img.sprite.animation);
								vars.img.sprite.animation.frameTimer.done = 0;
							}
						}
					}
				}
				
				//Alpha fade
				vars.img.alpha += vars.alphaFade;
				vars.v.x += vars.vel.x
				vars.v.y += vars.vel.y
				vars.timer = updateTimer(vars.timer);
				if(vars.timer.done === 1){
					vars.destroy = 1;
				}
				return vars;
			},
			render: function(vars){
				ctx.save();
				if(vars.img.isImg === 1){
					if(vars.img.sprite.isAnimation === 1){
						drawImg(
							{x: vars.v.x + vars.img.sprite.animation.currentFrame.imgObj.v1.x, y: vars.v.y + vars.img.sprite.animation.currentFrame.imgObj.v1.y},
							{x: vars.img.sprite.animation.currentFrame.imgObj.vOffset.x, y: vars.img.sprite.animation.currentFrame.imgObj.vOffset.y},
							{x: vars.v2.x + vars.img.sprite.animation.currentFrame.imgObj.v2.x, y: vars.v2.y + vars.img.sprite.animation.currentFrame.imgObj.v2.y},
							vars.dir + vars.img.sprite.animation.currentFrame.imgObj.dir, vars.img.sprite.animation.currentFrame.imgObj.img, 1
						);
					}
					else{
						drawImg(
							{x: vars.v.x + vars.img.sprite.imgObj.v1.x, y: vars.v.y + vars.img.sprite.imgObj.v1.y},
							{x: vars.img.sprite.imgObj.vOffset.x, y: vars.img.sprite.imgObj.vOffset.y},
							{x: vars.v2.x + vars.img.sprite.imgObj.v2.x, y: vars.v2.y + vars.img.sprite.imgObj.v2.y},
							vars.dir + vars.img.sprite.imgObj.dir, vars.img.sprite.imgObj.img, 1
						);
					}
				}
				else{
					if(vars.img.type === "circle"){
						if(vars.img.outline === 0){
							drawCircleFilled(vars.v, vars.v1, vars.v2.x, vars.vScale, vars.dir, vars.img.colour, vars.img.alpha);
						}
						if(vars.img.outline === 1){
							drawCircleOutline(vars.v, vars.v1, vars.v2.x, vars.vScale, vars.dir,  vars.img.outlineDetails.colour,  vars.img.outlineDetails.thickness, vars.img.outlineDetails.alpha);
						}
					}
					if(vars.img.type === "rect"){
						if(vars.img.outline === 0){
							drawRectFilled(vars.v, vars.v1, vars.v2, vars.dir, vars.img.colour, vars.img.alpha);
						}
						if(vars.img.outline === 1){
							drawRectOutline(vars.v, vars.v1, vars.v2, vars.dir, vars.img.outlineDetails.colour, vars.img.outlineDetails.thickness, vars.img.outlineDetails.alpha);
						}
					}
				}
				ctx.restore();
			}
		},
		vars: {
			destroy: 0,
			v: v,
			v1: v1,
			v2: v2,
			vScale: vScale,
			vel: vel,
			accel: accel,
			friction: friction,
			dir: dir,
			id: id,
			depth: depth,
			alphaFade: alphaFade,
			timer: timer,
			img: img
		}
	};
	return particle;
}

function createParticleStatic(v, v1, v2, vScale, dir, id, depth, img){
	var particle = {
		isParticle: true,
		events: {
			update: function(vars){
				return vars;
			},
			render: function(vars){
				ctx.save();
				ctx.globalAlpha = vars.img.alpha;
				if(vars.img.isImg === 1){
					drawImg(vars.v, vars.v1, vars.v2, vars.dir, vars.img.img, vars.img.alpha);
				}
				else{
					if(vars.img.type === "circle"){
						if(vars.img.outline === 0){
							drawCircleFilled(vars.v, vars.v1, vars.v2.x, vars.vScale, vars.dir, vars.img.colour, vars.img.alpha);
						}
						if(vars.img.outline === 1){
							drawCircleOutline(vars.v, vars.v1, vars.v2.x, vars.vScale, vars.dir,  vars.img.outlineDetails.colour,  vars.img.outlineDetails.thickness, vars.img.outlineDetails.alpha);
						}
					}
					if(vars.img.type === "rect"){
						if(vars.img.outline === 0){
							drawRectFilled(vars.v, vars.v1, vars.v2, vars.dir, vars.img.colour, vars.img.alpha);
						}
						if(vars.img.outline === 1){
							drawRectOutline(vars.v, vars.v1, vars.v2, vars.dir, vars.img.outlineDetails.colour, vars.img.outlineDetails.thickness, vars.img.outlineDetails.alpha);
						}
					}
					/*ctx.fillStyle = vars.img.colour;
					ctx.fillRect(vars.v.x - vars.v2.x/2, vars.v.y - vars.v2.y/2, vars.v2.x, vars.v2.y);*/
				}
				ctx.restore();
			}
		},
		vars: {
			destroy: 0,
			v: v,
			v1: v1,
			v2: v2,
			vScale: vScale,
			dir: dir,
			id: id,
			depth: depth,
			img: img
		}
	};
	return particle;
}

// Specific Particles
function createBloodParticle(bPD, otherVars, loopNumber, randomized){
	var randVars = [];
	var imgColor = 0;
	if(randomized === 1){
		randVars = [
			Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()
		];
		imgColor = chooseFromList(bPD.colourList);
	}
	else{
		randVars = [1, 1, 1, 1, 1, 1, 1, 1];
		imgColor = bPD.colourList[0];
	}
	//console.log(bPD.img.type);
	var finalDetails = {
		v: {x: otherVars.v.x + otherVars.initialOffset.x, y: otherVars.v.y + otherVars.initialOffset.y},
		v1: {x: 0, y: 0},
		v2: {x: bPD.sizeMin + (randVars[0] * bPD.sizeRange), y: bPD.sizeMin + (randVars[1] * bPD.sizeRange)},
		vScale: bPD.vScale,
		vel: {x: lengthDirX((360/otherVars.tempNumOfParticles)*loopNumber, (randVars[3] * bPD.speedRange) + bPD.speedMin) + bPD.initialVel.x, y: lengthDirY((360/otherVars.tempNumOfParticles)*loopNumber, (randVars[2] * bPD.speedRange) + bPD.speedMin) + bPD.initialVel.y},
		accel: {x: lengthDirX((360/otherVars.tempNumOfParticles)*loopNumber, (randVars[4] * bPD.accelRange) + bPD.accelMin), y: lengthDirY((360/otherVars.tempNumOfParticles)*loopNumber, (randVars[5] * bPD.accelRange) + bPD.accelMin)},
		friction: bPD.friction,
		dir: otherVars.dir,
		id: "zombie_blood",
		depth: bPD.depth,
		alphaFade: bPD.alphaFade,
		timer: {
			time: bPD.timer.time,
			rate: bPD.timer.rate,
			maxTime: (randVars[6] * bPD.rangeLifeTime) + bPD.minLifeTime,
			maxLoops: bPD.timer.maxLoops,
			minLoops: bPD.timer.minLoops,
			loops: bPD.timer.loops,
			done: bPD.timer.done
		},
		img: {
			isImg: bPD.img.isImg,
			sprite: {},
			type: bPD.img.type,
			outline: bPD.img.outline,
			alpha: (randVars[7] * bPD.img.alphaRange) + bPD.img.alphaMin,
			colour: imgColor
		}
	};
	if(bPD.img.isImg === 1){
		if(bPD.img.sprite.isAnimation === 1){
			finalDetails.img.sprite = {
				isAnimation: bPD.img.sprite.isAnimation,
				animation: {
					nextFrame: bPD.img.sprite.animation.nextFrame,
					finalFrameIndex: bPD.img.sprite.animation.finalFrameIndex,
					loops: bPD.img.sprite.animation.loops,
					maxLoops: bPD.img.sprite.animation.maxLoops,
					currentFrame: {
						index: bPD.img.sprite.animation.currentFrame.index,
						imgObj: bPD.img.sprite.animation.currentFrame.imgObj
					},
					frames: bPD.img.sprite.animation.frames,
					frameTimer: {
						time: bPD.img.sprite.animation.frameTimer.time,
						rate: bPD.img.sprite.animation.frameTimer.rate,
						maxTime: bPD.img.sprite.animation.frameTimer.maxTime,
						maxLoops: bPD.img.sprite.animation.frameTimer.maxLoops,
						minLoops: bPD.img.sprite.animation.frameTimer.minLoops,
						loops: bPD.img.sprite.animation.frameTimer.loops,
						done: bPD.img.sprite.animation.frameTimer.done
					}
				},
			}
		}
	}
	var tempParticle;
	tempParticle = createParticleBasic(finalDetails.v, finalDetails.v1, finalDetails.v2, finalDetails.vScale, finalDetails.vel, finalDetails.accel, finalDetails.friction,
		finalDetails.dir, finalDetails.id, finalDetails.depth, finalDetails.alphaFade, finalDetails.timer, finalDetails.img);
	return tempParticle;
	
}

// Particle Details Lists
var particleDetailsList1 = [
	{// blood_type_1
		id: "blood_type_1",
		details: {
			minNumOfParticles: 20,//20
			rangeNumOfParticles: 10,//10
			initialOffset: {x: 0, y: 0, offSet: 0, dir: 0},
			initialVel: {x: 0, y: 0},
			initialSpeed: 2,
			sizeMin: 4,
			sizeRange: 4,
			vScale: {x: 1.4, y: 1.2},
			speedRange: 6,
			speedMin: 2,
			accelRange: 0,
			accelMin: 0,
			friction: 0.08,
			rangeLifeTime: 200 / 60,
			minLifeTime: 100 / 60,
			timer: {
				time: 0,
				rate: 1 / 60,
				maxTime: null,
				maxLoops: 1,
				minLoops: 0,
				loops: 0,
				done: 0
			},
			depth: "under_objects",/*59*/
			alphaFade: 0,
			colourList: ["#a20700"/*, "#D80700", "#ffffff", "#EF19AE"*/],
			img: {
				isImg: 0,
				sprite: null,
				type: "circle",
				outline: 0,
				alphaMin: 0.3,
				alphaRange: 0.3,
				colour: "#a20700"
			}
		}
	},
	{// blood_type_2
		id: "blood_type_2",
		details: {
			minNumOfParticles: 3,
			rangeNumOfParticles: 3,
			initialOffset: {x: 0, y: 0, offSet: 32, dir: 0},
			initialVel: {x: 0, y: 0},
			initialSpeed: -12,
			sizeMin: 2,
			sizeRange: 3,
			vScale: {x: 3.5, y: 1},
			speedRange: 4,
			speedMin: 2,
			accelRange: 0,
			accelMin: 0,
			friction: 0.08,
			rangeLifeTime: 0.2,
			minLifeTime: 0.3,
			timer: {
				time: 0,
				rate: 1 / 60,
				maxTime: null,
				maxLoops: 1,
				minLoops: 0,
				loops: 0,
				done: 0
			},
			depth: "top",
			alphaFade: 0,
			colourList: [/*"#a20700", */"#D80700"],
			img: {
				isImg: 0,
				sprite: null,
				type: "circle",
				outline: 0,
				alphaMin: 0.6,
				alphaRange: 0.4,
				colour: "#a20700"
			}
		}
	},
	{// blood_type_3
		id: "blood_type_3",
		details: {
			/*minNumOfParticles: 1,
			rangeNumOfParticles: 0,
			initialOffset: {x: 0, y: 0, offSet: 0, dir: 0},
			initialVel: {x: 0, y: 0},
			initialSpeed: 0,
			sizeMin: 0,
			sizeRange: 0,
			vScale: {x: 3.5, y: 1},
			speedRange: 4,
			speedMin: 2,
			accelRange: 0,
			accelMin: 0,
			friction: 0.08,
			rangeLifeTime: 0,
			minLifeTime: (10 / 60) * (blood_splat1_effectAnimation.length - 1),
			timer: {
				time: 0,
				rate: 1 / 60,
				maxTime: null,
				maxLoops: 1,
				minLoops: 0,
				loops: 0,
				done: 0
			},
			depth: "under_objects",
			alphaFade: 0,
			colourList: ["#D80700"],
			img: {
				isImg: 1,
				sprite: {
					isAnimation: 1,
					animation: {
						nextFrame: 1,
						finalFrameIndex: blood_splat1_effectAnimation.length - 1,
						loops: 0,
						maxLoops: 1,
						currentFrame: {
							index: 0,
							imgObj: blood_splat1_effectAnimation[0]
						},
						frames: blood_splat1_effectAnimation,
						frameTimer: {
							time: 0,
							rate: 1 / 60,
							maxTime: 20 / 60,
							maxLoops: -1,
							minLoops: 0,
							loops: 0,
							done: 0
						}
					},
					imgObj: blood_splat1_effectAnimation[0]
				},
				type: "rect",
				outline: 0,
				alphaMin: 0.6,
				alphaRange: 0.4,
				colour: "#a20700",
				isImg: 1
			}*/
			minNumOfParticles: 1,
			rangeNumOfParticles: 0,
			initialOffset: {x: 0, y: 0, offSet: 0, dir: 0},
			initialVel: {x: 0, y: 0},
			initialSpeed: 0,
			sizeMin: 0,
			sizeRange: 0,
			vScale: {x: 3.5, y: 1},
			speedRange: 4,
			speedMin: 2,
			accelRange: 0,
			accelMin: 0,
			friction: 0.08,
			rangeLifeTime: 0,
			minLifeTime: (5 / 60) * (blood_splat1_effectAnimation.length),
			timer: {
				time: 0,
				rate: 1 / 60,
				maxTime: null,
				maxLoops: 1,
				minLoops: 0,
				loops: 0,
				done: 0
			},
			depth: "under_objects",
			alphaFade: 0,
			colourList: [/*"#a20700", */"#D80700"],
			img: {
				isImg: 1,
				sprite: {
					isAnimation: 1,
					animation: {
						nextFrame: 1,
						finalFrameIndex: blood_splat1_effectAnimation.length - 1,
						loops: 0,
						maxLoops: 1,
						currentFrame: {
							index: 0,
							imgObj: blood_splat1_effectAnimation[0]
						},
						frames: blood_splat1_effectAnimation,
						frameTimer: {
							time: 0,
							rate: 1 / 60,
							maxTime: 5 / 60,
							maxLoops: -1,
							minLoops: 0,
							loops: 0,
							done: 0
						}
					},
					imgObj: blood_splat1_effectAnimation[0]
				},
				type: "rect",
				outline: 0,
				alphaMin: 0.6,
				alphaRange: 0.4,
				colour: "#a20700",
				isImg: 1
			}
		}
	}
];

function getParticleDetails(id, listToCheck){
	var details = null;
	for(var i = 0; i < listToCheck.length; i++){
		if(listToCheck[i].id === id){
			details = listToCheck[i].details;
		}
	}
	if(details === null){
		console.log("Error, could not find /" + id + "/ in particleDetailsList /" + listToCheck + "/");
	}
	return details;
}

/*
function getParticleTemplateComplex(v, vel, accel, friction, id, depth, animation){
	var particle = {
		isParticle: true,
		events: {
			update: function(vars){
				return vars;
			},
			render: function(vars){
				
			}
		},
		vars: {
			v: {x: 0, y: 0},
			vel: {x: 0, y: 0},
			accel: {x: 0, y: 0},
			friction: {x: 0, y: 0},
			id: "templateComplex",
			depth: depth,
			animation: null
		}
	};
	return particle;
}
*/

/*//Temporary vars
var player = createPlayer({x: baseWidth/2, y: baseHeight/2});
initobjectList = addObject(player, initobjectList);

for(var i = 0; i < 1; i++){
	var wall = createWall({x: (baseWidth/2) + 64 * i, y: (baseHeight/2)}, {x: 8, y: 64}, {x: 0, y: 0}, 0);
	initobjectList = addObject(wall, initobjectList);
}*/

var initialState = {};

var playState = {
	events: {
		onLoad: function(gsVars){
			gsVars = gsVars.rooms.currentRoom.onLoad(gsVars).gsVars;
			return gsVars;
		},
		onClose: function(gsVars){
			return gsVars;
		},
		//Update Function
		update: function(){
			
			// Update KeyContoller
			Game.state.vars = Game.state.vars.rooms.currentRoom.roomVars.keyObj.events.update(Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars, Game.state.vars.rooms.currentRoom.roomVars.keyObj.events, Game.state.vars).gsVars;
			
			// Update MouseObj
			Game.state.vars = Game.state.vars.rooms.currentRoom.roomVars.mouseObj.events.update(Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars, Game.state.vars.rooms.currentRoom.roomVars.mouseObj.events, Game.state.vars).gsVars;
			
			// Update Camera
			Game.state.vars = Game.state.vars.rooms.currentRoom.roomVars.camObj.events.update(Game.state.vars.rooms.currentRoom.roomVars.camObj.vars, Game.state.vars.rooms.currentRoom.roomVars.camObj.events, Game.state.vars).gsVars;
			
			// Update Hud
			Game.state.vars = Game.state.vars.rooms.currentRoom.roomVars.hudObj.events.update(Game.state.vars.rooms.currentRoom.roomVars.hudObj.vars, Game.state.vars.rooms.currentRoom.roomVars.hudObj.events, Game.state.vars).gsVars;
			
			//Temporary Variables
			var zombieCount = 0;
			
			// Update objectList
			for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.objectList.length; i++){
				
				var tempVars = Game.state.vars.rooms.currentRoom.roomVars.objectList[i].events.update(
					Game.state.vars.rooms.currentRoom.roomVars.objectList[i].vars,
					Game.state.vars.rooms.currentRoom.roomVars.objectList[i].events,
				Game.state.vars, i);
				Game.state.vars = tempVars.gsVars;
				if(tempVars.objectListToAdd != null){
					for(var i2 = 0; i2 < tempVars.objectListToAdd.length; i2++){
						Game.state.vars.rooms.currentRoom.roomVars.objectList = addObject(tempVars.objectListToAdd[i2], Game.state.vars.rooms.currentRoom.roomVars.objectList);
					}
				}
				if(Game.state.vars.rooms.currentRoom.roomVars.objectList[i] === null){
					Game.state.vars.rooms.currentRoom.roomVars.objectList = removeObject(i, Game.state.vars.rooms.currentRoom.roomVars.objectList);
					i--;
				}
			}
			
			// Update collision engine for objects
			
			/*for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.objectList.length; i++){
				if(Game.state.vars.rooms.currentRoom.roomVars.objectList[i] === null){
					Game.state.vars.rooms.currentRoom.roomVars.objectList = removeObject(i, Game.state.vars.rooms.currentRoom.roomVars.objectList);
				}
			}*/
			
			//Update particleList
			for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.particleList.length; i++){
				var tempParticle = Game.state.vars.rooms.currentRoom.roomVars.particleList[i];
				Game.state.vars.rooms.currentRoom.roomVars.particleList[i].vars = tempParticle.events.update(tempParticle.vars);
				if(Game.state.vars.rooms.currentRoom.roomVars.particleList[i].vars.destroy === 1){
					Game.state.vars.rooms.currentRoom.roomVars.particleList[i] = null;
				}
				if(Game.state.vars.rooms.currentRoom.roomVars.particleList[i] === null){
					Game.state.vars.rooms.currentRoom.roomVars.particleList = removeObject(i, Game.state.vars.rooms.currentRoom.roomVars.particleList);
					i--;
				}
			}
			
		},
		//Render Function
		render: function(){
			
			//Combine objectList and particleList into one drawList
			/*var drawList = [];
			for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.objectList.length; i++){
				drawList.push(Game.state.vars.rooms.currentRoom.roomVars.objectList[i]);
			}
			for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.particleList.length; i++){
				drawList.push(Game.state.vars.rooms.currentRoom.roomVars.particleList[i]);
			}
			drawList = sortObjectListByDepth(drawList);*/
			
			Game.state.vars.rooms.currentRoom.roomVars.objectList = sortObjectListByDepth(Game.state.vars.rooms.currentRoom.roomVars.objectList);
			var sortList = [];
			var topLeftOverList = [];
			var middleLeftOverList = [];
			var bottomLeftOverList = [];
			var drawList = [];
			for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.objectList.length; i++){
				sortList.push(Game.state.vars.rooms.currentRoom.roomVars.objectList[i]);
			}
			for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.particleList.length; i++){
				if(!isNaN(Game.state.vars.rooms.currentRoom.roomVars.particleList[i].vars.depth)){
					sortList.push(Game.state.vars.rooms.currentRoom.roomVars.particleList[i]);
				}
				else{
					if(Game.state.vars.rooms.currentRoom.roomVars.particleList[i].vars.depth === "bottom"){
						bottomLeftOverList.push(Game.state.vars.rooms.currentRoom.roomVars.particleList[i]);
					}
					else if(Game.state.vars.rooms.currentRoom.roomVars.particleList[i].vars.depth === "under_objects"){
						middleLeftOverList.push(Game.state.vars.rooms.currentRoom.roomVars.particleList[i]);
					}
					else if(Game.state.vars.rooms.currentRoom.roomVars.particleList[i].vars.depth === "top"){
						topLeftOverList.push(Game.state.vars.rooms.currentRoom.roomVars.particleList[i]);
					}
				}
			}
			sortList = sortObjectListByDepth(sortList);
			for(var i = 0; i < bottomLeftOverList.length; i++){
				drawList.push(bottomLeftOverList[i]);
			};
			for(var i = 0; i < middleLeftOverList.length; i++){
				drawList.push(middleLeftOverList[i]);
			};
			for(var i = 0; i < sortList.length; i++){
				drawList.push(sortList[i]);
			}
			for(var i = 0; i < topLeftOverList.length; i++){
				drawList.push(topLeftOverList[i]);
			};
			
			//Clear canvas for drawing
			ctx.clearRect(0, 0, windowWidth, windowHeight);
			
			//Global Scale and Translation
			ctx.save();
			ctx.scale(scaleRatio, scaleRatio);
			ctx.translate(Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.finalV.x, Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.finalV.y);
			
			//Draw objectList
			/*for(var i = 0; i < Game.state.vars.rooms.currentRoom.roomVars.objectList.length; i++){
				var tempObj = Game.state.vars.rooms.currentRoom.roomVars.objectList[i];
				tempObj.events.render(tempObj.vars, tempObj.events, Game.state.vars);
			}*/
			//Draw drawList
			for(var i = 0; i < drawList.length; i++){
				var tempEnt = drawList[i];
				if(tempEnt.isParticle != true){
					tempEnt.events.render(tempEnt.vars, tempEnt.events, Game.state.vars);
				}
				else{
					tempEnt.events.render(tempEnt.vars);
				}
				
			}
			
			//Render Hud
			Game.state.vars.rooms.currentRoom.roomVars.hudObj.events.render(Game.state.vars.rooms.currentRoom.roomVars.hudObj.vars, Game.state.vars.rooms.currentRoom.roomVars.hudObj.events, Game.state.vars);
			
			//Draw mouse and selection
			Game.state.vars.rooms.currentRoom.roomVars.mouseObj.events.render(Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars);
			//Game.state.vars.rooms.currentRoom.roomVars.mouseObj.events.render(Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars);
			
			//End Global Scale and Translation
			ctx.restore();
			/*ctx.translate(-Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.finalV.x, -Game.state.vars.rooms.currentRoom.roomVars.camObj.vars.finalV.y);
			ctx.scale(-scaleRatio, -scaleRatio);*/
			
		}
	},
	vars: {
		globalVars: {
			
		},
		persistVars: {
			/*
			* Have objects that want to use persistant vars to load persistant vars on room load and
			* save them on room close/leave or every update.
			*/
		},
		rooms: {
			globalVars: {
				playerVars: {
					
				},
				camVars: {
					
				}
			},
			currentRoom: {
				onLoad: function(gsVars){
					gsVars.rooms.currentRoom.globalVars = gsVars.rooms.globalVars;
					gsVars.rooms.currentRoom.persistVars = gsVars.rooms.persistVars;
					
					var player = createPlayer({x: gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/2 - 128, y: gsVars.rooms.currentRoom.roomVars.roomSize.v2.y/2});
					gsVars.rooms.currentRoom.roomVars.objectList = addObject(player, gsVars.rooms.currentRoom.roomVars.objectList);

					for(var i = 0; i < 10; i++){
						var wall = createWall({x: (gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/2), y: (gsVars.rooms.currentRoom.roomVars.roomSize.v2.y/2) + (64*i)}, {x: 8, y: 64}, {x: 0, y: 0}, 0);
						gsVars.rooms.currentRoom.roomVars.objectList = addObject(wall, gsVars.rooms.currentRoom.roomVars.objectList);
					}
					
					//Set vars such as the backgroundParticle and hud
					var backgroundParticle = createParticleStatic(
					{x: gsVars.rooms.currentRoom.roomVars.roomSize.v1.x + gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/2, y: gsVars.rooms.currentRoom.roomVars.roomSize.v1.y + gsVars.rooms.currentRoom.roomVars.roomSize.v2.y/2},
					{x: 0, y: 0}, gsVars.rooms.currentRoom.roomVars.roomSize.v2, {x: 1, y: 1}, 0, "background", "bottom",
						{
							isImg: 1,
							outline: 1,
							outlineDetails: {thickness: 2, alpha: 1, colour: "#000000"},
							alpha: 1,
							img: getImage(spriteList, "background_dirt")
						}
					);
					gsVars.rooms.currentRoom.roomVars.particleList = addObject(backgroundParticle, gsVars.rooms.currentRoom.roomVars.particleList);
					var backgroundWhiteParticle = createParticleStatic({x: gsVars.rooms.currentRoom.roomVars.roomSize.v1.x + gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/2, y: gsVars.rooms.currentRoom.roomVars.roomSize.v1.y + gsVars.rooms.currentRoom.roomVars.roomSize.v2.y/2},
					{x: 0, y: 0}, {x: gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/4, y: gsVars.rooms.currentRoom.roomVars.roomSize.v2.y/4}, {x: 1, y: 1}, 0, "background2", "bottom",
						{
							isImg: 0,
							type: "rect",
							outline: 0,
							outlineDetails: {thickness: 2, alpha: 1, colour: "#000000"},
							alpha: 1,
							colour: "#777777"//createGradient({x: -gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/8, y: 0}, {x: gsVars.rooms.currentRoom.roomVars.roomSize.v2.x/8, y: 0}, [{pos: 0, colour: "#000000"}, {pos: 1, colour: "#ffffff"}])//"#555555"
						}
					);
					gsVars.rooms.currentRoom.roomVars.particleList = addObject(backgroundWhiteParticle, gsVars.rooms.currentRoom.roomVars.particleList);
					
					/*
					* Loop through onLoad() function of all objects
					* or set a loaded variables that will toggle once the game has
					* done one update. It will trigger the onLoad() function
					* in the game loop.
					*/
					for(var i = 0; i < gsVars.rooms.currentRoom.roomVars.objectList.length; i++){
						var tempObj = gsVars.rooms.currentRoom.roomVars.objectList[i];
						//Let objects get room global variables
						gsVars = tempObj.events.onLoad(tempObj.vars, gsVars, i).gsVars;
					}
					
					return {gsVars: gsVars};
				},
				onClose: function(room, index, gsVars){
					for(var i = 0; i < gsVars.rooms.currentRoom.roomVars.objectList.length; i++){
						var tempObj = gsVars.rooms.currentRoom.roomVars.objectList[i];
						//Let objects update room global variables
						gsVars = tempObj.events.onClose(tempObj.vars, gsVars).gsVars;
					}
					gsVars.rooms.globalVars = gsVars.rooms.currentRoom.globalVars;
					if(index != null){
						gsVars.rooms.roomList[index].roomVars.persistVars = gsVars.rooms.currentRoom.roomVars.persistVars;
					}
					else{
						console.log("Error, persistant room vars could not be saved.");
					}
					return {gsVars: gsVars};
				},
				roomVars: {
					roomID: {index: null, name: "test_Room"},
					persistVars: {},
					globalVars: {},
					objectList: [
						
					],
					particleList: [
						
					],
					spriteList: spriteList,
					mouseObj: mouseObj,
					keyObj: keyObj,
					tempMouseV: {},
					camObj: camObj,
					hudObj: hudObj,
					roomSize: {
						v1: {x: 0, y: 0},
						v2: {x: baseWidth * 4, y: baseHeight * 4}
					}
				}
			},
			roomlist: [
				{
					
				}
				
			]
		}
		
	}
};

var tempStates = loadState(null, playState);
Game.state = tempStates.newState;

//Begin Game Loop
setInterval(Game.run, fpsInterval);

//OTHER FUNCTIONS

//Prevent Context Menu
document.addEventListener("contextmenu", preventContextMenu);
function preventContextMenu(event){
	event.preventDefault();
}

//Event Listeners
// Window Resize Events
window.addEventListener("resize", windowResize);
function windowResize(event){
	//Update viewport size to fit window
	console.log(1);
	browserWidth = document.getElementById("viewDiv").getBoundingClientRect().right - document.getElementById("viewDiv").getBoundingClientRect().left;
	browserHeight = document.getElementById("viewDiv").getBoundingClientRect().bottom - document.getElementById("viewDiv").getBoundingClientRect().top - 3;
	if(browserWidth < maxWidth || browserHeight < maxHeight){
		var widthRatio = browserWidth / baseWidth;
		var heightRatio = browserHeight / baseHeight;
		if(widthRatio <= heightRatio){
			scaleRatio = widthRatio;
		}
		else{
			scaleRatio = heightRatio;
		}
		windowWidth = baseWidth * scaleRatio;
		windowHeight = baseHeight * scaleRatio;
		document.getElementById("viewPort").width = windowWidth;
		document.getElementById("viewPort").height = windowHeight;
		document.getElementById("viewPort").style.marginLeft = (
			(((document.getElementById("viewDiv").getBoundingClientRect().right - document.getElementById("viewDiv").getBoundingClientRect().left)
			- (document.getElementById("viewPort").getBoundingClientRect().right - document.getElementById("viewPort").getBoundingClientRect().left))/2) + "px"
		);
		document.getElementById("viewPort").style.marginTop = (
			(((document.getElementById("viewDiv").getBoundingClientRect().bottom - document.getElementById("viewDiv").getBoundingClientRect().top)
			- (document.getElementById("viewPort").getBoundingClientRect().bottom - document.getElementById("viewPort").getBoundingClientRect().top))/2) - 2 + "px"
		);
	}
}

// Mouse Events
document.addEventListener("mousedown", mouseDown);
function mouseDown(event){
	var tempView = document.getElementById("viewPort");
	var tempMouseV = {
		x: (-tempView.getBoundingClientRect().left - window.scrollX + Math.round(event.clientX)) / scaleRatio,
		y: (-tempView.getBoundingClientRect().top - window.scrollY + Math.round(event.clientY)) / scaleRatio
	};
	Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.baseV = tempMouseV;
	var button = event.button;
	
	if(button === 0){
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[0].down = 1;
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[0].baseV = tempMouseV;
	}
	if(button === 2){
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[2].down = 1;
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[2].baseV = tempMouseV;
	}
	if(button === 1){
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[1].down = 1;
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[1].baseV = tempMouseV;
	}
	
}

document.addEventListener("mouseup", mouseUp);
function mouseUp(event){
	var tempView = document.getElementById("viewPort");
	var tempMouseV = {
		x: (-tempView.getBoundingClientRect().left - window.scrollX + Math.round(event.clientX)) / scaleRatio,
		y: (-tempView.getBoundingClientRect().top - window.scrollY + Math.round(event.clientY)) / scaleRatio
	};
	Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.baseV = tempMouseV;
	var button = event.button;
	
	if(button === 0){
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[0].down = 0;
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[0].baseV = tempMouseV;
	}
	if(button === 2){
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[2].down = 0;
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[2].baseV = tempMouseV;
	}
	if(button === 1){
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[1].down = 0;
		Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.buttons[1].baseV = tempMouseV;
	}
	
}

document.addEventListener("mousemove", mouseMove);
function mouseMove(event){
	var tempView = document.getElementById("viewPort");
	var tempMouseV = {
		x: (-tempView.getBoundingClientRect().left - window.scrollX + Math.round(event.clientX)) / scaleRatio,
		y: (-tempView.getBoundingClientRect().top - window.scrollY + Math.round(event.clientY)) / scaleRatio
	};
	Game.state.vars.rooms.currentRoom.roomVars.mouseObj.vars.baseV = tempMouseV;
}

// Keyboard Events
document.addEventListener("keypress", keyPress);
function keyPress(event){
	var key = event.keyCode;
	
}

//Key Events
document.addEventListener("keydown", keyDown);
function keyDown(event){
	var key = event.keyCode;
	
	var wKey;
	var sKey;
	var aKey;
	var dKey;
	
	//W and S Keys
	if(key === 87){
		wKey = 1;
	}
	if(key === 83){
		sKey = 1;
	}
	
	//A and D Keys
	if(key === 65){
		aKey = 1;
	}
	if(key === 68){
		dKey = 1;
	}
	
	//W and S Keys
	if(wKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.wKey = 1;
	}
	if(sKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.sKey = 1;
	}
	
	//A and D Keys
	if(aKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.aKey = 1;
	}
	if(dKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.dKey = 1;
	}
	
	if(key === 17){
		var ctrlKeyDown = 1;
	}
	
}

document.addEventListener("keyup", keyUp);
function keyUp(event){
	var key = event.keyCode;
	
	var wKey;
	var sKey;
	var aKey;
	var dKey;
	
	//W and S Keys
	if(key === 87){
		wKey = 1;
	}
	if(key === 83){
		sKey = 1;
	}
	
	//A and D Keys
	if(key === 65){
		aKey = 1;
	}
	if(key === 68){
		dKey = 1;
	}
	
	//W and S Keys
	if(wKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.wKey = 0;
	}
	if(sKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.sKey = 0;
	}
	
	//A and D Keys
	if(aKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.aKey = 0;
	}
	if(dKey === 1){
		Game.state.vars.rooms.currentRoom.roomVars.keyObj.vars.keyChecks.dKey = 0;
	}
	
}

//****************//MATH FUNCTIONS
function toRadians(degrees){
	return degrees * Math.PI / 180;
}
function toDegrees(radians){
	return radians * 180 / Math.PI;
}
function lengthDirX(angleC, sideC){
	var sideB;
	var radC = toRadians(angleC);
	sideB = Math.cos(radC)*sideC;
	return sideB;
}
function lengthDirY(angleC, sideC){
	var sideA;
	var radC = toRadians(angleC);
	sideA = Math.sin(radC)*sideC;
	return sideA;
}
function lengthDirC(angleC, sideA){
	var sideC;
	var radC = toRadians(angleC);
	sideC = sideA / Math.cos(radC);
	return sideC;
}
function getDistanceV(v1, v2){
	var num = ((v2.x - v1.x)*(v2.x - v1.x)) + ((v2.y - v1.y)*(v2.y - v1.y));
	var distance = Math.sqrt(num);
	return distance;
}
function containsV(v, rectV){
	newRectV = {v1: {}, v2: {}};
	if(rectV.v1.x > rectV.v2.x){
		newRectV.v1.x = rectV.v2.x;
		newRectV.v2.x = rectV.v1.x;
	}
	else{
		newRectV.v1.x = rectV.v1.x;
		newRectV.v2.x = rectV.v2.x;
	}
	if(rectV.v1.y > rectV.v2.y){
		newRectV.v1.y = rectV.v2.y;
		newRectV.v2.y = rectV.v1.y;
	}
	else{
		newRectV.v1.y = rectV.v1.y;
		newRectV.v2.y = rectV.v2.y;
	}
	
	if(v.x < newRectV.v2.x && v.x > newRectV.v1.x && v.y < newRectV.v2.y && v.y > newRectV.v1.y){
		return 1;
	}
	else{
		return 0;
	}
}
function containsRect(rectV1, rectV2){
	newRectV1 = {v1: {}, v2: {}};
	newRectV2 = {v1: {}, v2: {}};
	if(rectV1.v1.x > rectV1.v2.x){
		newRectV1.v1.x = rectV1.v2.x;
		newRectV1.v2.x = rectV1.v1.x;
	}
	else{
		newRectV1.v1.x = rectV1.v1.x;
		newRectV1.v2.x = rectV1.v2.x;
	}
	if(rectV1.v1.y > rectV1.v2.y){
		newRectV1.v1.y = rectV1.v2.y;
		newRectV1.v2.y = rectV1.v1.y;
	}
	else{
		newRectV1.v1.y = rectV1.v1.y;
		newRectV1.v2.y = rectV1.v2.y;
	}
	
	if(rectV2.v1.x > rectV2.v2.x){
		newRectV2.v1.x = rectV2.v2.x;
		newRectV2.v2.x = rectV2.v1.x;
	}
	else{
		newRectV2.v1.x = rectV2.v1.x;
		newRectV2.v2.x = rectV2.v2.x;
	}
	if(rectV2.v1.y > rectV2.v2.y){
		newRectV2.v1.y = rectV2.v2.y;
		newRectV2.v2.y = rectV2.v1.y;
	}
	else{
		newRectV2.v1.y = rectV2.v1.y;
		newRectV2.v2.y = rectV2.v2.y;
	}
	
	if(newRectV1.v1.x < newRectV2.v2.x && newRectV1.v2.x > newRectV2.v1.x && newRectV1.v1.y < newRectV2.v2.y && newRectV1.v2.y > newRectV2.v1.y){
		return 1;
	}
	else{
		return 0;
	}
}

function getAngleV(v1, v2){
	var xDiff = v2.x - v1.x;
	var yDiff = v2.y - v1.y;
	var angle = toDegrees(Math.atan2(yDiff, xDiff));
	return angle;
}

















