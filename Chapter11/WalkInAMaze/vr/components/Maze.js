import React, { Component } from 'react';
var mersenneTwister = require('mersenne-twister');

import {
  View
} from 'react-vr';

import Hedge from './Hedge.js';
import Floor from './Floor.js';
import Gem from './Gem.js';

export default class Maze extends Component {

  constructor(props) {
    super(props);
    this.props = {
      cellSpacing: 3,
      sizeX: 5,
      sizeZ: 5,
      seed: 7
    };
    this.state = {
      mazeVertical: [],
      mazeHorizontal: [],
      curLine: [],
    };
    this.handleClickGem = this.handleClickGem.bind(this);
  }

  handleClickGem(X, Z) {
    //console.log('Maze recieved a click:' + X + 'x' + Z);
    // just pass it to the parent.
    // onClickGem is a prop passed by the parent
    this.props.onClickGem(X, Z);
  }

  componentWillMount() {
    this.GenerateMaze();
  }

  GenerateMaze() {
    //var hedgeRNG = new mersenneTwister(this.props.seed);

    var rng = new mersenneTwister(this.props.seed);
    var j = 0;
    var k = 0;

    var mazeVerti = [];
    var mazeHoriz = [];

    // jdg: we're doing some elementary type checking here ... also guards against bad usage
    // jdg: such as calling it with sizeX='4' ... because no one would do that :)
    var sizeX = Math.min(Math.max(3, this.props.sizeX), 100);
    var sizeZ = Math.min(Math.max(3, this.props.sizeZ), 100);
    var n = sizeX * sizeZ - 1;
    if (n < 0) { console.log('illegal maze dimensions'); return; } else { console.log('Generating' + sizeX + 'x' + sizeZ + ' Maze'); }
    for (j = 0; j < sizeX + 1; j++) mazeHoriz[j] = [];
    for (j = 0; j < sizeZ + 1; j++) mazeVerti[j] = [];
    var here = [Math.floor(rng.random() * sizeX), Math.floor(rng.random() * sizeZ)];
    var path = [here];
    var unvisited = [];
    var SizeZPlus1 = Math.floor(sizeZ) + 1;

    for (j = 0; j < sizeX + 2; j++) {
      unvisited[j] = [];
      for (k = 0; k < SizeZPlus1; k++) {
        unvisited[j].push(j > 0 && j < SizeZPlus1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
      }
    }
    while (0 < n) {
      var potential = [
        [here[0] + 1, here[1]],
        [here[0], here[1] + 1],
        [here[0] - 1, here[1]],
        [here[0], here[1] - 1]];
      var neighbors = [];
      for (j = 0; j < 4; j++)
        if (unvisited[potential[j][0] + 1][potential[j][1] + 1]) {
          neighbors.push(potential[j]);
        }
      if (neighbors.length) {
        n = n - 1;
        var randresult = rng.random();
        var next = neighbors[Math.floor(randresult * neighbors.length)];
        unvisited[next[0] + 1][next[1] + 1] = false;
        if (next[0] === here[0]) {
          mazeHoriz[next[0]][(next[1] + here[1] - 1) / 2] = true;
        }
        else {
          mazeVerti[(next[0] + here[0] - 1) / 2][next[1]] = true;
        }
        path.push(here = next);
      } else
        here = path.pop();
    }
    //jdg: you could experiment with this, although you may end up 
    //regenerating the maze on every click - which would 
    //look really poor.
    // const twist = hedgeRNG.random() * 10 + 90 * Math.floor(hedgeRNG.random() * 4);
    // const randScale = 1 + hedgeRNG.random() / 10;


    this.setState({ mazeVertical: mazeVerti });
    this.setState({ mazeHorizontal: mazeHoriz });
  }


  render() {

    var row = 0;
    var mazeHedges = [];
    console.log('Rendering maze of ' + this.props.sizeX + 'x' + this.props.sizeZ);
    var j = 0;
    var k = 0;
    for (j = 0; j < this.props.sizeX * 2 + 1; j++) {
      var line = [];
      if (0 === j % 2) {
        for (k = 0; k < this.props.sizeZ * 2 + 1; k++)
          if (0 === k % 2) line[k] = 'x';
          else if (j > 0 && this.state.mazeVertical[j / 2 - 1][Math.floor(k / 2)]) line[k] = ' ';
          else line[k] = 'x';
      }
      else {
        for (k = 0; k < this.props.sizeZ * 2 + 1; k++)
          if (0 === k % 2) {
            if (k > 0 && this.state.mazeHorizontal[(j - 1) / 2][k / 2 - 1]) line[k] = ' ';
            else line[k] = 'x';
          } else line[k] = ' ';
      }
      // mark these as 1 and 2, so there's no gem there
      // 1 is the start, and 2 is the end
      if (0 === j)
        line[1] = '1';
      // start is always (props.SizeX * 2 -1) * this.props.CellSpacing + this.props.StartX ;
      // start  is always (props.SizeZ * 2) * this.props.CellSpacing + this.props.StartZ ;

      if (this.props.sizeX * 2 - 1 === j) line[2 * this.props.sizeZ] = '2';

      var linestring = '';

      for (var i = 0; i < this.props.sizeX * 2 + 1; i++) {
        //uncomment this next line if you want the console to show
        //what maze you actually generate
        //linestring += line[i];
        let x = this.props.cellSpacing * i;
        let z = row * this.props.cellSpacing;
        var cellLoc = { X: x, Z: z, randRot: 0, randScale: 1 };

        mazeHedges.push(<Floor {...cellLoc} />);

        if (line[i] == 'x') {
          mazeHedges.push(<Hedge {...cellLoc}
          />);
        }
        else if (line[i] == ' ') {
          mazeHedges.push(<Gem {...cellLoc}
            onClickGem={this.handleClickGem}
          />);
        }
        else if (line[i] == '1') {
          // this is our finish ... 
          // you could send an event to our parent for the win, 
          // increase high score, etc.
        }
        else if (line[i] == '2') {
          // this is our start.
          // right now, we don't do anything
        }
      }
      //uncomment this next line if you want the console to show
      //what maze you actually generate
      //console.log('Maze:' + linestring);
      row = row + 1;
    }
    return (
      <View>
        {mazeHedges}
      </View>
    );
  }

}
