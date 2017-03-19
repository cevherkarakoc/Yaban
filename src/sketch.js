import P5 from "p5";
import {Ocean, Water, Beach,
        Snow, Grass, Stone, Desert,
        TropicalForest, TaigaForest } from "./biomes";

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

    //p.noiseSeed(3678);
    p.noiseSeed(3);
    
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
    //map
    for (var x = 0; x < mapSize; x+=sc) {
      genMapArray[x] = [];
      for (var y = 0; y < mapSize; y+=sc) {

        p.noiseDetail(16,0.5);
        var n = p.noise((freq * x)+offsetX, (freq * y)+offsetY);

        p.noiseDetail(6,0.55);
        var moisture = p.noise((freq * x)+1000, (freq * y)+1000);
        
        //RADIAL GRADIANT
        var val = p.sqrt(p.pow((mapSize/2 - x),2) + p.pow(mapSize/2 - y,2) );
        val = p.map(val,0,mapSize/2 ,1,0);
        val *= 1;
        //

        n = n * val;
        
        var zone;
        
        if (n > 0.55 ){
          if(moisture<0.5) zone = new Stone(n);
          else zone = new Snow(n);
        }

        else if (n > 0.40 ) {
          if(moisture<=0.25) zone = new Desert(n);
          else if (moisture<0.50) zone = new Stone(n);
          else zone = new TaigaForest(n);
        }

        else if (n > 0.20 ){
          if(moisture<=0.25) zone = new Desert(n);
          else if (moisture<0.50) zone = new Grass(n);
          else zone = new TropicalForest(n);
        }

        else if (n > 0.15 ) {
          if(moisture<=0.25) zone = new Desert(n);
          else if (moisture<0.75) zone = new Grass(n);
          else zone = new TropicalForest(n);
        }
        else if (n > 0.12 ) zone = new Beach(n);
        else if (n > 0.08 ) zone = new Water();
        else zone = new Ocean;        
 
        //genMap.set(x,y,color(0,0,val*100));       

        genMapArray[x][y] = zone;
        var c = zone.color;

        genMap.set(x, y, p.color(c.H,c.S,c.B));
      }		
    }

    //shadow
    for (var x = 0; x < mapSize; x+=sc) {
      for (var y = 0; y < mapSize; y+=sc) {
        var c = genMapArray[x][y].height;
        var newC = p.color(0,0,100);

        if(c<0.14) c = 0;
        for(var i=0;i<2 && x>0 && y>0;i++){
          var pre = genMapArray[x-i][y-i].height;
          if(pre<0.14) pre = 0;          
          if(pre>c){
            newC = p.color(0,0,94-p.floor(pre));
            break;
          }
        }

        shadowBlend.set(x,y,newC);
      }
    }
    
    genMap.updatePixels();  
    shadowBlend.updatePixels();
    shadowBlend.filter(p.BLUR,1);    
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