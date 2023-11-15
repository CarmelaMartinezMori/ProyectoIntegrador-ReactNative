import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.data.data.likes.length,
      isLiked: false,
      isModalVisible: false, 
    };
  }

  componentDidMount() {
    const isLikedByUser = this.props.data.data.likes.includes(
      auth.currentUser.email
    );
    if (isLikedByUser) {
      this.setState({ isLiked: true });
    }
  }

  like() {
    db.collection("posts")
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
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState((prevState) => ({
          isLiked: false,
          likeCount: prevState.likeCount - 1,
        }));
      })
      .catch((error) => console.log(error));
  }

  confirmDeletePost() {
    this.setState({ isModalVisible: true });  
  }

  deletePost() {
    const { id } = this.props.data;
    if (auth.currentUser.email !== this.props.data.data.owner) {
      return;
    }
    db.collection('posts').doc(id).delete();
    this.setState({ isModalVisible: false });  
  }
  

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("UsersProfile", {
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
            <TouchableOpacity
              onPress={() => this.unlike()}
              style={styles.likes}
            >
              <FontAwesome name="heart" size={24} color="rgb(216, 166, 178)" />
              <Text style={styles.textLikeCount}> {this.state.likeCount} </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.like()} style={styles.likes}>
              <FontAwesome
                name="heart-o"
                size={24}
                color="rgb(216, 166, 178)"
              />
              <Text style={styles.textLikeCount}> {this.state.likeCount} </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation?.navigate("Comments", {
                id: this.props.data.id,
              })
            }
            style={styles.commentButton}
          >
            <FontAwesome
              name="comment-o"
              size={24}
              color="rgb(216, 166, 178)"
            />
          </TouchableOpacity>
          <FlatList
            data={this.props.data.data.comments.slice(0, 4)} // Mostrar solo los últimos 4 comentarios
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentUser}>{item.owner}</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            )}
          />
        </View>
        {auth.currentUser.email === this.props.data.data.owner && (
          <TouchableOpacity onPress={() => this.confirmDeletePost()} style={styles.deletePost}>
            <Text style={styles.deletePostText}>
              <FontAwesome name="trash" size={17} color="tomato" /> Delete Post
            </Text>
          </TouchableOpacity>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this post?
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={() => {
                  this.deletePost();
                }}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text style={styles.textDescription}>
          {this.props.data.data.descripcion}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "rgb(251, 246, 247)",
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
    backgroundColor: "rgb(243, 228, 231)",
    padding: 10,
    borderRadius: 20,
  },
  textUser: {
    color: "rgb(97, 74, 80)",
    fontSize: 15,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
  },
  likes: {
    flex: 1,
    flexDirection: "row",
  },
  textLikeCount: {
    fontSize: 12,
    color: "rgb(216, 166, 178)",
    paddingTop: 5,
    marginLeft: 5,
  },
  commentButton: {
    margin: "auto",
  },
  deletePost: {
    marginTop: 10,
    color: "tomato",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "grey",
  },
  deleteButton: {
    backgroundColor: "tomato",
  },
  textDescription: {
    fontSize: 12,
    color: "rgb(97, 74, 80)",
  },
});
