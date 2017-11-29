import React from 'react';
import {
  AppRegistry,
  asset,
  AmbientLight,
  DirectionalLight,
  Model,
  Pano,
  StyleSheet,
  Text,
  View,
} from 'react-vr';

import Maze from './vr/components/Maze.js';

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: 'center',
    fontSize: 0.1
  }
})

export default class WalkInAMaze extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cellSpacing: 2.1,
      sizeX: 4,
      sizeZ: 4,
      startX: 0,
      startZ: 0,
      seed: 7
    }
    this.handleClickGem = this.handleClickGem.bind(this);
    this.MazeStartX = this.MazeStartX.bind(this);
    this.MazeStartZ = this.MazeStartZ.bind(this);

  };

  MazeStartX(OffsetX) { return -(this.state.cellSpacing + OffsetX); };

  MazeStartZ(OffsetZ) { return -(OffsetZ); };

  componentWillMount() {
    this.setState({ startX: this.MazeStartX(0) });
    this.setState({ startZ: this.MazeStartZ(0) });
  }

  handleClickGem(X, Z) {
    const time = new Date();
    console.log("Main routine recieved a click:" + X + "x" + Z + " From:" + this.state.startX + "x" + this.state.startZ + ' at ' + time.toLocaleTimeString());
    this.setState({ startX: -X, startZ: -Z });
  };


  render() {
    return (
      <View
        style={{
          transform: [{ translate: [this.state.startX, 1, this.state.startZ] }]
        }} >
        <AmbientLight intensity={.3} />
        <DirectionalLight
          intensity={.7}
          style={{ transform: [{ rotateY: -21 }] }} />
        <Pano source={asset('Maze_Green_V12_4_2048.jpg')} style={{ transform: [{ rotateY: -90 }] }} />
        <Maze sizeX={this.state.sizeX} sizeZ={this.state.sizeZ} cellSpacing={this.state.cellSpacing} seed={this.state.seed}
          onClickGem={this.handleClickGem}
        />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'green',
          borderRadius: 0.1,
          borderColor: '#000',
          borderWidth: 0.02,
          padding: 0.05,
          transform: [{ translate: [2.1, -1, -2.1] }]
        }} >
          <Text style={styles.welcomeText}>Welcome to the maze!</Text>
          <Text style={styles.welcomeText}>For a view of the</Text>
          <Text style={styles.welcomeText}>morning fog on a lake,</Text>
          <Text style={styles.welcomeText}>look behind you, and </Text>
          <Text style={styles.welcomeText}>stare at a teleport </Text>
          <Text style={styles.welcomeText}>gem ... can you make it out?</Text>
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('WalkInAMaze', () => WalkInAMaze);
