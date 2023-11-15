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
            comment: '', 
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
          disabled={!this.state.comment.trim()}
        >
          <Text style={styles.buttonText}>Send Comment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    color: 'black',
    borderWidth: 1,
    borderColor: '#9E68F0',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  sendButton: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: '#A3A0FD',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CommentForm;
