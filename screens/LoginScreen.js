import {useContext,useState} from 'react';
import {Alert} from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import {createUserr, login} from '../Util/Auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCTX = useContext(AuthContext)

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      console.log("tokens",token)
      authCTX.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication error',
        'you cannot logged in. please check your credentials',
      );
    setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={'logging user ....'} />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
