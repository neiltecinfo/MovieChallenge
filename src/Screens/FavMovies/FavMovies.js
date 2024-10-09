import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux'; // Import useSelector to access state
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const FavMovies = () => {
  const favoriteMovies = useSelector(state => state.tasks.favoriteMovies); // Access favorite movies from the store
  const navigation = useNavigation();
  const renderItem1 = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.buttonView}>
          <View
            style={styles.checkBoxView}>
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unFillColor="#FFFFFF"
              // text="Custom Checkbox"
              iconStyle={styles.outerIconInnerIconStyle}
              innerIconStyle={styles.outerIconInnerIconStyle}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              // onPress={isChecked => handleCheckboxPress(isChecked, item)}
              // isChecked={itemCheckedStatus[item.name]}
            />
          </View>
          <View
            style={styles.itemNameView}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Favourite Movies</Text>
      </View>
      <View style={styles.listView}>
        {favoriteMovies.length > 0 ? (
          <FlatList
            data={favoriteMovies}
            keyExtractor={item => item.id}
            renderItem={renderItem1}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>No favorite movies selected</Text>
            <View>
              <TouchableOpacity style={styles.goToHomeButton} 
              onPress={() => navigation.navigate('NonAuthScreens', {
                screen: 'BottomTabNavigator',
                params: {
                  screen: "Home"
                }
              })}
              >
                <Text>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default FavMovies;

const styles = StyleSheet.create({
  checkBoxView:{
    width: '15%',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goToHomeButton:{
    borderWidth:1,
    padding: 5,

  },
  itemNameView:{
    marginBottom: 10,
    marginRight: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: 250,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
  },
  outerIconInnerIconStyle: {
    borderColor: 'red',
    borderRadius: 8,
    borderWidth: 1,
  },
});
