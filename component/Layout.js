import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import AddModal from "./AddModal";
import Header from "./Header";
import UpdateModal from "./UpdateModal";
// check after
import {
  useModalVisible,
  useModalContents2,
  useUpdateModalVisible,
} from "../hooks/modal";

import { VisibilityFilters, setVisibilityFilter } from "../redux/actions";
import { addTask, sortTask, updateTask } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Layout = () => {
  const id = new Date().getTime().toString();
  const tasklist = useSelector((state) => {
    return state.taskReducer.tasklist;
  });

  const { modalVisible, changeModal } = useModalVisible();
  const { modal, setModal } = useModalContents2();
  const { updateModalVisible, changeUpdateModal } = useUpdateModalVisible();

  const dispatch = useDispatch();
  const setFilter = (filter) => dispatch(setVisibilityFilter(filter));

  const editTask = (task, id, time) => {
    const props = {
      id: id,
      task: task,
      time: time,
    };
    setModal(props);
    changeUpdateModal();
  };

  const handleSortList = (sortCase) => {
    if (sortCase == "asc") {
      const sortAsc = tasklist.sort((a, b) => {
        a = parseFloat(a.time.replace(":", "."));
        b = parseFloat(b.time.replace(":", "."));
        return a - b;
      });
      setFilter(VisibilityFilters.SHOW_ALL);
      dispatch(sortTask(sortAsc));
    } else if (sortCase == "desc") {
      const sortDesc = tasklist.sort((a, b) => {
        a = parseFloat(a.time.replace(":", "."));
        b = parseFloat(b.time.replace(":", "."));
        return b - a;
      });
      dispatch(sortTask(sortDesc));
      setFilter(VisibilityFilters.SHOW_ACTIVE);
    } else {
      const sortAsc = tasklist.sort((a, b) => {
        a = parseFloat(a.time.replace(":", "."));
        b = parseFloat(b.time.replace(":", "."));
        return a - b;
      });
      //一番時間のかかるタスクを取り出し
      let lastTask = sortAsc.slice(-1)[0];
      sortAsc.pop();
      //上記タスクを２番目に追加
      sortAsc.splice(1, 0, lastTask);
      dispatch(sortTask(sortAsc));
      setFilter(VisibilityFilters.SHOW_ALL);
    }
  };

  const inputTask = async (props) => {
    changeModal(!modalVisible);
    dispatch(addTask(props.task, props.time, id));
  };

  const dispatchUpdate = async (props) => {
    changeUpdateModal(!updateModalVisible);
    dispatch(updateTask(props.task, props.time, modal.id));
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View>
        <Header />
      </View>

      <View style={{ flex: 11, backgroundColor: "white" }}>
        <TaskList onPress={editTask} />
      </View>

      <View style={styles.bottomButton}>
        <AddTask onIconPress={changeModal} onSort={handleSortList}></AddTask>
      </View>
      <View>
        <AddModal
          modalVisible={modalVisible}
          changeModal={changeModal}
          onIconPress={inputTask}
        />
      </View>
      <View>
        <UpdateModal
          modalVisible={updateModalVisible}
          changeModal={changeUpdateModal}
          onIconPress={dispatchUpdate}
          modal={modal}
        />
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  icon: {
    color: "grey",
  },
  checkbox: {
    color: "grey",
  },
  bottomButton: {
    flex: 1,
  },
});
