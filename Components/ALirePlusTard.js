import React from 'react'
import {StyleSheet, View, Text} from 'react-native';
import ArticleList from './ArticleList';
//Ajout du connect
import { connect } from 'react-redux'

class ALirePlusTard extends React.Component {

    render() {
        if(this.props.articlesALire.length > 0) {
            return (
                <ArticleList
                    articles={this.props.articlesALire}
                    navigation={this.props.navigation}
                    isLoading={false}
                />
            )
        }
        else{
            return (
                <View style={styles.main_container}>
                    <Text style={styles.text}>Vous n'avez aucun article à lire pour le moment</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    text: {
        marginTop: 15,
        color:'gray',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
})

//Ajout en cour voir avec Axel
const mapStateToProps = (state) => {
    return {
        articlesALire: state.articlesALire
    }
}

export default connect (mapStateToProps)(ALirePlusTard)

