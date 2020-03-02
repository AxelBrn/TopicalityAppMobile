import React from 'react'
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ALirePlusTard from '../Components/ALirePlusTard';
import ArticleDetail from '../Components/ArticleDetail';


const StackArticlesALire = createStackNavigator()

class StackALirePlusTard extends React.Component {

    render() {
        return (
            <StackArticlesALire.Navigator>
                <StackArticlesALire.Screen
                    name="LirePlusTard"
                    component={ALirePlusTard}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#ff5050'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        },
                        title: 'Lire plus tard'
                    }}
                />
                <StackArticlesALire.Screen
                    name="Detail"
                    component={ArticleDetail}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#ff5050'
                        },
                        headerTitleStyle: {
                            color: '#ffffff',
                            fontWeight: 'bold'
                        }
                    }}
                />
            </StackArticlesALire.Navigator>
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

export default StackALirePlusTard
