import P5 from "p5";

const sketch = (p) => {

  const sc = 1;
  const freq = 0.01;

  var offsetX = 0;
  var deltaX = 0;
  var offsetY = 0;
  var deltaY = 0;

  var genMapArray;
  var genMap;
  var mapSize;
  var shadowBlend;

  p.setup = () => {
    p.createCanvas(600,600);-
    p.noStroke();
    p.colorMode(p.HSB);
    //p.noiseSeed(5);
    p.noiseDetail(16,0.5);

    mapSize = p.width;
    genMapArray = [];
    genMap = p.createImage(mapSize, mapSize);
    shadowBlend = p.createImage(mapSize, mapSize);
    generateMap();  
  }

  p.draw = () => {
    offsetX+=deltaX*3;
    offsetY+=deltaY*3;
    p.image(genMap,offsetX,offsetY);
    //p.image(shadowBlend,offsetX,offsetY);
    p.blend(shadowBlend, 0, 0, mapSize, mapSize, offsetX, offsetY, mapSize, mapSize, p.MULTIPLY)
  }

  function generateMap() {
    for (var x = 0; x < mapSize; x+=sc) {
      genMapArray[x] = [];
      for (var y = 0; y < mapSize; y+=sc) {

        var n = p.noise((freq * x)+offsetX, (freq * y)+offsetY);
        
        //RADIAL GRADIANT
        var val = p.sqrt(p.pow((mapSize/2 - x),2) + p.pow(mapSize/2 - y,2) );
        val = p.map(val,0,mapSize/2 ,1,0);
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
        genMap.set(x,y,p.color(c,100,100));
      }		
    }

    for(var i = 0; i< mapSize; i+=sc){
      var prevH = 0;
      var step = 0;
      for (var x = 0; x < mapSize; x+=sc) {
        var y = x+i;
        var c = genMapArray[x][y];
        if(c < 0.25) c = 0;
        var newC = p.color(0,0,100);
        if(c>prevH){
          prevH = c;
        }else if(c<prevH && step<3){
          newC = p.color(0,0,90);
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
        var newC = p.color(0,0,100);
        if(c>prevH){
          prevH = c;
        }else if(c<prevH && step<3){
          newC = p.color(0,0,90);
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

  // INPUT EVENT
  
  p.mouseClicked = () => {
    p.noiseSeed(p.random(100));
    generateMap();
  }

  p.keyPressed = () => {
    if(p.keyCode === 37) deltaX = 1;
    else if(p.keyCode === 39) deltaX = -1;

    if(p.keyCode === 38) deltaY = 1;
    else if(p.keyCode === 40) deltaY = -1;
  }

  p.keyReleased = () => {
    if(p.keyCode === 37 || p.keyCode === 39) deltaX = 0;

    if(p.keyCode === 38 || p.keyCode === 40) deltaY = 0;
  }
}

var p5 = new P5(sketch);