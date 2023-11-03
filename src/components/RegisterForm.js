import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, } from "react-native";
import React, { Component } from "react";
import { auth, db } from '../firebase/config'


class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            bio: '',
            profilePic: '',
            error: ''
        }
    }
    actualizarprofilePic(profilePic) {
        this.setState({
            profilePic: profilePic
        })
    }

    registrarUsuario(email, password, bio, profilePic, username) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(data => {
                this.props.navigation.navigate('Home')

                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    bio: bio,
                    profilePic: profilePic,
                    username: username,
                })
                    .then((res) =>{
                        this.setState({
                        email: '',
                        password: '',
                        username: '',
                        bio: '',
                        profilePic: '',
                        error: ''  
                        })
                    }
                        )
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err.message })
            })
    }


    render() {
        return (
            <View style={styles.body}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email adress'
                    keyboardType="email-adress"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Type in a bio'
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ bio: text })}
                    value={this.state.bio}
                />

                {this.state.email && this.state.password && this.state.username && this.state.error == '' ?
                    (<TouchableOpacity style={styles.btn} onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.bio, this.state.profilePic, this.state.username)}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>)
                    : this.state.error ?
                        (
                            <View>
                                <Text style={styles.error}>{this.state.error}</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.bio, this.state.profilePic, this.state.username)}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                            </View>
                        )
                        :
                        (
                            <View>
                                <Text style={styles.alert}>Email, password and username are mandatory fields</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => { }}>
                                    <Text style={styles.btnText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        )

                }



            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#9E68F0',
        marginTop: 24,
        height: 24,
        padding: 5,
        color: 'white',
        flex: 1,
    },
    title: {
        fontWeight: 600,
        color: 'black',
        fontSize: 32,
        textAlign: 'center',
        titleBottom: 20
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
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
            borderRadius: 8
          },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    alert: {
        color: 'red',
        fontWeight: 'bold',
    },
    error: {
        color: 'orange',
        fontWeight: 'bold'
    },
    camara: {
        flex: 1
    },
    input:{
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    }
})

export default RegisterForm

