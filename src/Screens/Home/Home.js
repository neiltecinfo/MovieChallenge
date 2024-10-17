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
import StarIcon from '../../Assets/StarIcon.svg';
import Modal from 'react-native-modal';
import FilterIcon from '../../Assets/FilterIcon.svg';

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCheckedStatus, setItemCheckedStatus] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortedMovies, setSortedMovies] = useState(null); 
  const [isMainCheckboxSelected, setIsMainCheckboxSelected] = useState(false);


  const [isCheckedState, setIsCheckedState] = useState(false);
  const [searchMovie, setSearchMovie] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterButtonPress, setFilterButtonPress] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const apiURL =
  //   'https://api.themoviedb.org/3/movie/157336/videos?api_key=5bc7f5159e062208692dcd27aaa15e6b';

  const apiURL =
    'https://api.themoviedb.org/3/discover/movie?api_key=5bc7f5159e062208692dcd27aaa15e6b';

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

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleCloseModal = () => {
    setFilterModalVisible(false);
  };

  const filteredMovies = sortedMovies?.filter(movie =>
    movie.title.toLowerCase().includes((searchMovie || '').toLowerCase()),
  );

  const handleSort = sortType => {
    let sortedData;
    const preSortedCheckedStatus = {...itemCheckedStatus};

    switch (sortType) {
      case 'alphabetical':
        sortedData = sortedMovies.sort((a, b) =>
          a.original_title.localeCompare(b.original_title),
        );
        break;
      case 'reverseAlphabetical':
        sortedData = sortedMovies.sort((b, a) =>
          a.original_title.localeCompare(b.original_title),
        );
        break;
      case 'highesttolowestrating':
        sortedData = sortedMovies.sort((b, a) => a.vote_average - b.vote_average);
        break;
      case 'lowesttohighestrating':
        sortedData = sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
        break;
      default:
        console.log('Invalid sort type');
    }
    setSortedMovies(sortedData);

    const updatedStatus = {};
    sortedData.forEach(item => {
      updatedStatus[item.id] = preSortedCheckedStatus[item.id];
    });
    console.log('updatedStatus: ', updatedStatus);
    // if (isMainCheckboxSelected) {
    //   sortedData.forEach(item => {
    //     updatedStatus[item.title] = itemCheckedStatus[item.title];
    //   });
    // }
    setItemCheckedStatus(updatedStatus);
    setFilterModalVisible(false);
  };



  const convertDate = date => {
    // conver date here
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const [year, month, day] = date.split('-');
    const formattedDate = `${parseInt(day)} ${
      months[parseInt(month) - 1]
    }, ${year}`;
    return formattedDate;
  };

  const chooseSortOption = () => {
    console.log('Modal');
    setFilterModalVisible(true);
    setFilterButtonPress(true);
  };

  const handleCheckboxPress = (item, isChecked) => {
    setItemCheckedStatus(prevStatus => ({
      ...prevStatus,
      [item.id]: isChecked,
    }));

    if (isChecked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    }
  };



  // const handleCheckboxPress = (item, isChecked) => {
  //   setItemCheckedStatus(prevStatus => ({
  //     ...prevStatus,
  //     [item.symbol]: isChecked,
  //   }));
  //   if (isChecked) {
  //     setSelectedItems([...selectedItems, item]);
  //   } else {
  //     setSelectedItems(selectedItems.filter(i => i.symbol !== item.symbol));
  //   }
  // };

  const isAnyItemSelected = selectedItems.length > 0;

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


  const handleAllBoxes = isChecked => {
    setIsMainCheckboxSelected(isChecked);
  
    const updatedStatus = {};
    const updatedSelectedItems = [];
  
    // Iterate through all movies and update their checked status
    movies.forEach(item => {
      updatedStatus[item.id] = isChecked; // Update the checkbox status for each item
      if (isChecked) {
        updatedSelectedItems.push(item); // Add to selected items if checked
      }
    });
  
    setItemCheckedStatus(updatedStatus); // Update state for individual item checkboxes
    setSelectedItems(isChecked ? updatedSelectedItems : []); // Update selected items list
  };
  

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleItemPress(item)}>
        <View style={styles.checkBox}>
          <BouncyCheckbox
            size={25}
            fillColor="#175c11"
            unFillColor="#FFFFFF"
            iconStyle={styles.outerIconInnerIconStyle}
            innerIconStyle={styles.outerIconInnerIconStyle}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={isChecked => handleCheckboxPress(item, isChecked)}
            // isChecked={itemCheckedStatus[item.id]} 
            isChecked={itemCheckedStatus[item.id || false]} 
          />
        </View>
        <View style={{flex: 1}}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}`,
            }}
          />
          <View style={styles.movieDetails}>
            <Text style={styles.itemText}>{item.title}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemText}>{item.vote_average}</Text>
                <StarIcon width={20} height={20} />
              </View>
              <Text style={styles.itemText}>Average Vote</Text>
            </View>
          </View>
          <View style={styles.movieDetails}>
            <Text style={styles.itemText}>Released on</Text>
            <Text style={styles.itemText}>
              {convertDate(item.release_date)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.headerText}>Movies</Text>

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

      <View style={{marginLeft: 20, marginBottom: 15}}>
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
        // data={filteredMovies}
        data={sortedMovies}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 150}} />}
      />
      {isAnyItemSelected && (
        <View>
          <TouchableOpacity
            style={styles.addToFavButton}
            onPress={handleAddToFav}>
            <Text style={styles.buttonText}>Add to Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToListButton}
            onPress={handleAddToWatchlist}>
            <Text style={styles.buttonText}>Add to Watchlist</Text>
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
            <TouchableOpacity
              style={styles.modalButtons}
              onPress={() => handleSort('highesttolowestrating')}>
              <Text>Highest to Lowest Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtons}
              onPress={() => handleSort('lowesttohighestrating')}>
              <Text>Lowest to Highest Rating</Text>
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
    textAlign: 'center',
    marginBottom: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  tinyLogo: {
    width: 250,
    height: 350,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  itemNameText: {
    flexWrap: 'wrap',
    maxWidth: 190,
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 10,
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
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#bfe8bc',
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
    borderColor: '#175c11',
    borderRadius: 8,
    borderWidth: 1,
  },
  addToListButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 4,
    backgroundColor: '#175c11',
    marginBottom: 5,
    maxWidth: 100,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  addToFavButton: {
    position: 'absolute',
    bottom: 75,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#175c11',
    marginBottom: 5,
    maxWidth: 100,
    flexWrap: 'wrap',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    maxWidth: 100,
    flexWrap: 'wrap',
    fontWeight: '500',
  },
  itemText: {
    color: '#175c11',
    fontWeight: '700',
  },
});
