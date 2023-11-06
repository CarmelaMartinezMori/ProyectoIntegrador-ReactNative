import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import PostForm from "./PostForm";
import User from "../screens/User";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Add Post" component={PostForm}/>
            <Tab.Screen name="User" component={User}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;