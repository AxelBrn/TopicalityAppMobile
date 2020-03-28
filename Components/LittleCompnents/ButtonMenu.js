import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground, Text } from 'react-native'

class ButtonMenu extends React.Component {

    constructor() {
        super();
        this.index = 0
    }

    _setBackgroundColor() {
        return {
            backgroundColor: this.props.color
        }
    }

    _setBackgroundImage() {
        if(this.props.color === '#4e94f3') {
            return require('../../Images/menu-background-blue.png')
        }
        else if(this.props.color === '#ff5050') {
            return require('../../Images/menu-background-red.png')
        }
        else {
            return require('../../Images/menu-background-purple.png')
        }
    }

    _onPress() {
        this.props.active()
    }

    _displayMenu() {
        if(this.props.isActive) {
            if(this.props.disabled){
                this.props.active()
            }
            return(
                <View style={styles.menu}>
                    <ImageBackground
                        style={styles.background}
                        source={this._setBackgroundImage()}
                    >
                        <TouchableOpacity
                            style={styles.button_choose}
                        >
                           <Text style={styles.texte}>Modifier</Text>
                        </TouchableOpacity>
                        <View style={{backgroundColor: 'white', height:2, width: '90%', marginTop: 4, alignSelf: 'center'}}/>
                        <TouchableOpacity
                            style={styles.button_choose}
                            onPress={() => this.props.popUpActive(true)}
                        >
                            <Text style={styles.texte}>Supprimer</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{alignItems: 'flex-end'}}>
                {this._displayMenu()}
                <TouchableOpacity
                    style={[styles.button, this._setBackgroundColor()]}
                    onPress={() => this._onPress()}
                    activeOpacity={0.8}
                    disabled={this.props.disabled}
                >
                    <Image
                        style={styles.icon}
                        source={require('../../Images/menu-choose.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    button: {
        width: 28,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
    },
    icon: {
        width: 15,
        height:30,
        alignSelf: 'center'
    },
    menu: {
        height: 100,
        width: 100,
        marginRight: 2
    },
    background: {
        width: '100%',
        height: '100%',
    },
    texte: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    button_choose: {
        width: '100%',
        height: 39,
        justifyContent: 'center'
    }
})

export default  ButtonMenu
