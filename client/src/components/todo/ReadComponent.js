import {useEffect, useState} from "react";
import {getOne} from "../../api/todoApi";

const initialState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: null,
    complete: false,
}

const ReadComponent = ({tno}) => {

    const [todo, setTodo] = useState(initialState);

    useEffect(() => {
        getOne(tno).then(data => {
            setTodo(data);
        });
    }, [tno]);

    return (
        <div>
            <h1>{todo.title}</h1>
            <p>{todo.writer}</p>
            <p>{todo.dueDate}</p>
            <p>{todo.complete ? '완료' : '미완료'}</p>
        </div>
    );

}

export default ReadComponent;