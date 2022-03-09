import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";

// Import mock screens
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import AddModal from "./AddModal";
import { useModalVisible } from "../hooks/modal";
import { useInputValue, useGroupValue, useTimeValue } from "../hooks/todoList";
import { VisibilityFilters, setVisibilityFilter } from "../redux/actions";
import { addTask, sortTask } from "../redux/actions";
import { addTodo } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Layout = () => {
  // const { task, tasklist } = useSelector((state) => state.taskReducer);
  const tasklist = useSelector((state) => {
    return state.taskReducer.tasklist;
    // console.log("in use selector");
    // console.log(state.taskReducer.tasklist);
  });
  // console.log("before");
  // console.log(tasklist);
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

  // const addToTaskList = (task) => dispatch(addTask(task));
  // const sortTaskList = (task) => dispatch(sortTask(task));
  const setFilter = (filter) => dispatch(setVisibilityFilter(filter));

  let filter = VisibilityFilters.SHOW_ALL;
  const active = useSelector((state) => filter === state.visibilityFilter);
  // console.log("filter");
  // console.log(active);

  const handleAddTask = (task) => {
    // task.checked = false;
    // addToTaskList(task);
  };

  const handleSortList = (sortCase) => {
    let array = [1, 2, 3, 4, 5];
    // 入れ替える要素のindex

    if (sortCase == "asc") {
      console.log("in asc");
      console.log(tasklist);

      const sortAsc = tasklist.sort((a, b) => {
        console.log(a.time);
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return a - b;
      });
      // sortTaskList(sortAsc);
      setFilter(VisibilityFilters.SHOW_ALL);
      // console.log(sortAsc);
      dispatch(sortTask(sortAsc));
      // console.log("filter");
      // console.log(active);
    } else if (sortCase == "desc") {
      console.log("in desc");
      // console.log("filter");
      // console.log(active);
      const sortDesc = tasklist.sort((a, b) => {
        a = parseFloat(a.time);
        b = parseFloat(b.time);
        return b - a;
      });
      // console.log(sortDesc);
      dispatch(sortTask(sortDesc));
      setFilter(VisibilityFilters.SHOW_ACTIVE);
    } else {
      console.log("in else");
      // const sortAsc = tasklist.sort((a, b) => {
      //   a = parseFloat(a.time);
      //   b = parseFloat(b.time);
      //   return a - b;
      // });
      //一番時間のかかるタスクを取り出し
      let lastTask = sortAsc.slice(-1)[0];
      sortAsc.pop();
      //上記タスクを２番目に追加
      sortAsc.splice(1, 0, lastTask);
      // sortTaskList(sortAsc);
      setFilter(VisibilityFilters.SHOW_ALL);
    }
  };

  const inputTask = async (_) => {
    changeModal(!modalVisible);
    let time = await getData();
    // handleAddTask({
    //   title: inputValue,
    //   id: tasklist.length + 1,
    //   time: time,
    //   group: groupValue,
    // });
    // handleAddTask(inputValue);
    // dispatch(addTodo(inputValue, time));
    dispatch(addTask(inputValue, time));
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
      <View style={{ flex: 4, backgroundColor: "white" }}>
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
