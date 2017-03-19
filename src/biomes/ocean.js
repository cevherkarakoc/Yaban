import Biome from "./biome";

class Ocean extends Biome{
  constructor(){
    super(0.2,0.9);
    this.color = {H : 220,S : 80,B : 80};
  }
}

export default Ocean;
