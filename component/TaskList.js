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

import { delTodo, toggleTodo, removeTask, updateTask } from "../redux/actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { VisibilityFilters, setVisibilityFilter } from "../redux/actions";

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

const getVisibleTodos = (todos, filter) => {
  // console.log("in getVisible Todos");
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      // console.log("case a");
      return todos.sort((a, b) => {
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return a - b;
      });

    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((todo) => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.sort((a, b) => {
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return a - b;
      });
    // console.log("case b");
    // console.log(todos);
    // return todos;
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

// const TaskList = memo((props) => {
const TaskList = () => {
  // const { task, tasklist } = useSelector((state) => state.taskReducer);
  const { tasklist } = useSelector((state) => state.taskReducer);
  // const { task, todos } = useSelector((state) => state.todos);
  // console.log("tasklist");
  // console.log(tasklist);
  //const tasklist = useSelector((state) => state.tasklist);

  // const { modalVisible, changeModal } = useModalVisible();
  // const { inputValue, changeInput, clearInput } = useInputValue();

  // const removeFromTaskList = (task) => dispatch(removeTask(task));
  // const updateTaskList = (tasklist) => dispatch(updateTask(tasklist));

  const handleRemoveTask = (id) => {
    console.log("in remove task");
    console.log(id);
    dispatch(removeTask(id));
  };

  // const setCheck = (item) => {
  //   console.log("in set check");
  //   console.log(tasklist);
  //   item.checked = !item.checked;
  //   console.log(tasklist);
  //   updateTaskList(tasklist);
  // };

  const todos = useSelector((state) => {
    // console.log("state----------------");
    // console.log(state);
    getVisibleTodos(state.todos, state.visibilityFilter);

    return state.todos;
  });

  const dispatch = useDispatch();
  // console.log("todos");
  // console.log(todos);

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
              {item.task} : {item.id} : {item.time}
            </Text>
            <CheckBox
              checked={item.completed}
              onPress={() => dispatch(updateTask(item.id))}
            />

            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => handleRemoveTask(item.id)}
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

  // const Todo = ({ onClick, completed, text }) => <Text>{text}</Text>;

  // return (
  //   <>
  //     {todos.map((todo) => (
  //       <View key={todo.id}>
  //         <Todo {...todo} />
  //         {/* <button onClick={() => dispatch(delTodo(todo.id))}>Delete</button> */}
  //       </View>
  //     ))}
  //   </>
  // );
};

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
