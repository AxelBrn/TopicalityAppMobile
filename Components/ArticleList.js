import React from 'react'
import {StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import ArticleItem from './ArticleItem';

class ArticleList extends React.Component{

    _displayDetailForArticle = (idArticle) => {
        this.props.navigation.navigate('Detail', {idArticle: idArticle})
    }

    _displayLoading() {
        if (this.props.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color={'black'} />
                </View>
            )
        }
    }

    _displayArticle() {
        if (this.props.articles.length > 0) {
            return(
                <View>
                    <FlatList
                        data={ this.props.articles }
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ArticleItem
                                article={item}
                                displayArticle={this._displayDetailForArticle}
                            />
                        )}
                    />
            </View>
            )
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this._displayLoading()}
                {this._displayArticle()}
            </View>

        )
    }
}
const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default ArticleList
