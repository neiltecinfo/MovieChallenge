import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addFavoriteMovies} from '../../Redux/TaskSlice';
import {addWatchlistMovies} from '../../Redux/TaskSlice';

const Details = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
      <View
        style={styles.header}>
        {/* <View> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NonAuthScreens', {
                screen: 'BottomTabNavigator',
                params: {
                  screen: 'Home',
                },
              })
            }>
            <Text>Back</Text>
          </TouchableOpacity>
        {/* </View> */}

        <View>
          <Text style={{textAlign: 'center'}}>Movie Details</Text>
        </View>

        <View>
          <Text> </Text>
        </View>
      </View>

      {/* https://image.tmdb.org/t/p/w500 */}
      {/* + poster path */}

      <Image
        style={styles.tinyLogo}
        source={{uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}`}}
      />

      <View style={{borderWidth: 1, padding: 5, margin: 10}}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
          {/* <Text>Original Title</Text> */}
          <Text style={styles.textWrapper}>{item.original_title}</Text>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text>Overview</Text>
          <Text>{item.overview}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.addButtons}
          onPress={() => dispatch(addFavoriteMovies([item]))}>
          <Text>Add To Fav</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButtons}
          onPress={() => dispatch(addWatchlistMovies([item]))}>
          <Text>Add To Watchlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  tinyLogo: {
    width: 200, // Set width in pixels
    height: 300, // Set height in pixels
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10, // Optional rounded corners
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop:20
  },
  textWrapper: {
    flexWrap: 'wrap',
    maxWidth: 190,
    textAlign: 'right',
  },
  addButtons: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
