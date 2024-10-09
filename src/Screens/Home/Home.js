import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch} from 'react-redux';
import {addFavoriteMovies} from '../../Redux/TaskSlice';
import {addWatchlistMovies} from '../../Redux/TaskSlice';
import {useNavigation} from '@react-navigation/native';

import Modal from 'react-native-modal';
import FilterIcon from '../../Assets/FilterIcon.svg';

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [sortedMovies, setSortedMovies] = useState(null); // State for sorted movies
  const [loading, setLoading] = useState(false);
  const [checked, isChecked] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [itemCheckedStatus, setItemCheckedStatus] = useState({});
  const [isCheckedState, setIsCheckedState] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);
  const [searchMovie, setSearchMovie] = useState(null);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterButtonPress, setFilterButtonPress] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const apiURL =
    'https://api.themoviedb.org/3/movie/157336/videos?api_key=5bc7f5159e062208692dcd27aaa15e6b';

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiURL);
      const data = response.data;
      setMovies(data.results);
      setSortedMovies(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setFilterModalVisible(false);
  };

  const handleSort = sortType => {
    setFilterModalVisible(false);

    switch (sortType) {
      case 'alphabetical':
        const sorted = [...movies].sort((a, b) => a.name.localeCompare(b.name));
        setSortedMovies(sorted);
        break;

      case 'reverseAlphabetical':
        const sorted1 = [...movies].sort((a, b) =>
          b.name.localeCompare(a.name),
        );
        setSortedMovies(sorted1);
        break;

      default:
        console.log('Invalid sort type');
    }
  };

  const chooseSortOption = () => {
    console.log('Modal');
    setFilterModalVisible(true);
    setFilterButtonPress(true);
  };

  // const filteredMovies = movies?.filter(movie =>
  //   movie.name.toLowerCase().includes(searchMovie.toLowerCase())
  // );

  const filteredMovies = sortedMovies?.filter(movie =>
    movie.name.toLowerCase().includes((searchMovie || '').toLowerCase()),
  );
  // const filteredMovies = movies?.filter(movie =>
  //   movie.name.toLowerCase().includes((searchMovie || '').toLowerCase())
  // );

  const handleCheckboxPress = (isChecked, item) => {
    setIsCheckedState(isChecked);
    setItemCheckedStatus(prevStatus => ({
      ...prevStatus,
      [item.site]: isChecked,
    }));

    if (isChecked) {
      setSelectedItems(prevItems => [...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    }
  };

  const isAnyItemSelected = selectedItems.length > 0;

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddToFav = () => {
    dispatch(addFavoriteMovies(selectedItems)); // Dispatch the selected movies to the store
  };

  const handleAddToWatchlist = () => {
    dispatch(addWatchlistMovies(selectedItems));
  };

  const handleItemPress = item => {
    navigation.navigate('NonAuthScreens', {
      screen: 'Details',
      params: {item},
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleItemPress(item)}>
        <View style={styles.checkBox}>
          <BouncyCheckbox
            size={25}
            fillColor="red"
            unFillColor="#FFFFFF"
            iconStyle={styles.outerIconInnerIconStyle}
            innerIconStyle={styles.outerIconInnerIconStyle}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={isChecked => handleCheckboxPress(isChecked, item)}
            isChecked={itemCheckedStatus[item.name]}
          />
        </View>
        <Text style={styles.itemNameText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.headerText}>
        Movies
      </Text>

      <TextInput
        placeholder="Search Movies"
        style={styles.searchBoxStyles}
        onChangeText={text => setSearchMovie(text)}
        value={searchMovie}
      />

      {/* const [searchMovie, setSearchMovie] = useState(null) */}

      <TouchableOpacity style={styles.filterButton} onPress={chooseSortOption}>
        <Text>Select Filter</Text>
        <FilterIcon width={25} height={25} />
      </TouchableOpacity>

      <View>
        <Text> </Text>
        <Text> </Text>
      </View>

      <FlatList
        // data={movies}
        data={filteredMovies}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      {isAnyItemSelected && (
        <View>
          <TouchableOpacity
            style={styles.addToFavButton}
            onPress={handleAddToFav}>
            <Text style={{color: '#FFF'}}>Add to Fav</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToListButton}
            onPress={handleAddToWatchlist}>
            <Text style={{color: '#FFF'}}>Add to Watchlist</Text>
          </TouchableOpacity>
        </View>
      )}

      {filterButtonPress && (
        <Modal
          isVisible={filterModalVisible}
          onBackdropPress={handleCloseModal}
          onSwipeComplete={handleCloseModal}
          swipeDirection="down"
          style={styles.modal}>
          <View style={{backgroundColor: '#FFF'}}>
            <TouchableOpacity
              style={styles.modalButtons}
              onPress={() => handleSort('reverseAlphabetical')}>
              <Text>Reverse Alphabetical (Z - A)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtons}
              onPress={() => handleSort('alphabetical')}>
              <Text>Alphabetical (A - Z)</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerText: {
    fontSize: 25,
    textAlign:"center",
    marginBottom: 10
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  itemNameText: {
    flexWrap: 'wrap',
    maxWidth: 190,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
  },
  searchBoxStyles: {
    borderWidth: 1,
    paddingVertical: 0,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  listItem: {
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  filterButton: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtons: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
  },
  list: {
    flexDirection: 'row',
    paddingLeft: 10,
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
});
