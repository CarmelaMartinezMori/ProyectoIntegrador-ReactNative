import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import Loader from '../components/Loader'
import { auth } from '../firebase/config'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true, 
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ loading: false });
      if (user) {
        this.props.navigation.navigate('Menu');
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

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