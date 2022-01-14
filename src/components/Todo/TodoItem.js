import React, { useState } from 'react';
import style from './TodoItem.module.css'

const TodoItem = (props) => {

    const [isClicked, setIsClicked] = useState(false);

    const clickHandler = (event) => {
        setIsClicked(!isClicked);
    }

    return <li onClick={clickHandler} className={`${style[`${isClicked ? 'clicked' : ''}`]}`}>{props.todo}</li>
}

export default TodoItem;