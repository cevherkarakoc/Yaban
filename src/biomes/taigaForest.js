import Biome from "./biome";

class TaigaForest extends Biome{
  constructor(n){
    super(8+n,0.9);
    this.color = {H : 170,S : 90,B : 40};
  }
}

export default TaigaForest;
