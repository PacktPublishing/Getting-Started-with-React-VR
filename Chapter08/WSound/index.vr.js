import React, { Component } from 'react';

import {
    Animated,
    AppRegistry,
    asset,
    AmbientLight,
    Box,
    DirectionalLight,
    Div,
    Model,
    Pano,
    Plane,
    Sound,
    Text,
    Vector,
    View,
} from 'react-vr';

class TurningPot extends React.Component {
    constructor(props) {
        super(props);
        this.state = { yRotation: 0 };
        this.lastUpdate = Date.now();
        this.rotate = this.rotate.bind(this);
    }
    rotate() { //custom function, called when it is time to rotate
        const now = Date.now();
        const delta = now - this.lastUpdate;
        const potSpeed = 20;
        this.lastUpdate = now;
        this.setState({ yRotation: this.state.yRotation + delta / potSpeed });
        //requestAnimationFrame calls the routine specified, not a variable
        this.frameHandle = requestAnimationFrame(this.rotate);
    }
    componentDidMount() { //do the first rotation
        this.rotate();
    }
    componentWillUnmount() {  //Important clean up functions
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }
    render() {
        return (
            <Animated.View                         // Base: Image, Text, View
                style={{
                    transform: [                        // `transform` is an ordered array
                        { translate: [0, -0.5, -5.1] },
                        { rotateY: this.state.yRotation },  // Map `yRotation' to rotateY 
                    ]
                }}
            >
                <Model
                    source={{
                        obj: asset('teapot2.obj'),
                        mtl: asset('teapot2_Mats.mtl'),
                    }}
                    lit
                //style={{
                //    transform: [{ translate: [0, -0.7, -5.1  ] }]
                //    }}
                />
            </Animated.View>
        );
    }

}


class Pedestal extends Component {
    render() {
        return (
            <View>
                <Box
                    dimWidth={.4}
                    dimDepth={.4}
                    dimHeight={.5}
                    lit
                    texture={asset('travertine_striata_vein_cut_honed_filled_Base_Color.jpg')}
                    style={{
                        transform: [{ translate: [this.props.MyX, -1.4, this.props.MyZ] }]
                    }}
                />
                <Box
                    dimWidth={.5}
                    dimDepth={.5}
                    dimHeight={.1}
                    lit
                    texture={asset('travertine_striata_vein_cut_honed_filled_Base_Color.jpg')}
                    style={{
                        transform: [{ translate: [this.props.MyX, -1.1, this.props.MyZ] }]
                    }}
                />
                <Box
                    dimWidth={.5}
                    dimDepth={.5}
                    dimHeight={.1}
                    lit
                    texture={asset('travertine_striata_vein_cut_honed_filled_Base_Color.jpg')}
                    style={{
                        transform: [{ translate: [this.props.MyX, -1.7, this.props.MyZ] }]
                    }}
                />
            </View>
        )
    }
}

class Platform extends Component {
    render() {
        return (
            <Model
                source={{
                    obj: asset('DeckPlate_v1.obj'),
                    mtl: asset('DeckPlate_v1_AllMats.mtl'),
                }}
                lit
                style={{
                    transform: [{
                        translate: [this.props.MyX, -1.8, this.props.MyZ]
                    }]
                }}
            />

        );
    }
}


export default class SpaceGallery extends React.Component {
    render() {
        return (
            <View>
                <Pano source={asset('BabbageStation_v6_r5.jpg')} />
                <AmbientLight

                    intensity={.3}

                />
                <DirectionalLight
                    intensity={.7}
                    style={{
                        transform: [{
                            rotateZ: -45
                        }]
                    }}
                />
                <Platform MyX='0' MyZ='-5.1' />
                <Platform MyX='0' MyZ='0' />
                <Platform MyX='0' MyZ='5.1' />
                <Platform MyX='5.1' MyZ='-5.1' />
                <Platform MyX='5.1' MyZ='0' />
                <Platform MyX='5.1' MyZ='5.1' />
                <Platform MyX='-5.1' MyZ='-5.1' />
                <Platform MyX='-5.1' MyZ='0' />
                <Platform MyX='-5.1' MyZ='5.1' />

                <Pedestal MyX='0' MyZ='-5.1' />
                <Pedestal MyX='0' MyZ='5.1' />
                <Pedestal MyX='5.1' MyZ='-5.1' />

                <Pedestal MyX='5.1' MyZ='5.1' />
                <Pedestal MyX='-5.1' MyZ='-5.1' />
                <Pedestal MyX='-5.1' MyZ='0' />
                <Pedestal MyX='-5.1' MyZ='5.1' />

                <View
                    style={{
                        transform: [{ translate: [-5.1, -1, -5.1] }]
                    }}
                >
                    <Model
                        source={{
                            obj: asset('teapot2.obj'),
                            mtl: asset('teapot2_Mats.mtl'),
                        }}
                        lit
                    >
                    </Model>
                    <Sound
                        loop
                        source={{ wav: asset('sounds/211491__abrez__boiling-water.mp3') }} />
                </View>

                <Text
                    style={{
                        backgroundColor: '#777879',
                        fontSize: 0.1,
                        fontWeight: '400',
                        layoutOrigin: [0.0, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [
                            { translate: [-5.2, -1.4, -4.6] }]
                    }}>
                    Utah Teapot
        </Text>
                <Text
                    style={{
                        backgroundColor: '#777879',
                        fontSize: 0.1,
                        fontWeight: '400',
                        layoutOrigin: [0.0, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [
                            { translate: [0, -1.3, -4.6] }]
                    }}>
                    Spinning Pot
        </Text>


                <Text
                    style={{
                        backgroundColor: '#777879',
                        fontSize: 0.2,
                        fontWeight: '400',
                        layoutOrigin: [0.0, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [
                            { translate: [0, 1, -6] }]
                    }}>
                    Space Gallery
  </Text>
                <TurningPot />

            </View>
        );
    }
};

AppRegistry.registerComponent('SpaceGallery', () => SpaceGallery);
