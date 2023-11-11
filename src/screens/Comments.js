import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import CommentForm from '../components/CommentForm';
import { db } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot((doc) => {
        this.setState({
          data: doc.data(),
          comments: doc.data().comments.sort((a, b) => a.createdAt - b.createdAt).reverse(), 
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>
            <AntDesign name="arrowleft" size={24} color="black" />
            HOME
          </Text>
        </TouchableOpacity>

        <FlatList
          style={styles.comments}
          data={this.state.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentOwner}>{item.owner}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          )}

          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.noComments}>No comments yet. Be the first to comment!</Text>
            </View>
          )}
        />
        <CommentForm idPost={this.props.route.params.id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'rgb(255,255,255)',
    padding: 15,
  },
  arrow: {
    alignItems: 'start',
  },
  comments: {
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
  },
  commentOwner: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    color: 'black',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noComments: {
    color: 'grey',
  },
});

export default Comments;
