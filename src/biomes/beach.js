import Biome from "./biome";

class Beach extends Biome{
  constructor(n){
    super(n,0.9);
    this.color = {H : 50,S : 70,B : 100};
  }
}

export default Beach;
