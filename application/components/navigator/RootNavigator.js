import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//importing screens
import { Splash, Search, SongResult } from '../../screens';
import { Colors } from '../../resources';

//creating stack variable
const RootStack = createStackNavigator();

function RootNavigator(){
    return(
        <NavigationContainer>

            <RootStack.Navigator
                initialRouteName='splash'
                screenOptions={{
                    headerTintColor:Colors.whiteColor,
                }}>
                <RootStack.Screen 
                    name='splash'
                    component={Splash}
                    options={{
                        headerTitle:'',
                        headerTransparent: true,
                    }}
                />
                <RootStack.Screen 
                    name='search'
                    component={Search}
                    options={{
                        headerTitle:'',
                        headerTransparent: true,
                    }}
                />
                <RootStack.Screen 
                    name='songresult'
                    component={SongResult}
                    options={{
                        headerTitle:'',
                        headerTransparent: true
                    }}
                />
            </RootStack.Navigator>

        </NavigationContainer>
    );
}

export default RootNavigator;