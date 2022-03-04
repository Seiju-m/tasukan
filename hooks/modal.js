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
