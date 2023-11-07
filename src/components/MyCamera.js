import React, { Component } from "react";
import { Camera } from 'expo-camera';
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { storage } from "../firebase/config";

class MyCamera extends Component {
    constructor(props) {
        super(props);
        this.state = { permissions: false, photo: '', showCamera: true }
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(res => {
                if (res.granted === true) {
                    this.setState({
                        permissions: true
                    })
                }
            })
            .catch(e => console.log(e))
    }

    takePhoto() {
        this.cameraMethods.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri,
                    showCamera: false
                })
            })
            .catch(e => console.log(e))
    }

    rejectPhoto() {
        this.setState({
            showCamera: true,
        })
    }

    acceptPhoto() {
        fetch(this.state.photo)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photo/${Date.now()}.jpg`)
                ref.put(image)
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => {
                                this.props.onImageUpload(url)
                            }
                            )
                    })
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <>
                {this.state.permissions ?
                    this.state.showCamera ?
                        <View style={styles.formContainer} >
                            <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraMethods => this.cameraMethods = cameraMethods} />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.takePhoto()}
                            >
                                <Text style={styles.textButton}>Take a Photo</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.formContainer}>
                            <Image style={styles.camera} source={{ uri: this.state.photo }} />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.acceptPhoto()}
                            >
                                <Text style={styles.textButton}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.rejectPhoto()}
                            >
                                <Text style={styles.textButton}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    :
                    <Text>You did not grant camera permissions</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: '60vh',
        width: '100vw',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: "blue",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    textButton: {
        color: "#fff",
    },
});

export default MyCamera;
