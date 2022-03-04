import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Import mock screens
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import AddModal from "./AddModal";
import { useModalVisible } from "../hooks/modal";
import { useInputValue, useGroupValue, useTimeValue } from "../hooks/todoList";
import { addTask, removeTask, updateTask, sortTask } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { InputGroup } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Layout = () => {
  const { task, tasklist } = useSelector((state) => state.taskReducer);
  const { modalVisible, changeModal } = useModalVisible();
  const { inputValue, changeInput, clearInput } = useInputValue();
  const { groupValue, changeGroup, clearGroup } = useGroupValue();
  const { timeValue, changeTime, clearTime } = useTimeValue();

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("time");
      if (value !== null) {
        return value;
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  //const fetchBooks = () => dispatch(getBooks());
  const addToTaskList = (task) => dispatch(addTask(task));
  const sortTaskList = (task) => dispatch(sortTask(task));

  const handleAddTask = (task) => {
    console.log("in add task");
    console.log(JSON.stringify(task));
    task.checked = false;
    console.log(JSON.stringify(task));
    addToTaskList(task);
  };

  const handleSortList = (sortCase) => {
    let array = [1, 2, 3, 4, 5];
    // 入れ替える要素のindex

    if (sortCase == "asc") {
      console.log("in asc");
      const sortAsc = tasklist.sort((a, b) => {
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return a - b;
      });
      sortTaskList(sortAsc);
    } else if (sortCase == "desc") {
      console.log("in desc");
      const sortDesc = tasklist.sort((a, b) => {
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return b - a;
      });
      sortTaskList(sortDesc);
    } else {
      console.log("in else");
      const sortAsc = tasklist.sort((a, b) => {
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return a - b;
      });
      //一番時間のかかるタスクを取り出し
      let lastTask = sortAsc.slice(-1)[0];
      sortAsc.pop();
      //上記タスクを２番目に追加
      sortAsc.splice(1, 0, lastTask);
      sortTaskList(sortAsc);
    }
  };

  let new_task = [
    {
      group: "",
      id: 1,
      time: "44.22",
      title: "",
    },
    {
      group: "",
      id: 2,
      time: "11.11",
      title: "",
    },
  ];

  const inputTask = async (_) => {
    changeModal(!modalVisible);
    // console.log("time value")
    // console.log(timeValue)
    // console.log("before get time")
    let time = await getData();
    handleAddTask({
      title: inputValue,
      id: tasklist.length + 1,
      time: time,
      group: groupValue,
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 4, backgroundColor: "red" }}>
        <TaskList style={styles.listView}></TaskList>
      </View>
      <View style={{ flex: 1, backgroundColor: "darkorange" }}>
        <AddTask
          onIconPress={changeModal}
          onIconminus={handleSortList}
        ></AddTask>
      </View>
      <View style={{ backgroundColor: "green" }}>
        <AddModal
          modalVisible={modalVisible}
          changeModal={changeModal}
          changeText={changeInput}
          changeGroup={changeGroup}
          changeTime={changeTime}
          onIconPress={inputTask}
        />
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "green",
  },
  listView: {
    flex: 3,
    backgroundColor: "blue",
  },
  icon: {
    color: "grey",
  },
  checkbox: {
    color: "grey",
    fontSize: 20,
  },
  plusButton: {
    flex: 1,
    backgroundColor: "red",
  },
});
