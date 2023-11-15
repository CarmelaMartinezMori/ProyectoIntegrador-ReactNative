import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { auth, db, storage } from "../firebase/config";
import * as ImagePicker from "expo-image-picker";
import Loader from "./Loader"; 

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      bio: "",
      profileImage: "",
      error: "",
      loading: false, 
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Menu");
      }
    });
  }

  handleRegister() {
    const { email, password, username, bio, profileImage } = this.state;

    if (email === "" || password === "" || username === "") {
      this.setState({
        error: "Email, password, and username are mandatory fields",
      });
      return;
    }

    this.setState({ loading: true });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        fetch(this.state.profileImage)
          .then((resp) => resp.blob())
          .then((imagen) => {
            let ref = storage.ref(`photo/${Date.now()}.jpeg`);
            ref.put(imagen).then(() => {
              ref.getDownloadURL().then((url) => {
                console.log("URL de la foto:", url);
                this.setState({ profileImage: url }, () => {
                  db.collection("users")
                    .add({
                      owner: auth.currentUser.email,
                      bio: this.state.bio,
                      username: this.state.username,
                      profileImage: this.state.profileImage,
                      createdAt: new Date(),
                    })
                    .then(() => {
                      this.props.navigation.navigate("Login");
                    })
                    .catch((error) => {
                      this.setState({ error: error.message, loading: false }); 
                    });
                });
              });
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false }); 
      });
  }

  activarPicker() {
    ImagePicker.launchImageLibraryAsync()
      .then((imageData) => this.setState({ profileImage: imageData.assets[0].uri }))
      .catch((err) => console.log(err));
  }

  rechazarImagen() {
    this.setState({ profileImage: "" });
  }

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Type in a bio"
          keyboardType="default"
          onChangeText={(text) => this.setState({ bio: text })}
          value={this.state.bio}
        />

        {this.state.profileImage !== "" ? (
          <>
            <Image
              source={{ uri: this.state.profileImage }}
              style={styles.img}
            />
            <TouchableOpacity onPress={() => this.aceptarImagen()}>
              <Text>Aceptar imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.rechazarImagen()}>
              <Text>Rechazar imagen</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text>Carga a una foto para tu perfil</Text>
            <TouchableOpacity onPress={() => this.activarPicker()}>
              <Text>Cargar imagen de mi libreria</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.error}>{this.state.error}</Text>

        {this.state.loading ? (
          <Loader />
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.handleRegister()}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    color: "black",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#9E68F0",
    marginTop: 10,
    height: 40,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  btn: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#A3A0FD",
    margin: 10,
    color: "black",
    padding: 10,
    textAlign: "center",
    borderRadius: 8,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default RegisterForm;
