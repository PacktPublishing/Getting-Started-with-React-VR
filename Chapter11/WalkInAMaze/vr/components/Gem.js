import React, { Component } from 'react';
import GazeButton from 'react-vr-gaze-button'

import {
  asset,
  Model,
  Text,
  View
} from 'react-vr';

// This is our teleport UI; you stare at it, and then you'll be moved to here.

export default class Gem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Height: -3,
      buttonIsClicked: false
    };
  }

  onGemClicked() {
    this.setState({ buttonIsClicked: true });
    const time = new Date();
    console.log('Gem recieved a click at ' + this.props.X + ' x ' + this.props.Z + ' at ' + time.toLocaleTimeString());
    //send it to the parent
    this.props.onClickGem(this.props.X, this.props.Z);

    //if we were using event busses:
    //EventBus.publish('floorClicked', this.props.X, this.props.Z);

  }

  render() {
    const { buttonIsClicked } = this.state
    return (
      <GazeButton onClick={() => this.onGemClicked()}
        duration={2000}>
        {time => (

          <Model
            source={{
              gltf2: asset('TeleportGem.gltf')
            }}
            style={{
              transform: [{ translate: [this.props.X, buttonIsClicked ? this.state.Height - 2.5 : this.state.Height, this.props.Z] }]
            }}
            lit
          />
        )}
      </GazeButton>

    );
  }
}
