import React from "react";
import { useSelector } from "react-redux";

import "./styles.css";

const TodoResults = () => {

  const { contadorTodosCompletadas } = useSelector(state => state.todos);

  return (
    <>
      <div className="todo-results">Done: {contadorTodosCompletadas}</div>
    </>
  );
};

export default TodoResults;