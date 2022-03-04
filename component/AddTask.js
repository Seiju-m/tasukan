import React, { memo } from "react";
import { Item } from "native-base";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const AddTask = memo((props) => {
  const { onIconPress, onIconminus } = props;

  return (
    <View>
      <Icon
        name="circle-with-plus"
        onPress={onIconPress}
        style={styles.plusIcon}
      />
      <Icon
        name="circle-with-minus"
        onPress={() => onIconminus('asc')}
        style={styles.plusIcon}
      />
      <Icon
        name="circle-with-minus"
        onPress={() => onIconminus('desc')}
        style={styles.plusIcon}
      />
    </View>
  );
});

export default AddTask;

const styles = StyleSheet.create({
  plusIcon: {
    fontSize: 40,
  },
});
