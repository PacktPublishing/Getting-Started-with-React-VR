// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { VRInstance } from 'react-vr-web';
//new: Note it's "Module" not NativeModule
import { Module } from 'react-vr-web';
import * as THREE from 'three';

function init(bundle, parent, options) {

  const scene = new THREE.Scene();
  const cubeModule = new CubeModule();
  var materialTorus;
  var materialCube;
  var torusCamera;
  var cubeCamera;
  var renderFrame;
  var torus;
  var texture;
  var cube;

  const vr = new VRInstance(bundle, 'GoingNative', parent, {
    // Add custom options here
    cursorVisibility: 'visible',
    nativeModules: [cubeModule],
    scene: scene,
    ...options,
  });

  //ok, we need to map in the background map.
  //there are two places for this to be
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('../static_assets/chess-world.jpg', function (texture) {
    texture.mapping = THREE.UVMapping;
    scene.background = texture;
  });

  torusCamera = new THREE.CubeCamera(.1, 100, 256);
  torusCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add(torusCamera);

  cubeCamera = new THREE.CubeCamera(.1, 100, 256);
  cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
  scene.add(cubeCamera);

  materialTorus = new THREE.MeshBasicMaterial({ envMap: torusCamera.renderTarget.texture });
  materialCube = new THREE.MeshBasicMaterial({ envMap: cubeCamera.renderTarget.texture  });

  torus = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(2, .6, 100, 25), materialTorus);
  torus.position.z = -10;
  torus.position.x = 1;
  scene.add(torus);

  cube = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), materialCube);
  cube.position.z = -4;
  scene.add(cube);

  renderFrame = 0;

  cubeModule.init(cube);

  vr.render = function (timestamp) {
    // Any custom behavior you want to perform on each frame goes here
    const seconds = timestamp / 2000;
    cube.position.x = 0 + (1 * (Math.cos(seconds)));
    cube.position.y = 0.2 + (1 * Math.abs(Math.sin(seconds)));
    cube.position.y = 0.2 + (1 * Math.sin(seconds));

    var time = Date.now();
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    //we need to turn off the reflected objects, 
    //or the camera will be inside.
    torus.visible = false;
    torusCamera.position.copy(torus.position);
    torusCamera.update(vr.player.renderer, scene)
    materialTorus.envMap = torusCamera.renderTarget.texture;
    torus.visible = true;

    cube.visible = false;
    cubeCamera.position.copy(cube.position);
    cubeCamera.update(vr.player.renderer, scene);
    materialCube.envMap = cubeCamera.renderTarget.texture;
    cube.visible = true;

    renderFrame++;

  };
  // Begin the animation loop
  vr.start();
  return vr;
};

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
window.ReactVR = { init };
