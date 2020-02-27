import React from 'react'
import {StyleSheet} from 'react-native'
import ArticleList from './ArticleList';

class Accueil extends React.Component {

    render() {
        return (
            <ArticleList navigation={this.props.navigation}/>
        )
    }
}

const styles = StyleSheet.create({
});

export default Accueil
