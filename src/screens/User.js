import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

class User extends Component {
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
          {this.state.users.profileImage && (
            <Image
              source={{ uri: this.state.users.profileImage }}
              style={styles.image}
            />
          )}
          <Text style={styles.user}>@{this.state.users?.username}</Text>
          <Text style={styles.bio}> Bio: {this.state.users?.bio}</Text>
          <Text style={styles.bio}>
            Number of posts: {this.state.posts.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EditProfile")}
        >
          <Text style={styles.modify}>
            <FontAwesome name="gear" size={22} style={styles.modbutton} />
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.Logout()}>
          <Text style={styles.log}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.tusPosts}>Your posts: </Text>

        {this.state.posts.length === 0 ? (
          <View>
            <Text style={styles.nopost}>
              You have not posted anything yet.{" "}
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Post data={item} navigation={this.props.navigation} />
            )}
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
    alignItems: 'center', 
    paddingVertical: 20, 
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
    fontSize: 16,
    fontWeight: '500',
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
  modify:{
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontWeight:'bold',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
  },
  modbutton:{
    margin: 10,
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
    borderRadius: 50, 
    marginBottom: 10, 
  },
});

export default User;
