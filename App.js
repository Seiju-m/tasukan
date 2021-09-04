import React, { memo }  from 'react';
import Layout from "./component/Layout";
import Footer from "./component/Footer";
import TodoList from "./component/TodoList";
import AddTodoForm from "./component/AddTodoForm";
import AddTask from "./component/AddTask";

import { useInputValue, useTodos } from "./hooks/todoList";

const App = memo((props) => {
  const { inputValue, changeInput, clearInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  return (
      <Layout>
        <AddTodoForm
          inputValue={inputValue}
          changeInput={changeInput}
          onIconPress={clearInputAndAddTodo}
        />
        <TodoList
          items={todos}
          onItemCheck={idx => checkTodo(idx)}
          onItemRemove={idx => removeTodo(idx)}
        />
      </Layout>
  );
});

export default App;