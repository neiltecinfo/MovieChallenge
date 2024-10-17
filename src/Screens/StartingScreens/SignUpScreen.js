import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(true);
  const [mobile, setMobile] = useState('');
  const [checkValidMobile, setCheckValidMobile] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmPwd] = useState('');
  const [checkPasswordsMatch, setCheckPasswordsMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = text.trim() === '' || emailRegex.test(text);
    setCheckValidEmail(isValidEmail);
    setEmail(text);
  };

  const validateMobile = text => {
    const mobileRegex = /^[0-9]{10}$/;
    const isValidMobile = text.trim() === '' || mobileRegex.test(text);
    setCheckValidMobile(isValidMobile);
    setMobile(text);
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

  const handleConfirmPwdChange = text => {
    setConfirmPwd(text);
    validatePasswordMatch(password, text);
  };

  const validateForm = () => {
    const isFormValid =
      firstname.trim() !== '' &&
      lastname.trim() !== '' &&
      email.trim() !== '' &&
      checkValidEmail &&
      mobile.trim() !== '' &&
      checkValidMobile &&
      password.trim() !== '' &&
      isPasswordValid &&
      confirmpwd.trim() !== '' &&
      checkPasswordsMatch;
    setIsFormValid(isFormValid);
  };

  const handleSignUp = async () => {
    validateForm();

    if (!isFormValid) {
      Alert.alert(
        'Error',
        'Please fill all the fields correctly and accept the terms and conditions',
      );
      return;
    }

    const userDetails = {
      firstname,
      lastname,
      email,
      mobile,
      password,
    };

    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      Alert.alert(
        'Account Created Successfully!',
        'You can now log in with your credentials',
        // [{text: 'OK', onPress: () => navigation.navigate('VerifyEmail')}],
      );
      console.log('The userDetails are: ', userDetails);
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error saving your details. Please try again.',
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive">
      <View style={{justifyContent: 'space-between'}}>
        <View style={styles.mainView}>
          <View style={styles.titleBox}>
            <Text style={styles.signUpTitleText}>SignUp</Text>
          </View>

          <View style={styles.boxesAndButtonView}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstname}
              onChangeText={setFirstName}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastname}
              onChangeText={setLastName}
            />

            <TextInput
              style={[
                styles.input,
                !checkValidEmail && email.trim() !== '' && styles.errorInput,
              ]}
              placeholder="Email Id"
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
            />
            {!checkValidEmail && email.trim() !== '' && (
              <Text style={styles.errorText}>
                Please enter a valid email address
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                !checkValidMobile && mobile.trim() !== '' && styles.errorInput,
              ]}
              placeholder="Phone Number"
              value={mobile}
              onChangeText={validateMobile}
              keyboardType="numeric"
              maxLength={10}
            />
            {!checkValidMobile && mobile.trim() !== '' && (
              <Text style={styles.errorText}>
                Please enter a valid mobile number
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                !isPasswordValid &&
                  password.trim().length < 8 &&
                  styles.errorInput,
                password.trim() === '' && styles.emptyInput,
              ]}
              placeholder="Create Password"
              value={password}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
            {!isPasswordValid &&
              password.trim().length < 8 &&
              password.trim() !== '' && (
                <Text style={styles.errorText}>
                  Password must be at least 8 characters long
                </Text>
              )}

            <TextInput
              style={[
                styles.input,
                !checkPasswordsMatch &&
                  confirmpwd.trim() !== '' &&
                  styles.errorInput,
              ]}
              placeholder="Re-enter Password"
              value={confirmpwd}
              secureTextEntry={true}
              onChangeText={handleConfirmPwdChange}
            />
            {!checkPasswordsMatch && confirmpwd.trim() !== '' && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}>
                <Text style={styles.signUptext}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{height: 150, backgroundColor: '#FFF'}} />

        <View style={styles.navigateToSignInView}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={{marginLeft: 3}}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signInHereText}>Sign In Here</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 50, backgroundColor: '#FFF'}} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFF',
  },
  signUptext: {
    color: '#FFF',
    fontWeight: '700',
  },
  signInHereText: {
    color: '#175c11',
    fontWeight: '600',
  },
  navigateToSignInView: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signUpButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#175c11',
    borderRadius: 5,
    marginBottom: 20,
  },
  boxesAndButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    padding: 5,
    marginTop: 10,
    flex: 1,
    marginVertical: 40,
  },
  signUpTitleText: {
    color: '#175c11',
    fontSize: 20,
    fontWeight: '600',
  },
  emptyInput: {
    borderWidth: 0,
  },
  fieldDetailsBox: {
    // marginBottom: 25,
    borderWidth: 0,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#bfe8bc',
  },
  input: {
    paddingHorizontal: 15,
    backgroundColor: '#bfe8bc',
    borderRadius: 7,
    marginLeft: '10%',
    marginRight: '10%',
    shadowColor: '#000',
    elevation: 4,
    marginBottom: '5%',
    color: '#000',
    width: '80%',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
    width: '80%',
  },
  errorText: {
    color: 'red',
    marginTop: -19,
    marginBottom: 15,
  },
});
