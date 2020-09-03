/*
    Splash screen which is showing app name and loader.
    As we are not preforming any functionality on the loading of
    this screen that's why i just set a timeout of 2 seconds.
    After 2 seconds, user will be redireced to search screen
*/

import React,{useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text
} from 'react-native';

//importing custom elements
import { Spinner } from '../components/elements';

//importing colors
import { Colors } from '../resources';

function Splash({navigation}){

    //After 2 seconds moving to Search Screen
    useEffect(()=>{
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'search' }],
            });
        }, 2000);
    },[]);

    return(
        <SafeAreaView style={Styles._mainContainer}>
            <Text style={Styles._appName}>Song Finder</Text>
            <View style={Styles._spinnerView}>
                <Spinner 
                    size={24}
                    color={Colors.whiteColor}
                />
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    _appName:{
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.whiteColor
    },
    _spinnerView:{
        position: 'absolute',
        bottom: 100,
    },
});

export default Splash;