import React, { Component } from 'react';

import {
  asset,
  Box,
  Model,
} from 'react-vr';

// This a floor for our maze. Optional, but then it can look lie
// you are floating over the background <pano>

export default class Floor extends Component {

  render() {
    return (
      <Model
        source={{
          // gltf2: asset('MazeFloorHollow.gltf')
          obj: asset('MazeFloorHollow.obj'),
          mtl: asset('MazeFloorHollow.mtl')
        }}
        style={{
          transform: [{ translate: [this.props.X, -4, this.props.Z] }]
        }}
      />
    );
  }
}
