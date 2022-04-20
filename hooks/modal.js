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

export const useUpdateModalVisible = () => {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  return {
    updateModalVisible,
    changeUpdateModal: () => {
      setUpdateModalVisible(!updateModalVisible);
    },
  };
};

export const useModalContents = () => {
  const defaultModal = {
    id: "",
    task: "",
    time: "",
  };
  const [modal, setModalTask] = useState(defaultModal);

  return {
    modal,
    setModal: (props) => {
      setModalTask(props);
    },
  };
};
