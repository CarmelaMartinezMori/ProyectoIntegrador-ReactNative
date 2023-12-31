import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import LoginForm from '../components/loginForm'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.input}>
        <Text style={styles.title}>Login</Text>
        <LoginForm navigation={this.props.navigation} />
        <Text style={styles.btnText}> Don´t have an account?
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.boton}> Register Here! </Text>
          </TouchableOpacity>
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  boton: {
    borderStyle: 'solid',
    borderWidth: 1,
    color: 'black',
    backgroundColor: '#A3A0FD',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8, 
    marginRight: 5
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  },
  title: {
    marginTop: 50,
    marginBottom: 15,
    fontWeight: 600,
    color: 'black',
    fontSize: 32,
    textAlign: 'center'
  }

})
export default Login