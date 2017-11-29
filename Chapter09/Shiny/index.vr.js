import React from 'react';
import {
  AmbientLight,
  Animated,
  AppRegistry,
  asset,
  DirectionalLight,
  Easing,
  NativeModules,
  Pano,
  Sound,
  Sphere,
  Text,
  View,
  VrButton,

} from 'react-vr';

// Native Module defined in vr/client.js
const cubeModule = NativeModules.CubeModule;

class GoingNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = { btnColor: 'gray', cubeColor: 'yellow' };
    //cubeModule.changeCubeColor(this.state.cubeColor);
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <AmbientLight
          intensity={.3}
        />
        <DirectionalLight
          intensity={.7}
          style={{
            transform: [{
              rotateZ: 45
            }]
          }}
        />

        <VrButton
          style={{
            backgroundColor: this.state.btnColor,
            borderRadius: 0.05,
            margin: 0.05,
            transform: [{translate: [0, 0, -3] }],
          }}
          onEnter={() => { this.setState({ btnColor: this.state.cubeColor }) }}
          onExit={() => { this.setState({ btnColor: 'gray' }) }}
          onClick={() => {
            let hexColor = Math.floor(Math.random() * 0xffffff).toString(16);
            // Ensure we always have 6 digits by padding with leading zeros.
            hexColor = '#' + (('000000' + hexColor).slice(-6));
            this.setState({ cubeColor: hexColor, btnColor: hexColor });
            // Asynchronous call to custom native module; sends the new color.
            cubeModule.changeCubeColor(hexColor);
          }}
          onClickSound={asset('freesound__278205__ianstargem__switch-flip-48kmono.wav')}
        >
          <Sound autoPlay={false}
            source={asset('freesound__278205__ianstargem__switch-flip-48kmono.wav')} />
          <Text style={{
            fontSize: 0.15,
            paddingTop: 0.025,
            paddingBottom: 0.025,
            paddingLeft: 0.05,
            paddingRight: 0.05,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
            button
        </Text>
        </VrButton>
        <Sphere
          radius={0.5}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: 'blue',
            transform: [{ translate: [-1, 0, -3] }],
          }}
          lit
        />
        <Sphere
          radius={1.5}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: 'crimson',
            transform: [{ translate: [1, -2, -3] }],
          }}
          lit
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('GoingNative', () => GoingNative);
