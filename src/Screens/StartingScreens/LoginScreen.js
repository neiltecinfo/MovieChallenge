import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../Context/AuthenticationContext';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmPwd] = useState('');
  const [checkPasswordsMatch, setCheckPasswordsMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(true);

  const {isLogin, setIsLogin} = useAuthContext();

  useEffect(() => {
    const getUser = async () => {
      const userDetails = await AsyncStorage.getItem('userDetails');
      console.log('UserDetails', userDetails);
      const parsedUserDetails123 = JSON.parse(userDetails);
      console.log(
        'parsedUserDetails123 in LoginScreen: ',
        parsedUserDetails123,
      );
    };
    getUser();
  }, []);

  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = text.trim() === '' || emailRegex.test(text);
    setCheckValidEmail(isValidEmail);
    setEmail(text);
  };

  const validatePasswordMatch = (password, confirmpwd) => {
    const passwordsMatch = password === confirmpwd;
    setCheckPasswordsMatch(passwordsMatch);
  };

  const handlePasswordChange = text => {
    setPassword(text);
    validatePasswordMatch(text, confirmpwd);
    const isValidPasswordLength = /^(?=.{8,})/.test(text);
    setIsPasswordValid(isValidPasswordLength);
  };

  const handleSignIn = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      console.log('The correct UserDetails in Signin Screen are', userDetails);
      if (userDetails) {
        const parsedUserDetails = JSON.parse(userDetails);
        console.log('The parsed user details are: ', parsedUserDetails);
        if (
          parsedUserDetails &&
          parsedUserDetails?.email &&
          parsedUserDetails?.password
        ) {
          if (
            email === parsedUserDetails.email &&
            password === parsedUserDetails.password
          ) {
            console.log('EMAIL HAS BEEN VERIFIED!!!!');
            // console.log('isLogin in SignInScreen is', isLogin);
            setIsLogin(true);
            console.log('The user details are: ', userDetails);
            console.log('The parsed user details are: ', parsedUserDetails);
            await AsyncStorage.setItem('keepLoggedIn', 'true');
            const loginState = await AsyncStorage.getItem('keepLoggedIn');
            console.log('the login state is ', loginState);
            console.log('The email is: ', parsedUserDetails.email);
            // navigation.navigate('NonAuthScreens', {screen: 'MainDrawer'});
            setEmail('');
            setPassword('');
            navigation.navigate('NonAuthScreens', {
              screen: 'BottomTabNavigator',
            });
            // https://reactnavigation.org/docs/params/
            // Refer to this link
          } else {
            Alert.alert(
              'Invalid Credentials',
              'Please enter correct email and password.',
            );
          }
        }
      }
    } catch (error) {
      console.error('Error while signing in:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.signInTextView}>
        <Text style={styles.signInTextTitle}>Sign In</Text>
      </View>

      <View style={styles.bodyView}>
        <TextInput
          style={[
            styles.input,
            !checkValidEmail && email.trim() !== '' && styles.errorInput,
          ]}
          placeholder="Email"
          value={email}
          onChangeText={validateEmail}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="grey"
        />
        {!checkValidEmail && email.trim() !== '' && (
          <Text style={styles.errorText}>
            Please enter a valid email address
          </Text>
        )}

        <TextInput
          style={[
            styles.input,
            !isPasswordValid && password.trim().length < 8 && styles.errorInput,
            password.trim() === '' && styles.emptyInput,
          ]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="grey"
        />
        {!isPasswordValid &&
          password.trim().length < 8 &&
          password.trim() !== '' && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters long
            </Text>
          )}
        {/* </View> */}

        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpTextViewOuterBox}>
        <View style={styles.signUpTextViewInnerBox}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpLinkText}>Sign Up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loginButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#175c11',
    borderRadius: 5,
  },
  signUpTextViewOuterBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#FFF',
    fontWeight: '700',
  },
  signUpTextViewInnerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpLinkText: {
    color: '#175c11',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: -20,
    marginBottom: 10,
  },
  bodyView: {
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInTextTitle: {
    color: '#175c11',
    fontSize: 20,
    fontWeight: '600',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  emptyInput: {
    borderWidth: 0,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 7,
    backgroundColor: '#afe0ab',
    shadowColor: '#000',
    elevation: 4,
    color: 'black',
    width: '70%',
    marginBottom: 20,
  },
});
