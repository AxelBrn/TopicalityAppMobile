import React from 'react'
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MesArticles from '../Components/MesArticles';
import Connexion from '../Components/Connexion';
import ArticleDetail from '../Components/ArticleDetail';
import MesInformations from '../Components/MesInformations';

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
                            backgroundColor: '#eb9b3c'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        },
                        title: 'Mes informations'
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
        marginLeft:10,
        textAlign: 'center',
        alignItems: 'center'
    }
})

export default StackMesInfos
