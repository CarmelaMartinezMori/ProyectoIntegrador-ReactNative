import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            bio: '',
            error: '',
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Menu')
            }
        })
    }

    handleRegister() {
        const { email, password, username, bio } = this.state;

        if (!email || !password || !username) {
            this.setState({ error: 'Email, password, and username are mandatory fields' });
            return;
        }

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                db.collection('users')
                    .doc(authUser.user.uid) // Store user data in a collection with the user's ID
                    .set({
                        bio,
                        username,
                        createdAt: new Date(),
                    })
                    .then(() => {
                        this.props.navigation.navigate('Home');
                    })
                    .catch((error) => {
                        this.setState({ error: error.message });
                    });
            })
            .catch((error) => {
                this.setState({ error: error.message });
            });
    }

    

    render() {
        return (
            <View style={styles.body}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type in a bio"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ bio: text })}
                    value={this.state.bio}
                />

                <Text style={styles.error}>{this.state.error}</Text>

                <TouchableOpacity style={styles.btn} onPress={() => this.handleRegister()}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#9E68F0',
        marginTop: 10,
        height: 40,
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
    },
    btn: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#A3A0FD',
        margin: 10,
        color: 'black',
        padding: 10,
        textAlign: 'center',
        borderRadius: 8,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default RegisterForm;
