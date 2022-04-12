import React, { memo, useState, useEffect, useContext } from "react";
import { StyleSheet, Pressable, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Text, Modal } from "native-base";
import { useForm, Controller } from "react-hook-form";

const UpdateModal = memo((props) => {
  const { modalVisible, changeModal, onIconPress, modal } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      task: modal.task,
      time: modal.time,
    },
  });

  useEffect(() => {
    reset({
      task: modal.task,
      time: modal.time,
    });
  }, [modalVisible]);

  return (
    <View style={styles.centeredView}>
      <Modal isOpen={modalVisible} onClose={() => changeModal(!modalVisible)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>タスクの更新</Modal.Header>
          <Modal.Body>
            <View style={styles.modalView}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.addTaskInput}
                    placeholder="タスクの更新"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="task"
              />
              {errors.task && <Text>This is required.</Text>}
              <Text style={styles.modalText}>見積もり時間</Text>
              <Box>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Picker
                        style={styles.timePicker}
                        selectedValue={value}
                        onValueChange={(itemValue, itemIndex) => {
                          onChange(itemValue);
                        }}
                        onBlur={onBlur}
                        itemStyle={styles.pickerItem}
                        value={value}
                      >
                        <Picker.Item label="10 min" value="10" />
                        <Picker.Item label="20 min" value="20" />
                        <Picker.Item label="30 min" value="30" />
                        <Picker.Item label="40 min" value="40" />
                        <Picker.Item label="50 min" value="50" />
                        <Picker.Item label="60 min" value="60" />
                      </Picker>
                    )}
                    name="time"
                  />
                </View>
              </Box>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit(onIconPress)}
              >
                <Text style={styles.textStyle}>更新</Text>
              </Pressable>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  addTaskInput: {
    height: 40,
  },
  timePicker: {
    width: 180,
    height: 100,
    fontSize: 5,
  },
  pickerItem: {
    height: 100,
  },
});

export default UpdateModal;
