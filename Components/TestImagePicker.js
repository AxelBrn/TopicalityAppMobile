import React from 'react'
import { Image, View, TouchableOpacity, Text } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { uploadImage } from '../Api/TestUploadApi'

class TestImagePicker extends React.Component {

    constructor() {
        super();
        this.state = {
            avatarSource: undefined
        }
    }

    options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    }

    _displayImagePicker() {
        ImagePicker.launchImageLibrary(this.options, (response) => {
            uploadImage(response).then(data => console.log(data))
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this._displayImagePicker()}>
                    <Text>Choisir une image</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default TestImagePicker
