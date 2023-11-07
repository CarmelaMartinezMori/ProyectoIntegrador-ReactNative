import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.data.data.likes.length,
      isLiked: false,
    };
  }

  componentDidMount() {
    const isLikedByUser = this.props.data.data.likes.includes(auth.currentUser.email);
    if (isLikedByUser) {
      this.setState({ isLiked: true });
    }
  }

  like() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState((prevState) => ({
          isLiked: true,
          likeCount: prevState.likeCount + 1,
        }));
      })
      .catch((error) => console.log(error));
  }

  unlike() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        this.setState((prevState) => ({
          isLiked: false,
          likeCount: prevState.likeCount - 1,
        }));
      })
      .catch((error) => console.log(error));
  }

  deletePost() {
    if (auth.currentUser.email === this.props.data.data.owner) {
      db.collection('posts')
        .doc(this.props.data.id)
        .delete()
        .then(() => {
          console.log('Post deleted');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('UserProfile', {
              email: this.props.data.data.owner,
            })
          }
          style={styles.userButton}
        >
          <Text style={styles.textUser}>{this.props.data.data.owner}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: this.props.data.data.photo }}
          style={styles.img}
        />
        <View style={styles.infoContainer}>
          {this.state.isLiked ? (
            <TouchableOpacity onPress={() => this.unlike()} style={styles.likes}>
              <FontAwesome name="heart" size={24} color="rgb(216, 166, 178)" />
              <Text style={styles.textLikeCount}> {this.state.likeCount} </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.like()} style={styles.likes}>
              <FontAwesome name="heart-o" size={24} color="rgb(216, 166, 178)" />
              <Text style={styles.textLikeCount}> {this.state.likeCount} </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Comments', {
                id: this.props.data.id,
              })
            }
            style={styles.commentButton}
          >
            <FontAwesome name="comment-o" size={24} color="rgb(216, 166, 178)" />
          </TouchableOpacity>
        </View>
        {auth.currentUser.email === this.props.data.data.owner ? (
          <TouchableOpacity onPress={() => this.deletePost()} style={styles.deletePost}>
            <Text style={styles.deletePostText}>
              <FontAwesome name="trash" size={17} color="tomato" /> Delete Post
            </Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.textDescription}>{this.props.data.data.descripcion}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgb(251, 246, 247)',
    margin: 10,
    borderRadius: 20,
  },
  img: {
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  userButton: {
    marginVertical: 15,
    backgroundColor: 'rgb(243, 228, 231)',
    padding: 10,
    borderRadius: 20,
  },
  textUser: {
    color: 'rgb(97, 74, 80)',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  likes: {
    flex: 1,
    flexDirection: 'row',
  },
  textLikeCount: {
    fontSize: 12,
    color: 'rgb(216, 166, 178)',
    paddingTop: 5,
    marginLeft: 5,
  },
  commentButton: {
    margin: 'auto',
  },
  deletePost: {
    marginTop: 10,
    color: 'tomato',
  },
  textDescription: {
    fontSize: 12,
    color: 'rgb(97, 74, 80)',
  },
});
