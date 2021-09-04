import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Body, Title, Content } from "native-base";

import AddTask from './AddTask';
import { borderBottom } from 'styled-system';
import { useInputValue, useTodos } from "../hooks/todoList";

const Layout = memo((props) => {
  const { children } = props;
  const { inputValue, changeInput, clearInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  console.log(inputValue);

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Hooks Todo List</Title>
        </Body>
      </Header>
      <View style={styles.container}>
      <Content style={styles.content}>
        {children}
      </Content>
      </View>


    </Container>
  );
});

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  content: {
    width: 350,
    backgroundColor: 'red'
  },
  plusIcon: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 20,
    backgroundColor: 'blue',
    borderBottomColor: 'red',
  }
});