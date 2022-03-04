import React, { memo, useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddModal = memo((props) => {
  const { modalVisible, changeModal, changeText, changeGroup, changeTime, onIconPress } = props;
  const [text, setText] = useState("");
  const [group, setGroup] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  const [date, setDate] = useState(new Date(54900000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  let dates = new Date(54900000)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('time', value)
    } catch (e) {
      // saving error
    }
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    storeData(currentDate.getHours() + ":" + currentDate.getMinutes())
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  const showTimepicker = () => {
    showMode('time');
  };

  const hideTimepicker = () => {
    setShow(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    dates = date
    hideDatePicker();
  };

  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          changeModal(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* task name */}
            <Text style={styles.modalText}>タスクの追加</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="新規タスク"
              onChange={changeText}
              // onChangeText={props.onInputKeyPress}
              defaultValue={text}
            />

            {/* estimate time */}
            <Text style={styles.modalText}>見積もり時間</Text>
            {/* date picker */}
            <Text onPress={showTimepicker} >{date.getHours()}:{date.getMinutes()}</Text>
            <View>
              <Button onPress={showTimepicker} title="{date}" />
            </View>
            {show && (
              <View>
              <Button onPress={hideTimepicker} title="hide" />
              <DateTimePicker
                style={{ width: 240 }}
                testID="dateTimePicker"
                value={date}
                mode="countdown"
                display="default"
                textColor="red"
                onChange={onChange}
                // onChange={changeTime}
              />
              </View>
            )}

            {/* <Text onPress={showDatePicker} >{dates.getHours()}:{dates.getMinutes()}</Text>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="countdown"
                    textColor="red"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  /> */}
          

            {/* task group */}
            <Text style={styles.modalText}>グループ</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="グループ"
              onChangeText={(group) => setGroup(group)}
              onChange={changeGroup}
              defaultValue={group}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              // onPress={() => addTask(group)}
              onPress={onIconPress}
            >
              <Text style={styles.textStyle}>追加</Text>
            </Pressable>
          </View>
        </View>
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
    margin: 20,
    width: 280,
    height: 300,
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});

export default AddModal;
