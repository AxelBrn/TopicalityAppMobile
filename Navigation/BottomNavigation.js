import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import StackAccueil from './StackAccueil'
import StackConnexion from './StackMesArticles'
import {connect} from 'react-redux'
import StackALirePlusTard from './StackALirePlusTard';
import StackMesInfos from './StackMesInfos';

const BottomNav = createMaterialBottomTabNavigator()

class BottomNavigation extends React.Component {

    _displayMesInformations () {
        if(this.props.user !== undefined) {
            return (
                <BottomNav.Screen
                    name="Lire"
                    component={StackMesInfos}
                    options={{
                        tabBarIcon: () => {
                            return <Image
                                source={require('../Images/my_info.png')}
                                style={styles.icon}/>
                        },
                        tabBarColor: '#ff7328'
                    }}
                />
            )
        }
    }

    render() {
        return (
            <BottomNav.Navigator
                labeled={false}
                shifting={true}
            >
                <BottomNav.Screen
                    name="Topicality"
                    component={StackAccueil}
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
                    component={StackConnexion}
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
                    component={StackALirePlusTard}
                    options={{
                        tabBarIcon: () => {
                            return <Image
                                source={require('../Images/plus_tard.png')}
                                style={styles.icon}/>
                        },
                        tabBarColor: '#ff5050'
                    }}
                />
                {this._displayMesInformations()}
            </BottomNav.Navigator>
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
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(BottomNavigation)

