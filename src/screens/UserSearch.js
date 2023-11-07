import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: [],
      usersBackup: [],
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let userArray = [];
      docs.forEach((doc) => {
        userArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        users: userArray,
        usersBackup: userArray,
      });
    });
  }

  filterUsers(text) {
    let filteredUsers = this.state.usersBackup.filter(
      (user) => user.data.owner.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ users: filteredUsers });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={(text) => this.filterUsers(text)}
          />
        </View>
        <FlatList
          style={styles.flatListContainer}
          data={this.state.users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UserProfile', {
                  email: item.data.owner,
                })
              }
            >
              <Text>{item.data.owner}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(251, 246, 247)',
  },
  flatListContainer: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: 'rgb(229, 209, 218)',
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    height: 35,
    padding: 5,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
  },
});


export default UserSearch