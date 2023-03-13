import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import { getTodos } from "store/slices/todos/thunks";
import { TodoForm } from "components/TodoForm";
import "./App.css";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoForm />
      <ToastContainer />
    </div>
  );
};

export default App;