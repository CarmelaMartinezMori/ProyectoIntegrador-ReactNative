import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Posteos from '../components/Posts';
import { db } from '../firebase/config';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let arrDocs = [];

        docs.forEach((doc) =>
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          })
        );
        this.setState({
          posts: arrDocs,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Posteos data={this.state.posts} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
