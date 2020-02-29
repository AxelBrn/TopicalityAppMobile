import React from 'react'
import Accueil from '../Components/Accueil'
import Connexion from '../Components/Connexion'
import { Image, StyleSheet, TouchableOpacity} from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ArticleDetail from '../Components/ArticleDetail'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator,  DrawerContentScrollView } from '@react-navigation/drawer'
import ALirePlusTard from '../Components/ALirePlusTard'
import Categorie from '../Components/Categorie';
import CustomDrawer from './CustomDrawer';

const StackAccueil = createStackNavigator()
const StackConnexion = createStackNavigator()
const BottomNav = createMaterialBottomTabNavigator()
const DrawerNav = createDrawerNavigator()

function displayDrawer () {
    return (
        <DrawerNav.Navigator
            drawerStyle={styles.drawer_style}
            initialRouteName="Topicality"
            drawerContent={displayLogoTopicalityInDrawer}
        >
            <DrawerNav.Screen name="Topicality" component={displayBottomTab}/>

        </DrawerNav.Navigator>
    )
}

function displayLogoTopicalityInDrawer (props) {
    return (
        <DrawerContentScrollView {...props} style={styles.custom_drawer}>
            <CustomDrawer
                navigation={props.navigation}
            />
        </DrawerContentScrollView>
    )
}


function displayBottomTab () {
    return (
        <BottomNav.Navigator
            labeled={false}
            shifting={true}
        >
            <BottomNav.Screen
                name="Topicality"
                component={displayStackAccueil}
                options={{
                    tabBarIcon: () => {
                        return <Image
                            source={require('../Images/home.png')}
                            style={styles.icon}/>
                    },
                    tabBarColor: '#7571f9'
                }}
            />
            <BottomNav.Screen
                name="Connexion"
                component={displayStackConnexion}
                options={{
                    tabBarIcon: () => {
                        return <Image
                            source={require('../Images/login.png')}
                            style={styles.icon}/>
                    },
                    tabBarColor: '#4e94f3'
                }}
            />
            <BottomNav.Screen
                name="LirePlusTard"
                component={ALirePlusTard}
                options={{
                    tabBarIcon: () => {
                        return <Image
                            source={require('../Images/plus_tard.png')}
                            style={styles.icon}/>
                    },
                    tabBarColor: '#ff5050'
                }}
            />
        </BottomNav.Navigator>
    )
}

function displayStackConnexion () {
    return (
        <StackConnexion.Navigator>
            <StackConnexion.Screen
                name="Connexion"
                component={Connexion}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#4e94f3'
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    }
                }}
            />
        </StackConnexion.Navigator>
    )
}

function displayStackAccueil ({navigation}) {
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
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                style={styles.button_burger}
                                activeOpacity={1}
                                onPress={navigation.openDrawer}
                            >
                                <Image
                                    source={require('../Images/menu.png')}
                                    style={styles.icon}/>
                            </TouchableOpacity>
                        )
                    }
                }}

            />
            <StackAccueil.Screen
                name="Detail"
                component={ArticleDetail}
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
                name="Categorie"
                component={Categorie}
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
        </StackAccueil.Navigator>
    )
}


class Navigation extends React.Component {

    render() {
        return (
            <NavigationContainer>
                {displayDrawer()}
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    button_burger: {
        marginLeft:10,
        textAlign: 'center',
        alignItems: 'center'
    },
    drawer_style: {
        backgroundColor: '#7571f9',
        margin: 0
    },
    custom_drawer: {
        backgroundColor: '#ffffff',
        flex: 1
    }
})

export default Navigation
