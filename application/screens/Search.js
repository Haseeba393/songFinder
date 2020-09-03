import React, {useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    View,
    Text
} from 'react-native';

//importing Colors
import { Colors } from '../resources';

//importing elements
import { Spinner, SuggestionCard } from '../components/elements';

const rapiApiKey = 'Input your API key here';

function Search({navigation}){

    const [data, setData] = useState([]);
    const [songTitle, setSongTitle] = useState('');
    const [isFetching, setisFetching] = useState(false);

    /**
     * Function which is setting the song title with updated inputted
     * value. It is taking input value as a prop from TextInput JSX.
     * Also this function is checking if there is nothing in textinput
     * then don't search otherwise do seach
     * @param {*} songTitle
     */
    function _songTitleInputHandler(songTitle){
        setSongTitle(songTitle);
        
        //title should have some characters in it
        if(songTitle.length > 0){
            setisFetching(true);
            //calling shazam api to get search results based on input
            _getSuggestions();
        }
        else{
            setData([]);
            setisFetching(false);
        }
    }

    /**
     * Function which is sending request to Shazam API to get suggestion
     * based on the inputted song title
     *
     */
    function _getSuggestions(){
        let searchString = songTitle.toLowerCase().trim();
        searchString = escape(searchString);
        fetch("https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=" + searchString, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": rapiApiKey,
            }
        })
        .then(response => {
            response.json().then((result)=>{
                setData(result.tracks.hits);
            });
            setisFetching(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    /**
     * Function which invokes when user clicks on any suggested song.
     * It is taking song object which we are receiving from Shazam API
     *
     * @param {*} item
     */
    function _onSongClick(item){
        navigation.navigate('songresult', ({
            'song': item,
        }));
    }

    return(
        <SafeAreaView style={Styles._mainContainer}>
            <Text style={Styles._heading}>Search any song</Text>
            <View style={Styles._inputView}>
                <TextInput 
                    placeholder='Start searching here...'
                    value={songTitle}
                    onChangeText={_songTitleInputHandler}
                    style={Styles._inputStyle}
                />
                {
                    isFetching ? (
                        <Spinner 
                            size={24}
                            color={Colors.secondaryColor}
                        />
                    ):(
                        null
                    )
                }
            </View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                    <SuggestionCard 
                        key={item.key} 
                        song={item.track}
                        onSongClick={_onSongClick.bind(this, item.track)}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
        padding: 40,
    },
    _heading:{
        fontSize: 22,
        color: Colors.primaryColor
    },
    _inputView:{
        width:'100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: 10,
        paddingRight: 15,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 30,
        elevation: 10,
    },
    _inputStyle:{
        width:'85%',
        height:'100%',
        padding: 10,
        color: Colors.blackColor,
        fontSize: 16
    }
});

export default Search;