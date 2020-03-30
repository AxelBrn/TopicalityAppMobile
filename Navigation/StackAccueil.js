import React from 'react'
import {Image, StyleSheet, TouchableOpacity } from 'react-native';
import Accueil from '../Components/Accueil'
import ArticleDetail from '../Components/ArticleDetail';
import Categorie from '../Components/Categorie';
import {createStackNavigator} from '@react-navigation/stack';
import ModifierArticle from '../Components/ModifierArticle';

const StackAccueilComponent = createStackNavigator()

class StackAccueil extends React.Component {

    render() {
        return (
            <StackAccueilComponent.Navigator>
                <StackAccueilComponent.Screen
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
                                    onPress={this.props.navigation.openDrawer}
                                >
                                    <Image
                                        source={require('../Images/menu.png')}
                                        style={styles.icon}/>
                                </TouchableOpacity>
                            )
                        }
                    }}

                />
                <StackAccueilComponent.Screen
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
                        },
                        title: 'Détail',
                        headerTintColor: '#ffffff'
                    }}
                />
                <StackAccueilComponent.Screen
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
                        },
                        title: 'Catégorie',
                        headerTintColor: '#ffffff'
                    }}
                />
                <StackAccueilComponent.Screen
                    name="ModifArticle"
                    component={ModifierArticle}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#7571f9'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        },
                        title: 'Modifier un article',
                        headerTintColor: '#ffffff'
                    }}
                />
            </StackAccueilComponent.Navigator>
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

export default StackAccueil
