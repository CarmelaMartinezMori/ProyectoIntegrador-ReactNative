import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Posts';

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
    console.log(this.props);
    db.collection('users')
      .where('owner', '==', this.state.props.route.params.email)
      .onSnapshot((docs) => {
        let arrUser = [];
        docs.forEach((doc) => {
          arrUser.push({
            id: doc.id,
            data: doc.data(),
          });
          console.log(arrUser);
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
    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.infoUser !== '' ? (
          <>
            <Text style={styles.owner}>{this.state.infoUser.data.owner}</Text>
            <Text style={styles.info}>{this.state.infoUser.data.bio}</Text>
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
    backgroundColor: '#DCDCDD',
  },
  owner: {
    padding: 10,
    margin: 10,
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#10254E',
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
  },
});

export default UsersProfile;
