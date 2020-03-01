import React from 'react'
import { StyleSheet} from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator,  DrawerContentScrollView } from '@react-navigation/drawer'
import CustomDrawer from './CustomDrawer'
import BottomNavigation from './BottomNavigation';

const DrawerNav = createDrawerNavigator()

function displayDrawer () {
    return (
        <DrawerNav.Navigator
            drawerStyle={styles.drawer_style}
            initialRouteName="Topicality"
            drawerContent={displayLogoTopicalityInDrawer}
        >
            <DrawerNav.Screen name="Topicality" component={BottomNavigation}/>
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
                                source={require('../Images/mes_articles.png')}
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
                name="MesArticles"
                component={MesArticles}
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
