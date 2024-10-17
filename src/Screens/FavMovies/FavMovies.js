import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {removeFavoriteMovies} from '../../Redux/TaskSlice';

const FavMovies = () => {
  const favoriteMovies = useSelector(state => state.tasks.favoriteMovies); 
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCheckedStatus, setItemCheckedStatus] = useState({});

  const [isMainCheckboxSelected, setIsMainCheckboxSelected] = useState(false);

  useEffect(() => {
    const initialStatus = {};
    favoriteMovies.forEach(movie => {
      initialStatus[movie.id] = false; 
    });
    setItemCheckedStatus(initialStatus);
    setIsMainCheckboxSelected(false);
  }, [favoriteMovies]);

  const renderItem1 = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.buttonView}>
          <View style={styles.checkBoxView}>
            <BouncyCheckbox
              size={25}
              fillColor="#175c11"
              unFillColor="#FFFFFF"
              iconStyle={styles.outerIconInnerIconStyle}
              innerIconStyle={styles.outerIconInnerIconStyle}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              onPress={isChecked => handleCheckboxPress(item, isChecked)}
              isChecked={itemCheckedStatus[item.title]}
            />
          </View>
          <View style={styles.itemNameView}>
            <Text>{item.original_title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const deleteItem = () => {
    console.log('Start deleting items');
    // Alert.alert("number of items selected: ", selectedItems)
    if (selectedItems.length === 0) {
      Alert.alert('No items have been selected for delete');
    } else {
      dispatch(removeFavoriteMovies(selectedItems.map(item => item.id)));
      setSelectedItems([]);
    }
  };

  const handleCheckboxPress = (item, isChecked) => {
    setItemCheckedStatus(prevStatus => ({
      ...prevStatus,
      [item.id]: isChecked,
    }));

    // Update the selectedItems array based on the checked status
    if (isChecked) {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
    } else {
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(i => i.id !== item.id),
      );
    }
  };

  const handleAllBoxes = isChecked => {
    setIsMainCheckboxSelected(isChecked);

    const updatedStatus = {};
    favoriteMovies.forEach(item => {
      updatedStatus[item.title] = isChecked;
    });

    setItemCheckedStatus(updatedStatus);

    if (isChecked) {
      setSelectedItems(favoriteMovies);
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    // console.log('The array of selected items in Favourites is ', selectedItems);
    console.log(
      'The number of selected items in Favourites is ',
      selectedItems.length,
    );
  }, [selectedItems]);

  return (
    <>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Favourite Movies</Text>
      </View>

      {favoriteMovies.length > 0 ? (
        <>
          <View style={{marginBottom: 15}}>
            <BouncyCheckbox
              size={25}
              fillColor="#175c11"
              unFillColor="#FFFFFF"
              iconStyle={styles.outerIconInnerIconStyle}
              innerIconStyle={styles.outerIconInnerIconStyle}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              // onPress={isChecked => handleCheckboxPress(isChecked, item)}
              // isChecked={itemCheckedStatus[item.title]}
              isChecked={isMainCheckboxSelected}
              onPress={isChecked => {
                handleAllBoxes(isChecked);
                setIsMainCheckboxSelected(isChecked); // Update main checkbox state
              }}
            />
          </View>
          <FlatList
            data={favoriteMovies}
            keyExtractor={item => item.id}
            renderItem={renderItem1}
          />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>NO MOVIES ADDED TO FAVOURITES</Text>
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
    </>
  );
};

export default FavMovies;

const styles = StyleSheet.create({
  checkBoxView: {
    width: '15%',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderWidth: 1,
    padding: 10,
  },
  goToHomeButton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  itemNameView: {
    marginBottom: 10,
    marginLeft: 10,
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
    borderColor: '#175c11',
    borderRadius: 8,
    borderWidth: 1,
  },
});
