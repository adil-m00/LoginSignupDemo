import { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar,Image,TouchableOpacity} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
// import IconButton from './components/ui/IconButton';
import {Colors} from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCTX = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight:({tintColor}) => <TouchableOpacity onPress={authCTX.logout}><Image source={require('./assets/logout.png')} color={tintColor} style={{width:24,height:24}} /></TouchableOpacity>
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const contCTX = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!contCTX.isAuthenticated && <AuthStack />}
      {contCTX.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
