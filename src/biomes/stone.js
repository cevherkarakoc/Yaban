import Biome from "./biome";

class Stone extends Biome{
  constructor(n){
    super(15.45+n,0.9);
    this.color = {H : 0,S : 0,B : 40};
  }
}

export default Stone;
