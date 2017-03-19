import {Ocean, Water, Beach,
        Snow, Grass, Stone, Desert,
        TropicalForest, TaigaForest } from "./biomes";

const makeBiome = (hight, moisture) => {
  var zone;

  if ( hight > 0.55 ) {
    if ( moisture <0.5 ) zone = new Stone(hight);
    else                 zone = new Snow(hight) ;
  }

  else if ( hight> 0.40 ) {
    if ( moisture <= 0.25 )     zone = new Desert(hight)     ;
    else if ( moisture < 0.50 ) zone = new Stone(hight)      ;
    else                        zone = new TaigaForest(hight);
  }

  else if ( hight > 0.20 ) {
    if ( moisture <= 0.25 )   zone = new Desert(hight)        ;
    else if (moisture < 0.50) zone = new Grass(hight)         ;
    else                      zone = new TropicalForest(hight);
  }

  else if ( hight> 0.15 ) {
    if ( moisture <= 0.25 )     zone = new Desert(hight)        ;
    else if ( moisture < 0.75 ) zone = new Grass(hight)         ;
    else                        zone = new TropicalForest(hight);
  }

  else if ( hight> 0.12 ) zone = new Beach(hight);
  else if ( hight> 0.08 ) zone = new Water();
  else zone = new Ocean;

  return zone; 
}

export default makeBiome;
