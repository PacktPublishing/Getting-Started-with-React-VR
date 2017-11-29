import React, { Component } from 'react';

import {
    asset,
    CylindricalPanel,
    Image,
    Model,
    StyleSheet,
    Text,
    View,
} from 'react-vr';

export default class CameraManifest extends Component {

    renderLoadingView() {
        console.log('CameraManifest props during renderLoadingView', this.props);
        return (
            <View style= { styles.LoadingCard } >
                <Text style={styles.manifestText}> Loading the</Text>
                <Text style={styles.manifestText}> image and </Text>
                <Text style={styles.manifestText}> data ... </Text>
                </View> 
            );

    };


    renderPhoto(photo)
        {
        console.log('CameraManifest props during RenderPhoto', photo);
        return (
            <View  style = { styles.baseView }>
                    <CylindricalPanel
                        style={{
                        }}
                        layer={{
                            width: 1000,
                            height: 1000,
                            density: 4680,
                            radius: 20
                        }}>
                    <Image 
                       source={{uri:photo.img_src}}
                       style={styles.panoImage}>
                    </Image>

                 </CylindricalPanel>
            <Model
              source={{ obj: asset('ArrowDown.obj'),
                        mtl: asset('ArrowDown.mtl'), }}
              lit
              style={{ transform: [{ translate: [ -5, -1, -10.1  ]}]
                }}
                  />                
            <Model
              source={{ obj: asset('ArrowUp.obj'),
                        mtl: asset('ArrowUp.mtl'), }}
              lit
              style={{ transform: [{ translate: [ 5, -1, -10.1  ]}]
                }}
                  />                
                <View style={styles.manifestCard}>
                    <Text style={styles.manifestText}>{photo.camera.full_name}</Text>
                    <Text style={styles.manifestText}>{photo.rover.name} Rover #{photo.rover.id}</Text>
                    <Text style={styles.manifestText}>Landed on: {photo.rover.landing_date}</Text>
                    <Text style={styles.manifestText}>Launched on: {photo.rover.launch_date}</Text>
                    <Text style={styles.manifestText}>Total Photos: {photo.rover.total_photos}</Text>
                    <Text style={styles.manifestText}>Most recent: {photo.rover.max_date} Latest earth date</Text>
                    <Text style={styles.manifestText}>Viewing: {photo.rover.max_sol} Mars Sol</Text>
                    <Text style={styles.manifestText}>Taken: {photo.earth_date} Earth (GMT)</Text>
                    </View>

                </View>

            );
            }

        render() {
        console.log('CameraManifest props, checking Render()' , this.props)
        if (!this.props)
            {
            console.log("No current props");
            return this.renderLoadingView();
            }
        var photos = this.props.photoCollection.photos;
        if (!photos)
            {
            console.log("No current photo collection");
            return this.renderLoadingView();
            }
            //jdg: The most interesting photo starts at 8, for the Sol we've picked
            //for interesting test data, we're cherry picking here.
            //https://mars.jpl.nasa.gov/msl-raw-images/msss/01197/mcam/1197ML0054560000502947E01_DXXX.jpg 

        var photo = photos[this.props.currentPhoto];
        if (! photo)
            {
            console.log("No current photo");
            return this.renderLoadingView();
            }
        console.log("default view with data, photo", photo);
        return this.renderPhoto(photo);
        };
}

const styles = StyleSheet.create({
    loadingCard: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'green',
        opacity: 0.8,
        borderRadius: 0.1,
        borderColor: '#000',
        borderWidth: 0.02,
        padding: 0.1,
        layoutOrigin: [1,1],
        transform: [
            {
                rotateY: -90,
            }
        ]

    },
    manifestCard: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'green',
        opacity: 0.8,
        borderRadius: 0.1,
        borderColor: '#000',
        borderWidth: 0.02,
        padding: 0.1,
        layoutOrigin: [-.5, 0.3],
        transform: [
            {
                rotateY: -90,
            }
        ]
    },

    manifestText: {
        textAlign: 'center',
        fontSize: 0.1
    },
    imageCard: {
        opacity: 0.8,
        width: 1,
        height: 1,
        layoutOrigin: [1, 0],
        transform: [
            {
                rotateY: 90
            }
        ]

    },
    panoImage: {
        width: 500,
        height: 500,
        layoutOrigin: [-.5, 0],
    },
    baseView: {
        layoutOrigin: [0 , 0],
    },
});


