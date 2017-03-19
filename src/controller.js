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

  var shadowCbox = p.createCheckbox('Shadow', controller.shadow);
  shadowCbox.parent(controllerDiv);
  shadowCbox.changed(() => controller.shadow = !controller.shadow );
}

export default createController;
