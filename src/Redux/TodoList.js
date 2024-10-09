import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { deleteTask } from '../Redux/TaskSlice';
import { useDispatch } from 'react-redux';





const TodoList = () => {

         const dispatch = useDispatch();
         const todos = useSelector(state => state.tasks)


         const data = [
                  {
                    id: 1,
                    title: 'Learn React Native',
                  },
                  {
                    id: 2,
                    title: 'Learn Redux Toolkit',
                  },
                ];

         // const onDelete = ()=>{
         //          dispatch(deleteTask({ id : id }))
         // }

         const onDelete = (id) => {
                  dispatch(deleteTask({ id }));
                };



         const renderItem = ({item}) => {
                  return (
                    <View style={styles.item}>
                      <Text style={styles.title}>{item.name}</Text>
                      <TouchableOpacity onPress={() => onDelete(item.id)}>
                         <Text style={styles.delete}>Del</Text>
                      </TouchableOpacity>
                    </View>
                  );
                };

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e9e9e9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  title: {
    fontSize: 23,
  },
  delete: {
    color: 'red',
    fontSize: 15,
  },
});
