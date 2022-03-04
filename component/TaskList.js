import React, { memo } from "react";
import { useState } from "react"; //TODO delete
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import { addTask, removeTask, updateTask, sortTask } from "../redux/actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const today = new Date();
// const keyDate =
//   today.getFullYear() +
//   "/" +
//   (today.getMonth() + 1) +
//   "/" +
//   today.getDate() +
//   " " +
//   today.getHours() +
//   ":" +
//   today.getMinutes() +
//   ":" +
//   today.getSeconds();

const TaskList = memo((props) => {
  const { task, tasklist, visibilityFilter } = useSelector(
    (state) => state.taskReducer
  );
  console.log("visibilityFilter");
  console.log(visibilityFilter);
  // const { modalVisible, changeModal } = useModalVisible();
  // const { inputValue, changeInput, clearInput } = useInputValue();

  const dispatch = useDispatch();

  const removeFromTaskList = (task) => dispatch(removeTask(task));
  const updateTaskList = (tasklist) => dispatch(updateTask(tasklist));

  const handleRemoveTask = (task) => {
    removeFromTaskList(task);
  };

  let new_task = [
    {
      group: "",
      id: 1,
      time: "44:22",
      title: "",
    },
    {
      group: "",
      id: 2,
      time: "11:11",
      title: "",
    },
  ];

  // console.log("tasklist");
  // console.log(tasklist);

  const setCheck = (item) => {
    console.log("in set check");
    console.log(tasklist);
    item.checked = !item.checked;
    console.log(tasklist);
    updateTaskList(tasklist);
  };

  const ifExists = (task) => {
    if (tasklist.filter((item) => item.id === task.id).length > 0) {
      return true;
    }

    return false;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          {/* task Title */}
          <View style={styles.checkboxContainer}>
            <Text style={{ fontSize: 22, paddingRight: 16, color: "black" }}>
              {item.title} : {item.time} : {item.group}
            </Text>
            <CheckBox checked={item.checked} onPress={() => setCheck(item)} />

            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => handleRemoveTask(item)}
                activeOpacity={0.7}
                style={{
                  // rest remains same
                  backgroundColor: ifExists(item) ? "#F96D41" : "#2D3038",
                  //
                }}
              >
                <MaterialCommunityIcons
                  color={ifExists(item) ? "white" : "#64676D"}
                  size={24}
                  name={ifExists(item) ? "bookmark-outline" : "bookmark"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, marginTop: 8 }}>
          {tasklist.length === 0 ? (
            <Text style={{ color: "#333", fontSize: 18 }}>
              Add a task to tasklist.
            </Text>
          ) : (
            <FlatList
              data={tasklist}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default TaskList;
