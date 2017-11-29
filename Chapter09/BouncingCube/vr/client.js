import { VRInstance } from 'react-vr-web';
//new: Note it's "Module" not NativeModule
import { Module } from 'react-vr-web';
import * as THREE from 'three';

function init(bundle, parent, options) {

  const scene = new THREE.Scene();
  const cubeModule = new CubeModule();

  const vr = new VRInstance(bundle, 'GoingNative', parent, {
    cursorVisibility: 'visible',
    nativeModules: [cubeModule],
    scene: scene,
    ...options,
  });

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );
  cube.position.z = -4;
  scene.add(cube);

  cubeModule.init(cube);

  vr.render = function (timestamp) {
    const seconds = timestamp / 1000;
    cube.position.x = 0 + (1 * (Math.cos(seconds)));
    cube.position.y = 0.2 + (1 * Math.abs(Math.sin(seconds)));
    //end new 
  };
  vr.start();
  return vr;
};

window.ReactVR = { init };

export default class CubeModule extends Module {
  constructor() {
    super('CubeModule');
  }
  init(cube) {
    this.cube = cube;
  }
  changeCubeColor(color) {
    this.cube.material.color = new THREE.Color(color);
  }
}
