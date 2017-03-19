import {Ocean, Water, Beach,
        Snow, Grass, Stone, Desert,
        TropicalForest, TaigaForest } from "./biomes";

const makeBiome = (height, moisture) => {
  var zone;

  if ( height > 0.55 ) {
    if ( moisture <0.5 ) zone = new Stone(height);
    else                 zone = new Snow(height) ;
  }

  else if ( height> 0.40 ) {
    if ( moisture <= 0.25 )     zone = new Desert(height)     ;
    else if ( moisture < 0.50 ) zone = new Stone(height)      ;
    else                        zone = new TaigaForest(height);
  }

  else if ( height > 0.20 ) {
    if ( moisture <= 0.25 )   zone = new Desert(height)        ;
    else if (moisture < 0.50) zone = new Grass(height)         ;
    else                      zone = new TropicalForest(height);
  }

  else if ( height> 0.15 ) {
    if ( moisture <= 0.25 )     zone = new Desert(height)        ;
    else if ( moisture < 0.75 ) zone = new Grass(height)         ;
    else                        zone = new TropicalForest(height);
  }

  else if ( height> 0.12 ) zone = new Beach(height);
  else if ( height> 0.08 ) zone = new Water();
  else zone = new Ocean;

  return zone; 
}

export default makeBiome;
