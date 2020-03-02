import React from 'react'
import {StyleSheet, View, Text} from 'react-native';
import ArticleList from './ArticleList';
//Ajout du connect
import { connect } from 'react-redux'

class ALirePlusTard extends React.Component {

    render() {
        return (
            <ArticleList
                articles ={this.props.articlesALire}
                navigation={this.props.navigation}
                isLoading={false}
            />
        )
    }
}

const styles = StyleSheet.create({

})

//Ajout en cour voir avec Axel
const mapStateToProps = (state) => {
    return {
        articlesALire: state.articlesALire
    }
}

export default connect (mapStateToProps)(ALirePlusTard)

