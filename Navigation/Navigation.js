import React from 'react'
import Accueil from '../Components/Accueil'
import Connexion from '../Components/Connexion'
import { Image, StyleSheet} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import ArticleDetail from '../Components/ArticleDetail';

const StackAccueil = createStackNavigator()
const TabAccueil = createBottomTabNavigator()

function displayStackAccueil () {
    return (
        <StackAccueil.Navigator>
            <StackAccueil.Screen
                name="Accueil"
                component={Accueil}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#7571f9'
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    }
                }}

            />
            <StackAccueil.Screen
                name="Detail"
                component={ArticleDetail}
            />
        </StackAccueil.Navigator>
    )
}

function displayTabAccueil () {
    return (
        <TabAccueil.Navigator
            tabBarOptions = {{
                showLabel: false,
                activeBackgroundColor: '#7571f9',
                inactiveBackgroundColor: '#5d5aad'
            }}
            style={styles.color}
        >
            <TabAccueil.Screen
                name="Topicality"
                component={displayStackAccueil}
                options={{
                    tabBarIcon: () => {
                        return <Image
                            source={require('../Images/home.png')}
                            style={styles.icon}/>
                    }
                }}
            />
            <TabAccueil.Screen
                name="Connexion"
                component={Connexion}
                options={{
                    tabBarIcon: () => {
                        return <Image
                            source={require('../Images/login.png')}
                            style={styles.icon}/>
                    }
                }}
            />
        </TabAccueil.Navigator>
    )
}

class Navigation extends React.Component {

    render() {
        return (
            <NavigationContainer>
                {displayTabAccueil()}
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    color: {
        backgroundColor: '#7571f9'
    }
})

export default Navigation
