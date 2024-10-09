import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addFavoriteMovies } from '../../Redux/TaskSlice';
import { addWatchlistMovies } from '../../Redux/TaskSlice';

const Details = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('NonAuthScreens', {
            screen: 'BottomTabNavigator',
            params: {
              screen: "Home"
            }
          })}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Item Details</Text>
        </View>

        <View>
          <Text> </Text>
        </View>
      </View>

      <View style={{borderWidth: 1, padding: 5, margin: 10}}>
        <View style={styles.itemRow}>
          <Text>Item Id</Text>
          <Text>{item.id}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item iso_639_1</Text>
          <Text>{item.iso_639_1}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item iso_3166_1</Text>
          <Text>{item.iso_3166_1}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item name</Text>
          <Text style={styles.textWrapper}>{item.name}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item key</Text>
          <Text style={styles.textWrapper}>{item.key}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item site</Text>
          <Text style={styles.textWrapper}>{item.site}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item size</Text>
          <Text style={styles.textWrapper}>{item.size}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item type</Text>
          <Text style={styles.textWrapper}>{item.type}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text>Item published_at</Text>
          <Text style={styles.textWrapper}>{item.published_at}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.addButtons}
         onPress={() => dispatch(addFavoriteMovies([item]))}
        >
          <Text>Add To Fav</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.addButtons}
        onPress={() => dispatch(addWatchlistMovies([item]))}
        >
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
  textWrapper: {
    flexWrap: 'wrap',
    maxWidth: 190,
  },
  addButtons:{
    borderWidth:1, padding:5, marginBottom: 10, marginHorizontal:10, justifyContent:"center", alignItems:"center"
  }
});







