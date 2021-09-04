import React, { memo }  from 'react';
import { Input, Item, Icon } from 'native-base';


const AddTodoList = memo((props) => {  //memoで不要な再レンダリングを避ける
  const { inputValue, changeInput, onIconPress } = props;

  return (
    <Item success>
      <Input
        placeholder='Input todo.....'
        value={inputValue}
        onChange={changeInput}
        onChangeText={props.onInputKeyPress}
      />
      <Icon type="Feather" name='plus' onPress={onIconPress} />
    </Item>
  );
});

export default AddTodoList;