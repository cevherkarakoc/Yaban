import Biome from "./biome";

class Water extends Biome{
  constructor(){
    super(0.1,0.9);
    this.color = {H : 200,S : 90,B : 90};
  }
}

export default Water;
