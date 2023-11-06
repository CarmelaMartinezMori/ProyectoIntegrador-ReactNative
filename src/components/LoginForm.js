import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from '../firebase/config'


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(resp => this.props.navigation.navigate('Menu'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.body}>
                <TextInput
                    placeholder='Enter your email address'
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={styles.input}
                >
                </TextInput>

                <TextInput
                    placeholder='Enter your password'
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.input}
                    secureTextEntry= {true}
                />

                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => this.login(this.state.email, this.state.password)}
                >
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        margin: 16,
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10, 
        marginTop: 15
    },
    boton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#A3A0FD',
        margin: 10,
        color: 'white',
        padding: 10,
        textAlign: 'center',
        borderRadius: 8
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    body:{
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
    }
})
export default LoginForm