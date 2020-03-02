import React from 'react'
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { getCountArticlesByUser } from '../Api/articleApi'

class MesInformations extends React.Component {

    constructor() {
        super()
        this.state = {total : 0}
    }

    componentDidMount() {
        getCountArticlesByUser(this.props.user.id).then(data => this.setState({
            total: data[0].total
        }))
    }

    render() {
        return (
            <View style={styles.view}>
                <Image
                    style={styles.image}
                    source={require('../Images/user_info.png')}
                />
                <Text style={styles.nom_prenom}>{this.props.user.nom} {this.props.user.prenom}</Text>
                <Text style={styles.label_mail}>Adresse mail</Text>
                <Text style={styles.email}>{this.props.user.email}</Text>
                <View style={styles.countainer_count}>
                    <Text style={styles.text_count_left}>Articles publiés :</Text>
                    <Text style={styles.text_count_right}>{this.state.total}</Text>
                </View>
                <TouchableOpacity
                    style={styles.bouton_editer}
                    onPress={() => this.props.navigation.navigate('Editer')}
                >
                    <Text style={styles.textButon}>Éditer le profil</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    image: {
        width: 180,
        height:180,
        alignSelf: 'center',
        marginTop: 25
    },
    nom_prenom: {
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30
    },
    label_mail: {
        alignSelf: 'center',
        marginTop: 25,
        fontWeight: 'bold',
        fontSize: 13
    },
    email: {
        alignSelf: 'center',
        marginTop: 2,
        fontWeight: 'bold',
        fontSize: 20
    },
    countainer_count: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 50,
        borderWidth: 3,
        height: 40,
        borderColor: '#eb9b3c',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_count_left : {
        flex: 1,
        textAlign: 'center',
        borderColor: '#eb9b3c',
        borderRightWidth: 1.5,
        height: 40,
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    text_count_right : {
        flex: 1,
        textAlign: 'center',
        borderColor: '#eb9b3c',
        borderLeftWidth: 1.5,
        height: 40,
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    bouton_editer: {
        borderRadius: 50,
        borderWidth :2,
        marginBottom: 10,
        borderColor: '#eb9b3c',
        width: 320,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#eb9b3c',
        marginTop : 70
    },
    textButon: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontSize: 17
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect (mapStateToProps)(MesInformations)
