import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import AddModal from "./AddModal";
import Header from "./Header";
import UpdateModal from "./UpdateModal";
import {
  useModalVisible,
  useModalContents,
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
  const { updateModalVisible, changeUpdateModal } = useUpdateModalVisible();
  const { modal, setModal } = useModalContents(); // TODO chage func name

  const dispatch = useDispatch();
  const setFilter = (filter) => dispatch(setVisibilityFilter(filter));

  const taskTapped = (task, id, time) => {
    const props = {
      id: id,
      task: task,
      time: time,
    };
    setModal(props);
    changeUpdateModal();
  };

  const dispatchAdd = async (props) => {
    changeModal(!modalVisible);
    dispatch(addTask(props.task, props.time, id));
  };

  const dispatchUpdate = async (props) => {
    changeUpdateModal(!updateModalVisible);
    dispatch(updateTask(props.task, props.time, modal.id));
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

  return (
    // <SafeAreaView
    //   style={[
    //     styles.safeArea,
    //     {
    //       flexDirection: "column",
    //     },
    //   ]}
    // >
    <View
      style={[
        styles.safeArea,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={styles.headerView}>
        <Header />
      </View>

      <View style={styles.taskListView}>
        <TaskList onPress={taskTapped} />
      </View>

      <View style={styles.bottomButtonView}>
        <AddTask onIconPress={changeModal} onSort={handleSortList}></AddTask>
      </View>
      <View style={styles.ModalView}>
        <AddModal
          modalVisible={modalVisible}
          changeModal={changeModal}
          onIconPress={dispatchAdd}
        />
      </View>
      <View style={styles.ModalView}>
        <UpdateModal
          modalVisible={updateModalVisible}
          changeModal={changeUpdateModal}
          onIconPress={dispatchUpdate}
          modal={modal}
        />
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#F2F2F7",
  },
  icon: {
    color: "grey",
  },
  checkbox: {
    color: "grey",
  },
  bottomButtonView: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  taskListView: {
    flex: 11,
    backgroundColor: "#F2F2F7",
  },
  ModalView: {
    backgroundColor: "#F2F2F7",
    zIndex: -1, // works on ios
    elevation: -1,
  },
  headerView: {
    backgroundColor: "#52B3D0",
  },
});
