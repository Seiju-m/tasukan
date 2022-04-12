import React from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Center,
  VStack,
  HStack,
  Box,
  Checkbox,
  Icon,
  IconButton,
} from "native-base";
import { useModalContents } from "../hooks/modal";
import { removeTask, updateStatus } from "../redux/actions";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";

const TaskList = (props) => {
  const { tasklist } = useSelector((state) => state.taskReducer);
  const { onPress } = props;
  // const { modalTask, setTask } = useModalContents();

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <Center w="100%">
        <Box maxW="300" w="100%">
          <VStack space={4}>
            <VStack space={2}>
              <HStack
                w="100"
                justifyContent="space-between"
                alignItems="center"
                key={item.id.toString()}
                space={1}
              >
                <Checkbox
                  w="10"
                  isChecked={item.completed}
                  onChange={() => dispatch(updateStatus(item.id))}
                  aria-label="task"
                />
                <Text
                  w="230"
                  style={{
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                    color: item.completed ? "gray" : "black",
                  }}
                  // onPress={() => dispatch(updateStatus(item.id))}
                  onPress={() => onPress(item.task, item.id, item.time)}
                  // onPress={() => tapTes(item.task)}
                >
                  {item.task}: {item.time}
                </Text>
                <IconButton
                  w="10"
                  colorScheme="trueGray"
                  icon={
                    <Icon
                      as={FontAwesome}
                      style={styles.icon}
                      name="trash"
                      onPress={() => handleRemoveTask(item.id)}
                    />
                  }
                  onPress={() => handleRemoveTask(item.id)}
                />
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Center>
    );
  };

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.view}>
      {tasklist.length === 0 ? (
        <Text style={styles.text}>Add a task to tasklist.</Text>
      ) : (
        <FlatList
          data={tasklist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          // style={styles.flatList}
        />
      )}
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  icon: {
    color: "grey",
    fontSize: 22,
  },
  checkbox: {
    color: "grey",
    fontSize: 20,
  },
  body: { flex: 2.2 },
  listItem: { marginVertical: 6 },
  left: { flex: 0.3 },
  safeArea: { flex: 1, backgroundColor: "#fff" },
  view: {
    paddingHorizontal: 16,
    // minHeight: "100%",
  },
  text: { color: "#333", fontSize: 18 },
  flatList: {
    // minHeight: "100%",
  },
});

export default TaskList;
