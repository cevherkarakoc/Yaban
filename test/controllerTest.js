import {expect} from 'chai';
import P5 from "p5";
import P5Dom from "p5/lib/addons/p5.dom";

import Controller from "../src/controller";

describe('Controller', () => {
 
  const p = new P5((empty)=>{})
  const cb = () => 42;
  let testController;

  beforeEach(() => {
    testController = new Controller(p,cb);
  })

  it('should Controller Default Base is this', () => {
    
    var base = {
      seed        : "Yaban :D",
      xSymmetry   : false,
      ySymmetry   : false,
      heightFac   : 1.0,
      moistureFac : 1.0,
      shadow      : true,
    }

    expect(testController.base.heightFac).to.equal(base.heightFac);
  })

  it('should real seed is 2676861510', () => {
    testController.base.seed = "cevher";
    testController.convertSeed();

    expect(testController.realSeed).to.equal(2676861510);
  })

  it('should callback call well',() => {
    const result = testController.generateMap();
    expect(result).to.equal(42);
  })
});