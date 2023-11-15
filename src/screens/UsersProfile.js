import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Posts';
import { AntDesign } from '@expo/vector-icons';

class UsersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoUser: '',
      userInfo: [],
      props: props,
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', this.state.props.route.params.email)
      .onSnapshot((docs) => {
        let arrUser = [];
        docs.forEach((doc) => {
          arrUser.push({
            id: doc.id,
            data: doc.data(),
          });
          this.setState({
            infoUser: arrUser[0],
          });
        });
      });

    db.collection('posts')
      .where('owner', '==', this.state.props.route.params.email)
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.infoUser !== '' ? (
          <>
           <TouchableOpacity
          style={styles.arrow}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>
            <AntDesign name="arrowleft" size={24} color="black" />
            HOME
          </Text>
        </TouchableOpacity>
            <Text style={styles.owner}>{this.state.infoUser.data.owner}</Text>
            <Text style={styles.info}>Bio: {this.state.infoUser.data.bio}</Text>
            <Posts
              data={this.state.posts}
              navigation={this.props.navigation}
            />
          </>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  owner: {
    padding: 10,
    margin: 10,
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#A3A0FD',
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
  },
  info: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 16,
  }
});

export default UsersProfile;
