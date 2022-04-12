import { useState } from "react";

export const useModalVisible = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return {
    modalVisible,
    changeModal: () => {
      setModalVisible(!modalVisible);
    },
  };
};

export const useModalContents = () => {
  const [modalTask, setModalTask] = useState("");

  return {
    modalTask,
    setTask: (task) => {
      setModalTask(task);
    },
  };
};

export const useUpdateModalVisible = () => {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  return {
    updateModalVisible,
    changeUpdateModal: () => {
      setUpdateModalVisible(!updateModalVisible);
    },
  };
};

export const useUpdateModalContents = () => {
  const [updateModalId, setUpdateModalId] = useState("");

  return {
    updateModalId,
    setTaskId: (id) => {
      setUpdateModalId(id);
    },
  };
};

export const useModalContents2 = () => {
  const defaultModal = {
    id: "",
    task: "",
  };
  const [modal, setModalTask] = useState("");

  return {
    modal,
    setModal: (props) => {
      setModalTask(props);
    },
  };
};
