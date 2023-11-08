import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  createComment(comment) {
    if (comment) {
      db.collection('posts')
        .doc(this.props.idPost)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comment: comment,
          }),
        })
        .then(() => {
          this.setState({
            comment: '', // Clear the field for a new comment.
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType="default"
          style={styles.input}
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
          placeholder="Enter your comment"
        />

        <TouchableOpacity
          onPress={() => this.createComment(this.state.comment)}
          style={styles.sendButton}
        >
          <Text style={styles.buttonText}>Send Comment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    color: 'rgb(0,0,0)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    backgroundColor: 'rgb(255,255,255)',
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'rgb(255,255,255)',
    padding: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  sendButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgb(0,0,0)',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    color: 'white',
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CommentForm