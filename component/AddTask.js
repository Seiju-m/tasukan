import React, { memo }  from 'react';
import { Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';


const AddTodoList = memo((props) => {  //memoで不要な再レンダリングを避ける
  const { inputValue, changeInput, onIconPress } = props;

  return (
    <Item success>
       <Icon 
        name="circle-with-plus" 
        size={50}
        onPress={onIconPress}
        />
    </Item>
  );
});

export default AddTodoList;

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  icon: {
    color: 'grey',
  },
  checkbox: {
    color: 'grey',
    fontSize: 20,
  }
});