import React, { Component } from 'react';

import {
  asset,
  Box,
  Model,
} from 'react-vr';


export default class Hedge extends Component {

  render() {
    return (
      <Model
        lit
        source={{
          obj: asset('MazeHedgeLowPoly_4.obj'),
          mtl: asset('MazeHedgeLowPoly_4.mtl')
        }}
        style={{
          transform: [
            { translate: [this.props.X, -4, this.props.Z] },
            { rotateY: this.props.randRot },
            { scale: [1 * this.props.randScale, 1 * this.props.randScale, 1 * this.props.randScale] }
          ]
        }
        }
      />
    );
  }
}
