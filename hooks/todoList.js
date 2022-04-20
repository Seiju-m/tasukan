import { useState } from "react";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event) => {
      setInputValue(event.nativeEvent.text);
    },
    clearInput: () => setInputValue(""),
  };
};

export const useGroupValue = (initialValue = "") => {
  const [groupValue, setGroupValue] = useState(initialValue);

  return {
    groupValue,
    changeGroup: (event) => {
      setGroupValue(event.nativeEvent.text);
    },
    clearGroup: () => setGroupValue(""),
  };
};

export const useTimeValue = (initialValue = "") => {
  const [timeValue, setTimeValue] = useState(initialValue);

  return {
    timeValue,
    changeTime: (event) => {
      // setTimeValue(event.nativeEvent.text);
    },
    clearTime: () => setGroupValue(""),
  };
};
