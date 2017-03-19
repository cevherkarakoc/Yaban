import Biome from "./biome";

class Desert extends Biome{
  constructor(n){
    super(n,0.9);
    this.color = {H : 30,S : 90,B : 100};
  }
}

export default Desert;
