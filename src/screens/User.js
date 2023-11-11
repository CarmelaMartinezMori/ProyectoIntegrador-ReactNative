import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let userArray = [];
        docs.forEach((doc) => {
          userArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          users: userArray[0]?.data || {},
        });
      });

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
        });
      });
  }

  Logout() {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileCon}>
          <Text style={styles.user}>@{this.state.users?.username}</Text>
          <Text style={styles.bio}> Bio: {this.state.users?.bio}</Text>
          <Text style={styles.bio}>Cantidad de posteos: {this.state.posts.length}</Text>
        </View>
        <TouchableOpacity onPress={() => this.Logout()}>
          <Text style={styles.log}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.tusPosts}>Tus posts: </Text>

        {this.state.posts.length === 0 ? (
          <View>
            <Text style={styles.nopost}>No has realizado ningún post. </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post data={item} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    flex: 1,
    borderRadius: 40,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
  },
  profileCon: {
    backgroundColor: 'rgb(239,219,224)',
  },
  user: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 28,
    marginTop: 10,
    fontWeight: 'bold',
  },
  tusPosts: {
    color: 'rgb(86,66,71)',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 3,
  },
  log: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 11,
    color: 'white',
    width: 200,
    backgroundColor: 'rgb(129,99,106)',
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 15,
  },
  bio: {
    textAlign: 'center',
    fontWeight: 'semi-bold',
    fontSize: 15,
    marginTop: 3,
  },
  nopost: {
    fontWeight: 'semi-bold',
    fontSize: 15,
    marginTop: 3,
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 100,
    margin: 'auto',
  },
});

export default Profile;
