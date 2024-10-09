import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const Watchlist = () => {
  const watchlistMovies = useSelector(state => state.tasks.watchlistMovies);
  const navigation = useNavigation();
  const renderItem1 = ({item}) => {
    return (
      <TouchableOpacity>
        <View
          style={styles.buttonView}>
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
        <Text style={styles.headerText}>Watchlist Movies</Text>
      </View>

      <View style={styles.listView}>
        {watchlistMovies.length > 0 ? (
          <FlatList
            data={watchlistMovies}
            keyExtractor={item => item.id}
            renderItem={renderItem1}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Watchlist Movies movies added</Text>
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

export default Watchlist;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  goToHomeButton:{
    borderWidth:1,
    padding: 5,

  },
  checkBoxView:{
    width: '15%',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameView:{
    marginBottom: 10,
    marginRight: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: 250,
  },
  list: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
  },
  outerIconInnerIconStyle: {
    borderColor: 'red',
    borderRadius: 8,
    borderWidth: 1,
  },
  addToListButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderWidth: 1,
    padding: 4,
    backgroundColor: 'green',
    marginBottom: 5,
  },
  addToFavButton: {
    position: 'absolute',
    bottom: 60,
    right: 16,
    borderWidth: 1,
    padding: 4,
    backgroundColor: 'green',
    marginBottom: 5,
  },

  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
