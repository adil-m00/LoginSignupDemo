import {useContext,useState} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {createUserr} from '../Util/Auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCTX = useContext(AuthContext)
  async function signUpHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await createUserr(email, password);
      authCTX.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication error',
        'you cannot sign up. please check your credentials',
      );
    setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={'Creating user ....'} />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
