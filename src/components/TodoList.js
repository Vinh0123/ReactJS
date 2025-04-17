// src/pages/TodoList.js
import React, { useState, useCallback } from "react";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 as uuidv4 } from "uuid";
import Todo from "../components/Todo";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(() => {
    if (!textInput.trim()) return;

    const newTodo = {
      id: uuidv4(),
      name: textInput,
      isComplete: false,
    };

    setTodoList((prevList) => [newTodo, ...prevList]);
    setTextInput("");
  }, [textInput]);

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, isComplete: true } : todo
      )
    );

    setTimeout(() => {
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    }, 1000);
  }, []);

  return (
    <>
      <h3>Todo List</h3>
      <Textfield
        name="add-todo"
        placeholder="Add todo..."
        value={textInput}
        onChange={onTextInputChange}
        elemAfterInput={
          <Button
            isDisabled={!textInput.trim()}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Add
          </Button>
        }
      />
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />
      ))}
    </>
  );
}

export default TodoList;
