import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import {removeWatchlistMovies} from '../../Redux/TaskSlice';
import {useDispatch} from 'react-redux';

const Watchlist = () => {
  const watchlistMovies = useSelector(state => state.tasks.watchlistMovies);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCheckedStatus, setItemCheckedStatus] = useState({});

  const renderItem1 = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.buttonView}>
          <View style={styles.checkBoxView}>
            <BouncyCheckbox
              size={25}
              fillColor="#175c11"
              unFillColor="#FFFFFF"
              // text="Custom Checkbox"
              iconStyle={styles.outerIconInnerIconStyle}
              innerIconStyle={styles.outerIconInnerIconStyle}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              // onPress={isChecked => handleCheckboxPress(isChecked, item)}
              // isChecked={itemCheckedStatus[item.name]}
              onPress={isChecked => handleCheckboxPress(item, isChecked)}
            />
          </View>
          <View style={styles.itemNameView}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const deleteItem = () => {
    console.log('Start deleting items');
    if (selectedItems.length == 0) {
      Alert.alert('No items have been selected for delete');
    } else {
      dispatch(removeWatchlistMovies(selectedItems.map(item => item.id)));
      setSelectedItems([]);
    }
  };

  const handleCheckboxPress = (item, isChecked) => {
    setItemCheckedStatus(prevStatus => ({
      ...prevStatus,
      [item.name]: isChecked,
    }));

    // Update the selectedItems array based on the checked status
    if (isChecked) {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
    } else {
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(i => i.name !== item.name),
      );
    }
  };

  useEffect(() => {
    console.log('The array of selected items is ', selectedItems);
    console.log('The number of selected items is ', selectedItems.length);
  }, [selectedItems]);

  return (
    <>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Watchlist Movies</Text>
      </View>

      <View style={styles.listView}>
        {watchlistMovies.length > 0 ? (
          <>
            <FlatList
              data={watchlistMovies}
              keyExtractor={item => item.id}
              renderItem={renderItem1}
            />
            <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>NO MOVIES ADDED TO WATCHLIST</Text>
            <View>
              <TouchableOpacity
                style={styles.goToHomeButton}
                onPress={() =>
                  navigation.navigate('NonAuthScreens', {
                    screen: 'BottomTabNavigator',
                    params: {
                      screen: 'Home',
                    },
                  })
                }>
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
  goToHomeButton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderWidth: 1,
    padding: 10,
  },
  checkBoxView: {
    width: '15%',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameView: {
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
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
  },
  outerIconInnerIconStyle: {
    borderColor: '#175c11',
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
