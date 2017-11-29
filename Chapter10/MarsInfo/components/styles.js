import React, { Component } from 'react';

import {
    StyleSheet,
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
                translate:[ 1, 0, -2]
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
        layoutOrigin: [0 , 0],
    },
});
