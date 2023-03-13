import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoListItem from "components/TodoListItem";
import { startEliminarTodo, startToggleTodo } from "store/slices/todos/thunks";
import "./styles.css";

const TodoList = () => {

  const { todosList = [] } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleDelete = (todoId, isChecked) => {
    dispatch(startEliminarTodo(todoId, isChecked));
  };

  const toggleCheck = (todoId, isChecked) => {
    dispatch(startToggleTodo(todoId, isChecked));
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        {
          (todosList.length > 0)
            ? (
              todosList.map(todo => (
                <TodoListItem
                  key={todo.id}
                  id={todo.id}
                  onCheck={toggleCheck}
                  checked={todo.checked}
                  onDelete={handleDelete}
                  label={todo.label}
                />
              ))
            )
            : (
              <div className="no-todos">
                Looks like you&apos;re absolutely free today!
              </div>
            )
        }
      </div>
    </div>
  );
};

export default TodoList;