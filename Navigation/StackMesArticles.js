import React from 'react'
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MesArticles from '../Components/MesArticles';
import Connexion from '../Components/Connexion';
import ArticleDetail from '../Components/ArticleDetail';

const StackConnexionComponent = createStackNavigator()

class StackMesArticles extends React.Component {

    render() {
        return (
            <StackConnexionComponent.Navigator>
                <StackConnexionComponent.Screen
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
                        },
                        title: 'Mes articles'
                    }}
                />
                <StackConnexionComponent.Screen
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
                <StackConnexionComponent.Screen
                    name="Detail"
                    component={ArticleDetail}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#4e94f3'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        },
                        title: 'Détail'
                    }}
                />
            </StackConnexionComponent.Navigator>
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

export default StackMesArticles
