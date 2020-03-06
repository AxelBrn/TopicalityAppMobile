import React from 'react'
import Hr from "react-native-hr-component";
import {StyleSheet, View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux';
class ModifierProfil extends React.Component {

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.profil}>Profil</Text>
                <View style={styles.information}>
                    <TextInput
                        style={styles.textinput_information}
                        placeholder='Nouveau nom'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                    >
                        <Text>{this.props.user.nom}</Text>
                    </TextInput>
                </View>
                <View style={styles.information}>
                    <TextInput
                        style={styles.textinput_information}
                        placeholder='Nouveau Prenom'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                    >
                        <Text>{this.props.user.prenom}</Text>
                    </TextInput>
                </View>
                <View style={styles.information}>
                    <TextInput
                        style={styles.textinput_information}
                        placeholder='Nouveau mail'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                    >
                        <Text>{this.props.user.email}</Text>
                    </TextInput>
                </View>
                <Text style={{marginTop: 10,marginBottom: 10}}>Changer de mot de passe : </Text>
                <TextInput
                    style={styles.mdp}
                    //secureTextEntry={true}
                    placeholder='Mot de passe actuel'
                    placeholderTextColor={'gray'}
                    autoCapitalize='none'
                >
                </TextInput>
                <TextInput
                    style={styles.mdp}
                    //secureTextEntry={true}
                    placeholder='Nouveau mot de passe'
                    placeholderTextColor={'gray'}
                    autoCapitalize='none'
                >
                </TextInput>
                <TextInput
                    style={styles.mdp}
                    //secureTextEntry={true}
                    placeholder='Confirmer le nouveau mot de passe'
                    placeholderTextColor={'gray'}
                    autoCapitalize='none'
                >
                </TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mdp: {
        borderRadius: 50,
        borderWidth: 2,
        marginBottom: 13,
        borderColor: 'gray',
        width: 275,
        height: 45,
        alignSelf: 'center',
        textAlign: 'center',
    },
    information: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    textinput_information: {
        borderRadius: 50,
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 10,
        borderColor: 'gray',
        width: 275,
        height: 45,
        alignSelf: 'center',
        textAlign: 'center',
    },
    profil: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'gray',
        marginBottom: 15
    }

})
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect (mapStateToProps)(ModifierProfil)
