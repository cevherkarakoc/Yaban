import Biome from "./biome";

class Snow extends Biome{
  constructor(n){
    super(18+n,0.9);
    this.color = {H : 0,S : 0,B : 95};
  }
}

export default Snow;
