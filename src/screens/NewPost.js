import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';
import { db, auth } from '../firebase/config';
import MyCamera from '../components/MyCamera';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      photo: '',
      likes: [],
      comments: []
    };
  }

  handleImageUpload(url) {
    // Handle the image URL here, e.g., save it to state or perform any necessary actions.
    console.log('Image uploaded:', url);

    // Set the photo URL in the state
    this.setState({
      photo: url
    });
  }

  updateDescription(text) {
    this.setState({
      description: text
    });
  }

  createPost({ description, photo, likes, comments }) {
    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        description: description,
        photo: photo,
        createdAt: Date.now(),
        likes: likes,
        comments: comments,
      })
      .then(() => {
        this.setState({
          description: '',
          photo: '',
          likes: [],
          comments: []
        });
        this.props.navigation.navigate('Home');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.photo === '' ? (
          <MyCamera onImageUpload={(url) => this.handleImageUpload(url)} />
        ) : (
          <View>
            <PostForm
              description={this.state.description}
              updateDescription={(text) => this.updateDescription(text)}
            />
            <TouchableOpacity
              style={styles.showCamera}
              onPress={() =>
                this.createPost({
                  description: this.state.description,
                  photo: this.state.photo,
                  likes: this.state.likes,
                  comments: this.state.comments
                })
              }
            >
              <Text style={styles.send}>Send Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  showCamera: {
    backgroundColor: '#B5AACC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default NewPost;
