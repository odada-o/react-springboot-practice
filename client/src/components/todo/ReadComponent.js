import {useEffect, useState} from "react";
import {getOne} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import Button from "../button/Button";

const initialState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: null,
    complete: false,
}

const ReadComponent = ({tno}) => {

    const [todo, setTodo] = useState(initialState);

    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data);
            setTodo(data);
        });
    }, [tno]);

    return (
        <div>
            <div className="border border-gray-400 bg-white p-4 mt-5 w-full">
                <h2>Read Component</h2>
                {makeDiv("TNO", todo.tno)}
                {makeDiv("Title", todo.title)}
                {makeDiv("Writer", todo.writer)}
                {makeDiv("Due Date", todo.dueDate)}
                {makeDiv("Complete", todo.complete ? "Yes" : "No")}
            </div>

            <div>
                <Button onClick={() => moveToList()}>List</Button>
                <Button onClick={() => moveToModify()}>Modify</Button>
            </div>
        </div>
    );

}

const makeDiv = (title, value) => {
    return (
        <div className={"flex justify-between gap-2 m-2 p-2"}>
            <strong className={"w-60 font-normal"}>{title}</strong>
            <p className={"grow font-normal"}>{value}</p>
        </div>
    );
}




export default ReadComponent;