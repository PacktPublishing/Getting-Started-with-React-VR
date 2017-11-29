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
    Text,
    Vector,
    View,
} from 'react-vr';

class TurningPot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yRotation: new Animated.Value(0),
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.yRotation,                 // Animate `yRotation`
            {
                duration: 10000,                       // Time
                toValue: 360,                          // SpinAround
            }
        ).start();                                // Start the animation
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

class TurningPot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yRotation: new Animated.Value(0),
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.yRotation,                 // Animate `yRotation`
            {
                duration: 10000,                       // Time
                toValue: 360,                          // SpinAround
            }
        ).start();                                // Start the animation
    }
    render() {
        return (
            <Animated.View                         // Base: Image, Text, View
                style={{
                    transform: [                        // `transform` is an ordered array
                        { translate: [this.props.MyX, -0.5, this.props.My] },
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

                <Model
                    source={{
                        obj: asset('teapot2.obj'),
                        mtl: asset('teapot2.mtl'),
                    }}
                    lit
                    style={{
                        transform: [{ translate: [-5.1, -1, -5.1] }]
                    }}
                />
                <Model
                    source={{
                        obj: asset('Teapot2_NotSmooth.obj'),
                        mtl: asset('teapot2.mtl'),
                    }}
                    lit
                    style={{
                        transform: [{ translate: [-5.1, -1, 0] },
                        { rotateY: -30 }]

                    }}
                />

                <Model
                    source={{
                        obj: asset('Chap6_Teapot_V2.obj'),
                        mtl: asset('Chap6_Teapot_V2.mtl'),
                    }}
                    lit
                    style={{
                        transform: [{ translate: [-5.1, -1, 5.2] },
                        { rotateY: -30 },
                        { scale: 0.5 }]
                    }}
                />

                <Model
                    source={{
                        obj: asset('Chap6_Teapot_V5_SpoutDone.obj'),
                        mtl: asset('Chap6_Teapot_V5_SpoutDone.mtl'),
                    }}
                    lit
                    style={{
                        transform: [{ translate: [5.1, -1, 0] },
                        { rotateY: -30 },
                        { rotateX: 45 },
                        { scale: 0.5 }]

                    }}
                />

                <Model
                    source={{
                        obj: asset('Chap6_Teapot_V5_SpoutDone.obj'),
                        mtl: asset('Chap6_Teapot_V5_SpoutDone.mtl'),
                    }}
                    lit
                    style={{
                        transform: [{ translate: [5.1, -1, 5.1] },
                        { rotateY: 46 },
                        { scale: 0.5 }]

                    }}
                />
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
                    One Tri
        </Text>

                <Model
                    source={{
                        obj: asset('teapot2.obj'),
                        mtl: asset('teapot2_Mats.mtl'),
                    }}
                    lit
                    style={{
                        transform: [{ translate: [5.2, -1, -5.1] }]
                    }}
                />



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
