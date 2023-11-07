import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PostForm from "../screens/PostForm";
import User from "../screens/User";
import Home from "../screens/Home";
import UserSearch from "../screens/UserSearch";

const Tab = createBottomTabNavigator();

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="home" size={24} />,
          }}
        />
        <Tab.Screen
          name="Add Post"
          component={PostForm}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="pluscircleo" size={24} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={UserSearch}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons name="search-outline" size={24} />,
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="user" size={24} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Menu;
