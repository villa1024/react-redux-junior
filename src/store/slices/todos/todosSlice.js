import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todosList: [],
        isLoading: false,
        isSaving: false,
        contadorTodosCompletadas: 0
    },
    reducers: {
        startLoadingTodos: (state) => {
            state.isLoading = true;
        },
        creatingNewTodo: (state) => {
            state.isSaving = true;
        },
        setTodos: (state, action) => {
            state.todosList = action.payload;
            state.isLoading = false;
        },
        createNewTodo: (state, action) => {
            state.todosList.push(action.payload);
            state.isSaving = false;
        },
        setToggleTodo: (state, action) => {
            const todoIndex = state.todosList.findIndex(todo => todo.id === action.payload.todoId);
            state.todosList[todoIndex].checked = !action.payload.isChecked;
        },
        deleteTodoById: (state, action) => {
            state.todosList = state.todosList.filter(todo => todo.id !== action.payload);
        },
        updateContadorTodosTerminadas: (state, action) => {
            state.contadorTodosCompletadas += action.payload;
        }
    }
});

export const {
    startLoadingTodos,
    creatingNewTodo,
    setTodos,
    createNewTodo,
    setToggleTodo,
    deleteTodoById,
    updateContadorTodosTerminadas
} = todosSlice.actions;

export default todosSlice.reducer;