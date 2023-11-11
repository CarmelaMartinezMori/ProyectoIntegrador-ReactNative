import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Comments from '../screens/Comments';
import UsersProfile from '../screens/UsersProfile';


const Stack = createNativeStackNavigator();

function Functionalities() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsersProfile"
        component={UsersProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Functionalities;
