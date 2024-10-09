import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthContext} from '../../Context/AuthenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const {isLogin, setIsLogin} = useAuthContext();
  const [parsedUserDetails, setParsedUserDetails] = useState('');

  const clearAll = async () => {
    try {
      await AsyncStorage.setItem('keepLoggedIn', 'false');
      setIsLogin(false);
      console.log('isLogin in clearAll function of drawer is', isLogin);
      console.log(
        'isLogin in clearAll function of drawer is now(after updating)',
        isLogin,
      );
    } catch (e) {
      console.log('error during logout ', e);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        console.log('userDetails in Profile Screen : ', userDetails);
        const parsedDetails = JSON.parse(userDetails);
        setParsedUserDetails(parsedDetails);
      } catch (error) {
        console.log('Error fetching details from Async Storage');
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    console.log('parsedUserDetails will be displayed now');
    console.log(parsedUserDetails.firstname);
    console.log(parsedUserDetails.lastname);
    console.log(parsedUserDetails.email);
    console.log(parsedUserDetails.mobile);
    console.log(parsedUserDetails.password);
  }, [parsedUserDetails]);

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.itemRow}>
        <Text>First Name</Text>
        <Text>{parsedUserDetails.firstname}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text>Last Name</Text>
        <Text>{parsedUserDetails.lastname}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text>Email</Text>
        <Text>{parsedUserDetails.email}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text>Mobile</Text>
        <Text>{parsedUserDetails.mobile}</Text>
      </View>

      <View style={styles.logOutView}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => clearAll()}>
          <Text style={styles.logOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  itemRow: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10
  },
  mainView:{
    backgroundColor:"#FFF",
    flex: 1
  },
  logOutText:{
    fontSize: 15,
    color: '#FFF',
    fontWeight:'700'
  },
  loginButton:{
    borderWidth: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#175c11',
  },
  logOutView:{
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 25
  },
});
