import { HStack, Icon } from "native-base";
import React from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <HStack style={styles.headerContent}>
        {/* <Icon as={FontAwesome} style={styles.icon} size="6" name="trash" /> */}
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 20,
    paddingTop: 15,
    borderBottomColor: "rgba(0,0,0,0.3)",
    opacity: 29,
    borderBottomWidth: 1,
  },

  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Header;
