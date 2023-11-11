import { Text, View, TextInput, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export default class PostForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.props.description}
                    placeholder='Enter your post description'
                    onChangeText={(text) => this.props.updateDescription(text)}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 20,
        fontSize: 16,
        marginVertical: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center'
    },
});
