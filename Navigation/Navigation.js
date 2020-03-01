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
