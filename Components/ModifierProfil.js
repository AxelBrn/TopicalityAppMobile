import React from 'react'
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { updateUserInfos, verifOldPassword } from '../Api/connexionApi'
import base64 from 'react-native-base64'

class ModifierProfil extends React.Component {

    constructor() {
        super();
        this.prenom = ''
        this.nom = ''
        this.oldPw = ''
        this.newPw = ''
        this.newPwVerif = ''
        this.user = undefined
        this.state = {
            verifPassword: true,
            verifOldPassword: true,
            user: undefined,
            textErreur: ''
        }
    }

    _verifChampsComplete() {
        if(this.prenom === ''){
            this.prenom = this.props.user.prenom
        }
        if(this.nom === '') {
            this.nom = this.props.user.nom
        }
        if(this.newPw !== '' && (this.newPw === this.newPwVerif)) {
            this.newPw = base64.encode(this.newPw)
            console.log(this.newPw)
        }
    }

    _verifOldPassword() {
        if(this.oldPw !== ''){
            let password = base64.encode(this.oldPw)
            verifOldPassword(this.props.user.id, password).then(data => this.setState({
                verifOldPassword: data.isGoodPassword
            }))
        }else if (this.oldPw === '' && this.newPw !== '' && this.newPwVerif !== ''){
            this.setState({
                verifOldPassword: false
            })
        }else{
            this.setState({
                verifOldPassword: true
            })
        }
    }

    _displayErrorOldPw() {
        if((this.state.verifOldPassword) && (this.state.textErreur !== '') && (this.state.verifPassword)){
            this.setState({
                textErreur: ''
            })
        }
        else if((!this.state.verifOldPassword) && (this.state.textErreur === '') && (this.state.verifPassword)){
            this.setState({
                textErreur: 'L\'ancien mot de passe est incorrect'
            })
        }
    }

    _getUpdate() {
        updateUserInfos(this.props.user.id, this.nom, this.prenom, this.newPw).then(data => this.props.dispatch({type: "CONNECT_USER", value: data[0]}))
    }

    _submitUpdate() {
        this._verifChampsComplete()
        if(this.state.verifPassword && this.state.verifOldPassword ){
            this._getUpdate()
            this.props.navigation.goBack()
        }
    }

    _nomTextInputChanged(text) {
        this.nom = text
    }
    _prenomTextInputChanged(text) {
        this.prenom = text
    }
    _oldPwTextInputChanged(text) {
        this.oldPw = text
    }
    _newPwTextInputChanged(text) {
        this.newPw = text
        if(this.newPw !== this.newPwVerif && this.newPw !== '' && this.newPwVerif !== '') {
            this.setState({
                verifPassword: false,
                textErreur: 'Les deux mots de passe doivent être identique !'
            })
        }
        else if(this.newPw !== '' && this.newPwVerif !== '' && this.oldPw === ''){
            this.setState({
                verifPassword: true,
                verifOldPassword: false,
                textErreur: ''
            })
        }
        else{
            this.setState({
                verifPassword: true,
                textErreur: ''
            })
        }
    }
    _newPwVerifTextInputChanged(text) {
        this.newPwVerif = text
        if(this.newPw !== this.newPwVerif && this.newPwVerif !== '' && this.newPw !== '') {
            this.setState({
                verifPassword: false,
                textErreur: 'Les deux mots de passe doivent être identique !'
            })
        }else if(this.newPw !== '' && this.newPwVerif !== '' && this.oldPw === ''){
            this.setState({
                verifPassword: true,
                verifOldPassword: false,
                textErreur: ''
            })
        }else{
            this.setState({
                verifPassword: true,
                textErreur: ''
            })
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.main}>
                    <Text style={styles.profil}>Profil</Text>
                    <View style={styles.information}>
                        <TextInput
                            style={styles.textinput_information}
                            placeholder='Nouveau nom'
                            placeholderTextColor={'gray'}
                            autoCapitalize='none'
                            onChangeText={(text) => this._nomTextInputChanged(text)}
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
                            onChangeText={(text) => this._prenomTextInputChanged(text)}
                        >
                            <Text>{this.props.user.prenom}</Text>
                        </TextInput>
                    </View>
                    {this._displayErrorOldPw()}
                    <Text style={{marginTop: 10,marginBottom: 10}}>Changer de mot de passe : </Text>
                    <Text style={styles.text_erreur}>{this.state.textErreur}</Text>
                    <TextInput
                        style={styles.mdp}
                        secureTextEntry={true}
                        placeholder='Mot de passe actuel'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                        onChangeText={(text) => this._oldPwTextInputChanged(text)}
                        onBlur={() => this._verifOldPassword() }
                    >
                    </TextInput>
                    <TextInput
                        style={styles.mdp}
                        secureTextEntry={true}
                        placeholder='Nouveau mot de passe'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                        onChangeText={(text) => this._newPwTextInputChanged(text)}
                    >
                    </TextInput>
                    <TextInput
                        style={styles.mdp}
                        secureTextEntry={true}
                        placeholder='Confirmer le nouveau mot de passe'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                        onChangeText={(text) => this._newPwVerifTextInputChanged(text)}
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={styles.bouton_editer}
                        onPress={() => this._submitUpdate()}
                    >
                        <Text style={styles.text_button}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
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
    },
    bouton_editer: {
        borderRadius: 50,
        borderWidth :2,
        marginBottom: 10,
        borderColor: '#ff7328',
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#ff7328',
        marginTop : 20
    },
    text_button: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontSize: 17
    },
    text_erreur: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'red'
    }

})
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ModifierProfil)
