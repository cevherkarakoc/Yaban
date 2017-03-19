import Biome from "./biome";

class TropicalForest extends Biome{
  constructor(n){
    super(2+n,0.9);
    this.color = {H : 80,S : 90,B : 50};
  }
}

export default TropicalForest;
