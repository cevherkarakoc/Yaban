var sc = 1;
var offsetX = 0;
var deltaX = 0;
var offsetY = 0;
var deltaY = 0;
var freq = 0.01;

var genMapArray;
var genMap;
var mapSize;
var shadowBlend;

//p5.disableFriendlyErrors = true;
function setup() {
  createCanvas(600,600);
  //noLoop();
	noStroke();
  //noSmooth();
  colorMode(HSB);
  //noiseSeed(5);
  noiseDetail(16,0.5);

  mapSize = width;
  genMapArray = [];
  genMap = createImage(mapSize, mapSize);
  shadowBlend = createImage(mapSize, mapSize);
  generateMap();  
}

function generateMap() {
  for (var x = 0; x < mapSize; x+=sc) {
    genMapArray[x] = [];
    for (var y = 0; y < mapSize; y+=sc) {

      var n = noise((freq * x)+offsetX, (freq * y)+offsetY);
      
      //RADIAL GRADIANT
      var val = sqrt(pow((mapSize/2 - x),2) + pow(mapSize/2 - y,2) );
      val = map(val,0,mapSize/2 ,1,0);
      val *= 1;
      //
      
      n = n * val;
      
      var c = 250;
      if (n > 0.08 ) c = 200;
      if (n > 0.12 ) c = 55;
      if (n > 0.15 ) c = 140;
      if (n > 0.25 ) c = 110;
      if (n > 0.35 ) c = 25;
      if (n > 0.50 ) c = 15;
      if (n > 0.60 ) c = 0;
     
      //genMap.set(x,y,color(0,0,val*100));       

      genMapArray[x][y] = n;
      genMap.set(x,y,color(c,100,100));
		}		
  }

  for(var i = 0; i< mapSize; i+=sc){
    var prevH = 0;
    var step = 0;
    for (var x = 0; x < mapSize; x+=sc) {
      var y = x+i;
      var c = genMapArray[x][y];
      if(c < 0.25) c = 0;
      var newC = color(0,0,100);
      if(c>prevH){
        prevH = c;
      }else if(c<prevH && step<3){
        newC = color(0,0,90);
        step++;
      }
      if(step>=3){
        step = 0;
        prevH = 0;
      }

      shadowBlend.set(x,y,newC);
    }  
  }

  for(var i = 1; i<mapSize ; i+=sc){
    var prevH = 0;
    var step = 0;
    for (var x = 0; x < mapSize; x+=sc) {
      var y = x - i;
      
      var c = genMapArray[x][y];
      if(c < 0.25) c = 0;
      var newC = color(0,0,100);
      if(c>prevH){
        prevH = c;
      }else if(c<prevH && step<3){
        newC = color(0,0,90);
        step++;
      }
      if(step>=3){
        step = 0;
        prevH = 0;
      }

      shadowBlend.set(x,y,newC);
    }  
  }
  
  genMap.updatePixels();  
  shadowBlend.updatePixels();
}

function draw() {
  background(51);
  
  offsetX+=deltaX*3;
  offsetY+=deltaY*3;
  image(genMap,offsetX,offsetY);
  //image(shadowBlend,offsetX,offsetY);
  blend(shadowBlend, 0, 0, mapSize, mapSize, offsetX, offsetY, mapSize, mapSize, MULTIPLY)
}

// INPUT EVENT
function mouseClicked(){
  noiseSeed(random(100));
  generateMap();
}

function keyPressed(){
  if(keyCode === 37) deltaX = 1;
  else if(keyCode === 39) deltaX = -1;

  if(keyCode === 38) deltaY = 1;
  else if(keyCode === 40) deltaY = -1;
}

function keyReleased(){
  if(keyCode === 37 || keyCode === 39) deltaX = 0;

  if(keyCode === 38 || keyCode === 40) deltaY = 0;
}
