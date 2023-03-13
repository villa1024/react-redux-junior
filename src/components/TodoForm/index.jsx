import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startNewTodo } from 'store/slices/todos/thunks';
import "./styles.css";

export const TodoForm = () => {

    const { isSaving } = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [todo, setForm] = useState({
        label: '',
        checked: false
    });
    const { label } = todo;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...todo,
            [name]: value
        });
    };

    const onNewTodo = (e) => {
        e.preventDefault();
        if (label.trim().length < 1) return;
        dispatch(startNewTodo(todo));
        setForm({
            label: '',
            checked: false
        });
    };

    return (
        <form className="form-todo">
            <input
                type="text"
                placeholder="Enter new to do"
                className="input-newtodo"
                name="label"
                value={label}
                onChange={onInputChange}
            />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
                onClick={onNewTodo}
            >
                ADD TO DO
            </button>
        </form>
    );
};