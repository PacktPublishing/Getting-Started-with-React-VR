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

const styles = StyleSheet.create({
    manifestCard: {
        flex: 1,
        flexDirection: 'column',
        width: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        opacity: 0.8,
        borderRadius: 0.1,
        borderColor: '#000',
        borderWidth: 0.02,
        padding: 0.1,
        layoutOrigin: [-1, 0.3],
        transform: [
            {
                rotateY: -30,
                translate: [1, 0, -2]
            }
        ]
    },

    manifestText: {
        textAlign: 'center',
        fontSize: 0.1
    },
    frontCard: {
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
        transform: [{ translate: [-1, 1, -3] }],
    },

    panoImage: {
        width: 500,
        height: 500,
        layoutOrigin: [-.5, 0],
    },
    baseView: {
        layoutOrigin: [0, 0],
    },
});




export default class CameraData extends Component {

        render() {
        console.log('CameraData props, checking Render()' , this.props)
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
        renderLoadingView() {
            console.log('CameraData props during renderLoadingView', this.props);
            return (
                <View style= { styles.frontCard } >
                    <Text style={styles.manifestText}>Loading</Text>
                    <Text style={styles.manifestText}>image data</Text>
                    <Text style={styles.manifestText}>from NASA</Text>
                    <Text style={styles.manifestText}>...</Text>
                    </View> 
                );
    
        };
    
    
        renderPhoto(photo)
            {
            console.log('CameraData props during RenderPhoto', photo);
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
                  style={{ transform: [{ translate: [ -2.5, -1, -5.1  ]}]
                    }}
                      />                
                <Model
                  source={{ obj: asset('ArrowUp.obj'),
                            mtl: asset('ArrowUp.mtl'), }}
                  lit
                  style={{ transform: [{ translate: [ 1.3, -1, -5.1  ]}]
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
    }

