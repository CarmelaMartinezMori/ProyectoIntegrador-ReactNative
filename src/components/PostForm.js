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
        borderColor: 'red',
        padding: 10
    }
});
