import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import {
  HStack,
  Box,
  Icon,
  HamburgerIcon,
  Menu,
  Pressable,
  Text,
  Fab,
  useDisclose,
  IconButton,
  Stagger,
  Center,
  NativeBaseProvider,
} from "native-base";

import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";

const AddTask = memo((props) => {
  const { onIconPress, onSort } = props;

  const StaggerComponent = () => {
    const { isOpen, onToggle } = useDisclose();
    return (
      <Box>
        <Box alignItems="flex-start" style={styles.staggerContents}>
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 70,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <HStack>
              <IconButton
                mb="4"
                variant="solid"
                bg="teal.400"
                colorScheme="red"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    size="6"
                    name="clock-fast"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
                onPress={() => onSort("ask")}
              />
              <Text onPress={() => onSort("asc")} style={styles.sortText}>
                すぐ終わる順
              </Text>
            </HStack>
            <HStack>
              <IconButton
                mb="4"
                variant="solid"
                bg="red.500"
                colorScheme="teal"
                borderRadius="full"
                icon={
                  <Icon
                    as={Entypo}
                    size="6"
                    name="clock"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
                onPress={() => onSort("desc")}
              />
              <Text onPress={() => onSort("desc")} style={styles.sortText}>
                手強い順
              </Text>
            </HStack>
            <HStack>
              <IconButton
                mb="4"
                variant="solid"
                bg="yellow.400"
                colorScheme="yellow"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialIcons}
                    size="6"
                    name="add-task"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
                onPress={() => onSort("recommend")}
              />
              <Text onPress={() => onSort("recommend")} style={styles.sortText}>
                おすすめ順
              </Text>
            </HStack>
          </Stagger>
        </Box>
        <HStack alignItems="center">
          <Box style={styles.staggerFab}>
            <Fab
              renderInPortal={false}
              shadow={2}
              size="sm"
              borderRadius="full"
              placement="bottom-left"
              onPress={onToggle}
              // icon={<HamburgerIcon size="sm" />}
              icon={
                <Icon
                  color="white"
                  as={FontAwesome}
                  name="sort-amount-desc"
                  size="sm"
                />
              }
            />
          </Box>
        </HStack>
      </Box>
    );
  };

  //

  return (
    <NativeBaseProvider>
      <Center style={styles.stagger} flex={1} px="3">
        <StaggerComponent />
      </Center>

      <View style={styles.plusIconWrapper}>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          onPress={onIconPress}
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        />
      </View>
    </NativeBaseProvider>
  );
});

export default AddTask;

const styles = StyleSheet.create({
  plusIconWrapper: {
    margin: 10,
    top: 30,
  },
  stagger: {
    bottom: 30,
    // left: 10,
  },
  staggerContents: {
    left: 20,
    bottom: 70,
  },
  sortText: {
    top: 3,
    fontSize: 15,
    padding: 5,
  },
  staggerFab: {
    // top: 60,
    // left: 10,
  },
});
