import Biome from "./biome";

class Grass extends Biome{
  constructor(n){
    super(n,0.9);
    this.color = {H : 90,S : 45,B : 70};
  }
}

export default Grass;
