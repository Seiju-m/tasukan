import React from "react";
import { View, FlatList, SafeAreaView, StyleSheet, Image } from "react-native";
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
  Badge,
} from "native-base";
import { removeTask, updateStatus } from "../redux/actions";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";

const TaskList = (props) => {
  const { tasklist } = useSelector((state) => state.taskReducer);
  const { onPress } = props;

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
                <Badge // bg="red.400"
                  colorScheme="danger"
                  rounded="full"
                  bg="#E27510"
                  mb={-4}
                  mr={-4}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-start"
                  left={-13}
                  top={1}
                  _text={{
                    fontSize: 10,
                  }}
                >
                  {item.time}
                </Badge>
                <Text
                  w="200"
                  style={{
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                    color: item.completed ? "gray" : "black",
                  }}
                  onPress={() => onPress(item.task, item.id, item.time)}
                >
                  {item.task}
                </Text>
                {/* <Text w="5" style={styles.taskTime}>
                  {item.time}
                </Text> */}
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
    <View>
      {tasklist.length === 0 ? (
        <View style={styles.noTaskView}>
          <Text style={styles.text}>
            右下の+マークから{"\n"}タスクを追加できます
          </Text>
        </View>
      ) : (
        <View style={styles.view}>
          <FlatList
            data={tasklist}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
  },
  noTaskView: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F7",
  },
  text: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
  },
});

export default TaskList;
