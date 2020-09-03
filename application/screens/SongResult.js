import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    Linking
} from 'react-native';

import { Spinner } from '../components/elements';
import { Colors } from '../resources'; 

const rapiApiKey = 'Input your API key here';

function SongResult({route}){

    //variables
    const {song} = route.params;
    const [isFetching, setFetching] = useState(false);
    const [songData, setSongData] = useState({});

    /**
     * Function which is responsible to open Youtube application
     * when user click on youtube link
     */
    function _openYoutube(){
        Linking.openURL(songData.sections[2].youtubeurl.actions[0].uri);
    }

    //On screen loading we are getting all details of the song based on its
    //Using another Shazam API. Through we are able to get Youtube link as well
    useEffect(() => {
        fetch("https://shazam.p.rapidapi.com/songs/get-details?locale=en-US&key=" + song.key, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": rapiApiKey
            }
        })
        .then(response => {
            response.json().then(async(result)=>{
                await setSongData(result);
                setFetching(true);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }, [isFetching])

    return(
        isFetching ? (
            <ScrollView style={Styles._mainContainer}>
                <View style={Styles._songImgView}>
                    <Image source={{uri: songData.images.coverart}} style={Styles._songImgStyle}/>
                </View>
                <View style={Styles._mainInfoView}>
                    <View style={Styles._infoView}>
                        <Text style={Styles._heading}>Song Title</Text>
                        <Text style={Styles._info}>{songData.title}</Text>
                    </View>
                    <View style={Styles._infoView}>
                        <Text style={Styles._heading}>Subtitle</Text>
                        <Text style={Styles._info}>{songData.subtitle}</Text>
                    </View>
                    <View style={Styles._infoView}>
                        <Text style={Styles._heading}>Genre</Text>
                        <Text style={Styles._info}>{songData.genres.primary}</Text>
                    </View>
                    <View style={Styles._infoView}>
                        <Text style={Styles._heading}>Youtube Link</Text>
                        <Text style={Styles._link} onPress={_openYoutube}>{songData.sections[2].youtubeurl.actions[0].uri}</Text>
                    </View>
                </View>
            </ScrollView>
        ):(
            <View style={Styles._loadingContainer}>
                <Spinner 
                    size={24}
                    color={Colors.primaryColor}
                />
                <Text>Fetching song details...</Text>
            </View>
        )
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flexGrow: 1,
    },
    _loadingContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    _songImgView:{
        width: '100%',
        height: 300,
    },
    _songImgStyle:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    _mainInfoView:{
        flex: 1,
        padding: 40,
    },
    _infoView:{
        marginBottom: 20,
    },
    _heading:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    _info:{
        fontSize: 16,
        color: 'rgba(000,000,000,0.5)'
    },
    _link:{
        color: Colors.primaryColor,
        fontSize: 16,
        textDecorationLine: 'underline'
    }
});

export default SongResult;