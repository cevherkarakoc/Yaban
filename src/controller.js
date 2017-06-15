class Controller {
  constructor(p,generateMap){
    this.p = p;
    this.generateMap = generateMap;
    this.base = {
      seed        : "Yaban :D",
      xSymmetry   : false,
      ySymmetry   : false,
      heightFac   : 1.0,
      moistureFac : 1.0,
      shadow      : true,
    }

    this.convertSeed();
  }

  createController(){
    var controllerDiv = this.p.createDiv("");
    controllerDiv.class("controller");

    var infoP = this.p.createP("If you want random seed, leave it blank");
    infoP.parent(controllerDiv);
    infoP.style("font-size","14px");

    var seedInput = this.p.createInput(this.base.seed);
    seedInput.parent(controllerDiv);
    seedInput.input(() => this.base.seed = seedInput.value());

    var seedButton = this.p.createButton("Generate");
    seedButton.parent(controllerDiv);
    seedButton.mousePressed(() => {
      this.convertSeed();
      this.generateMap();
    });

    var xSymmetryCbox = this.p.createCheckbox('X Symmetry', this.base.xSymmetry);
    xSymmetryCbox.parent(controllerDiv);
    xSymmetryCbox.changed(() => this.base.xSymmetry = !this.base.xSymmetry );

    var ySymmetryCbox = this.p.createCheckbox('Y Symmetry', this.base.ySymmetry);
    ySymmetryCbox.parent(controllerDiv);
    ySymmetryCbox.changed(() => this.base.ySymmetry = !this.base.ySymmetry );

    var heightSlider = this.createSliderWithLabel("heightFac"  ,"Height Factor : "  , 0.1, 5, 0.01);
    heightSlider.parent(controllerDiv);

    var moistureSlider = this.createSliderWithLabel("moistureFac","Moisture Factor : ", 0.1, 5, 0.01);
    moistureSlider.parent(controllerDiv);

    var shadowCbox = this.p.createCheckbox('Shadow', this.base.shadow);
    shadowCbox.parent(controllerDiv);
    shadowCbox.changed(() => this.base.shadow = !this.base.shadow );
  }

  convertSeed(){
    var realSeed = this.p.floor(this.p.random(10000));
    
    if(this.base.seed != ""){
      var realSeedString = "";
      for(var i=0;i<this.base.seed.length;i++){
        var charCode = this.p.abs(this.base.seed.charCodeAt(i)-32);
        realSeedString = realSeedString+charCode
      }
      realSeed = Number(realSeedString)%4294967296;
    }
    console.log("Real Seed : ",realSeed);
    this.realSeed = realSeed;
  }

  createSliderWithLabel (target, info, min, max, step){
    var sliderDiv = this.p.createDiv("");
    
    var infoSpan;
    var resultSpan;
    var slider;

    infoSpan = this.p.createSpan(info);
    infoSpan.parent(sliderDiv);

    slider = this.p.createSlider(min, max, this.base[target], step);
    slider.parent(sliderDiv);
    slider.input(() => {
      this.base[target] = slider.value()
      resultSpan.html(this.base[target]);
      }  
    );

    resultSpan = this.p.createSpan(this.base[target]);
    resultSpan.parent(sliderDiv);
    resultSpan.style("font-size","14px");
    resultSpan.style("margin-left","11px");

    return sliderDiv;
  }

}



export default Controller;
