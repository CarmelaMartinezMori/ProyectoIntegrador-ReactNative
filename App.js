import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Menu from './src/components/Menu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Register' component= {Register} options ={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
