import React, { Component } from 'react';
import {
  AmbientLight,
  AppRegistry,
  asset,
  Box,
  DirectionalLight,
  Model,
  Pano,
  Text,
  View,
} from 'react-vr';

import CameraData from './components/CameraData.js';

// our pano comes from https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA20284

export default class MarsInfo extends Component {

  constructor() {
    super();
    this.state = {
      currentPhoto: 2,
      photoCollection: {
        photos: [
        ]
      }

    };
  };
  componentDidUpdate() {
    console.log("Did Update main")
  }

  componentDidMount() {
    //fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1197&api_key=RFeJEqlFxHwI4dyjszG5abxFieEmHUCI9QgmgiZd',
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1197&api_key=DEMO_KEY',
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(console.log("Got a response"))
      .then(json => this.setState({ photoCollection: json }))

  };



  render() {
    console.log("Render() main thread, photo collection:", this.state.photoCollection);
    return (
      <View>
        <CameraData photoCollection={this.state.photoCollection} currentPhoto={this.state.currentPhoto} />
        <Pano source={asset('PIA20284_2048.jpg')}
          style={{
            transform: [{
              rotateY: 150
            }]
          }} />
        <AmbientLight
          intensity={.3}
        />
        <DirectionalLight
          intensity={.7}
          style={{
            transform: [{
              rotateX: 10,
              rotateY: 150,
            }]
          }}
        />


      </View>
    );
  }
};

AppRegistry.registerComponent('MarsInfo', () => MarsInfo);
