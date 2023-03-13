import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createNewTodo, deleteTodoById, updateContadorTodosTerminadas, setTodos, setToggleTodo, startLoadingTodos } from "./todosSlice";

const sendToast = (mensaje) => {
    toast(mensaje, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};

export const getTodos = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingTodos());
            const resp = await fetch("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos", {
                method: 'GET'
            });
            const todos = await resp.json();
            if (resp.status !== 200) return sendToast('Hubo un error al obtener listado de todos...');
            dispatch(setTodos(todos));
            const TodosCompletadas = todos.filter(todo => todo.checked).length;
            dispatch(updateContadorTodosTerminadas(TodosCompletadas));
        } catch (error) {
            sendToast('Hay un error con el servidor...');
        }
    };
};

export const startNewTodo = (todo) => {
    return async (dispatch) => {
        try {
            const resp = await fetch("https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            const data = await resp.json();
            if (resp.status !== 201) return sendToast('Hubo un error al guardar el nuevo todo...');
            dispatch(createNewTodo(data));
        } catch (error) {
            sendToast('Hay un error con el servidor...');
        }
    };
};

export const startToggleTodo = (todoId, isChecked) => {
    return async (dispatch) => {
        try {
            const resp = await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ checked: !isChecked })
            });
            if (resp.status !== 200) return sendToast('Hubo un error al marcar el todo como completada...');
            dispatch(setToggleTodo({ todoId, isChecked }));
            (isChecked) ? dispatch(updateContadorTodosTerminadas(-1)) : dispatch(updateContadorTodosTerminadas(1));
        } catch (error) {
            sendToast('Hay un error con el servidor...');
        }
    };
};

export const startEliminarTodo = (todoId, isChecked) => {
    return async (dispatch) => {
        try {
            const resp = await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, {
                method: 'DELETE'
            });
            if (resp.status !== 200) return sendToast('Hubo un error al eliminar el todo...');
            dispatch(deleteTodoById(todoId));
            dispatch(updateContadorTodosTerminadas(-Number(isChecked)));
        } catch (error) {
            sendToast('Hay un error con el servidor...');
        }
    };
};