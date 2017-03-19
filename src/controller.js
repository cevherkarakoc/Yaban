const createController = (p,controller, buttonAction) => {
  var controllerDiv = p.createDiv("");
  controllerDiv.class("controller");

  var infoP = p.createP("If you want random seed, leave it blank");
  infoP.parent(controllerDiv);
  infoP.style("font-size","14px");

  var seedInput = p.createInput(controller.seed);
  seedInput.parent(controllerDiv);
  seedInput.input(() => controller.seed = seedInput.value());

  var seedButton = p.createButton("Generate");
  seedButton.parent(controllerDiv);
  seedButton.mousePressed(() => {
    p.noiseSeed(controller.seed);
    buttonAction();
  });

  var xSymmetryCbox = p.createCheckbox('X Symmetry', controller.xSymmetry);
  xSymmetryCbox.parent(controllerDiv);
  xSymmetryCbox.changed(() => controller.xSymmetry = !controller.xSymmetry );

  var ySymmetryCbox = p.createCheckbox('Y Symmetry', controller.ySymmetry);
  ySymmetryCbox.parent(controllerDiv);
  ySymmetryCbox.changed(() => controller.ySymmetry = !controller.ySymmetry );

  var heightSlider = createSliderWithLabel(p,controller,"heightFac"  ,"Height Factor : "  , 0.1, 5, 0.01);
  heightSlider.parent(controllerDiv);

  var moistureSlider = createSliderWithLabel(p,controller,"moistureFac","Moisture Factor : ", 0.1, 5, 0.01);
  moistureSlider.parent(controllerDiv);

  var shadowCbox = p.createCheckbox('Shadow', controller.shadow);
  shadowCbox.parent(controllerDiv);
  shadowCbox.changed(() => controller.shadow = !controller.shadow );
}

const createSliderWithLabel = (p, controller, target, info, min, max, step) => {
  var sliderDiv = p.createDiv("");
  
  var infoSpan;
  var resultSpan;
  var slider;

  infoSpan = p.createSpan(info);
  infoSpan.parent(sliderDiv);

  slider = p.createSlider(min, max, controller[target], step);
  slider.parent(sliderDiv);
  slider.input(() => {
    controller[target] = slider.value()
    resultSpan.html(controller[target]);
    }  
  );

  resultSpan = p.createSpan(controller[target]);
  resultSpan.parent(sliderDiv);
  resultSpan.style("font-size","14px");
  resultSpan.style("margin-left","11px");

  return sliderDiv;
}

export default createController;
