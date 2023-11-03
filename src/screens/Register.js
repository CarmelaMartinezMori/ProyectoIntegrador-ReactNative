import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import RegisterForm from '../components/RegisterForm'


class Register extends Component {
  constructor(props) {
    super(props)
  }

  

  render() {
    return (
      <View style={styles.camara}>
        <RegisterForm navigation={this.props.navigation} />
        <View style={styles.container1}>
          <Text style={styles.btnText}>¿Already have an account?</Text>
          <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Login')}> 
          <Text style={styles.boton}>Login in Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    marginTop: 32,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  camara: {
    flex: 1
  },
  boton:{
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#A3A0FD',
    margin: 10,
    color: 'black',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8,
    marginBottom: 20
  },
  btnText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  }

}
)
export default Register