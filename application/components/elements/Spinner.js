import React from 'react';
import {
    ActivityIndicator
} from 'react-native';

function Spinner({size, color}){
    return(
        <ActivityIndicator 
            size={size}
            color={color}
        />
    );
}

export default Spinner;