import React from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MesInformations from '../Components/MesInformations'
import {connect} from 'react-redux'
import ModifierProfil from '../Components/ModifierProfil'

const StackMesInfosComponent = createStackNavigator()

class StackMesInfos extends React.Component {

    render() {
        return (
            <StackMesInfosComponent.Navigator>
                <StackMesInfosComponent.Screen
                    name="MesInfos"
                    component={MesInformations}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#ff7328'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        },
                        title: 'Mes informations',
                        headerRight: () => {
                            return (
                                <TouchableOpacity
                                    style={styles.button_burger}
                                    activeOpacity={1}
                                    onPress={() => {
                                        const action = { type: "TOGGLE_USER", value: undefined }
                                        this.props.dispatch(action)
                                    }}
                                >
                                    <Image
                                        source={require('../Images/power-button.png')}
                                        style={styles.icon}/>
                                </TouchableOpacity>
                            )
                        }
                    }}
                />
                <StackMesInfosComponent.Screen
                    name="ModifierProfil"
                    component={ModifierProfil}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#eb9b3c'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        },
                        title: 'Editer le profil',
                        headerTintColor: '#ffffff'
                    }}
                />
            </StackMesInfosComponent.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    button_burger: {
        marginRight:10,
        textAlign: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(StackMesInfos)
