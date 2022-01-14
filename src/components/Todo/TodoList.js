import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import style from './TodoList.module.css';
import TodoItem from './TodoItem';



const TodoList = () => {
    const date = new Date();
    const ref = useRef();

    const [listData, setListData] = useState();
    const [itemAdded, setIsItemAdded] = useState(false);



    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/v1/todo/${localStorage.getItem('todo-user')}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('todo-token')}`
                    }
                });
                setListData(data.data.todo);

            } catch (err) {
                console.log(err);
            }
        })();

    }, [itemAdded])

    const submitHandler = async (event) => {
        event.preventDefault();
        const val = ref.current.value;

        if (!val || val === '')
            return

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/todo`, { userId: `${localStorage.getItem('todo-user')}`, todo: `${val}` }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('todo-token')}`
                }

            })
            if (data.status === 'success') {
                ref.current.value = '';
                setIsItemAdded(!itemAdded);
            }
        } catch (err) {
            console.log(err);
        }
    }



    return <div className={style["main-container"]}>
        <h2 className={style["heading"]}>Todo List for {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</h2>
        <hr />
        <div>
            <form>
                <input ref={ref} type="text" placeholder="Add items in list" />
                <button onClick={submitHandler}>Add</button>
            </form>
        </div>
        <div className={style["list-container"]}>
            <ul className={style["list"]}>
                {
                    listData && listData.map(item => <TodoItem id={item.id} todo={item.todo} key={item.id} />)
                }
            </ul>
        </div>
    </div>
}

export default TodoList;