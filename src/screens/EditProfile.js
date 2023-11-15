import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      user: [],
      newPassword: '',
      errorOccurred: false,
    }
  }

  componentDidMount() {
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
      (docs) => {
        let userData = []
        docs.forEach((doc) => {
          userData.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        this.setState({
          user: userData,
        })
      }
    )
  }

  updateProfile(newPassword) {
    const { id, bio, username } = this.state.user[0];
    if (!newPassword) {
      db.collection('users').doc(id).update({
        username: username,
        bio: bio,
      }).then(() => {
        this.props.navigation.navigate("ProfileData");
      }).catch((error) => {
        console.log(error);
        this.setState({
          errorOccurred: true,
        });
      });
    } else {
      firebase.auth().currentUser.updatePassword(newPassword)
        .then(() => {
          db.collection('users').doc(id).update({
            username: username,
            bio: bio,
          }).then(() => {
            this.props.navigation.navigate("ProfileData");
          }).catch((error) => {
            console.log(error);
            this.setState({
              errorOccurred: true,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/requires-recent-login') {
            alert('This operation requires recent authentication. Please log in again.');
          } else {
            this.setState({
              errorOccurred: true,
            });
          }
        });
    }
  }
  
  
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.arrow}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("User")}
          >
            <FontAwesome name="arrow-left" size={20} />
            <Text>Back to Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          <Text style={styles.title}> Edit Profile </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter new username..."
            keyboardType="default"
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username || ''}  
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new bio..."
            keyboardType="default"
            onChangeText={(text) => this.setState({ bio: text })}
            value={this.state.bio || ''}  
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new password..."
            keyboardType="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ newPassword: text })}
            value={this.state.newPassword}
          />
          <TouchableOpacity
            onPress={() => this.updateProfile(this.state.newPassword)}
          >
            <Text style={styles.button}> Update Profile </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  editContainer: {
    backgroundColor: 'white',
    flex: 1,
    color: 'white',
    padding: 15,
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 40,
    marginTop: 40,
  },
  arrow: {
    margin: 10,
  },
  button: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: '#A3A0FD',
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
    fontWeight: 500,
    padding: 10,
    marginTop: 20,
    fontSize: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#A3A0FD',
    backgroundColor: 'white',
    margin: 10,
    color: 'black',
  },
});

export default EditProfile;
