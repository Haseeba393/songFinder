import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';

//importing Colors
import { Colors } from '../../resources';

function SuggestionCard({song, onSongClick}){
    return(
        <TouchableOpacity 
            style={Styles._mainContainer}
            onPress={onSongClick}>
            <Image source={{uri: song.images.coverart}} style={Styles._songCover}/>
            <View style={Styles._titleView}>
                <Text style={Styles._songTitle}>{song.title}</Text>
                <Text style={Styles._subtitle}>{song.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        width:'100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
    },
    _songCover:{
        width:80,
        height: '100%',
        resizeMode: 'center',
        borderRadius: 20,
    },
    _titleView:{
        width: '100%',
        marginLeft: 10,
    },
    _songTitle:{
        width: '60%',
        fontSize: 16,
        color: Colors.blackColor
    },
    _subtitle:{
        width: '60%',
        fontSize: 14,
        color: 'rgba(000,000,000,0.2)',
    },
});

export default SuggestionCard;