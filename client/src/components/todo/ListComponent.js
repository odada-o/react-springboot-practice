import useCustomMove from "../../hooks/useCustomMove";
import {useEffect, useState} from "react";
import axios from "axios";
import {getList} from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const initialState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

// {
//     "dtoList": [
//     { "tno": 1, "title": "첫 번째 할 일", ... },
//     { "tno": 2, "title": "두 번째 할 일", ... },
//     ...
// ],
//     "pageNumList": [1, 2, 3, ...],
//     "pageRequestDTO": { "page": 1, "size": 10 },
//     "prev": false,
//     "next": true,
//     "totalCount": 100,
//     "prevPage": 0,
//     "nextPage": 2,
//     "totalPage": 10,
//     "current": 1
// }

const ListComponent = () => {

    const {page, size, moveToList} = useCustomMove()

    const [serverDate, setServerDate] = useState(initialState)

    useEffect(() => {
        getList({page, size})
            .then(data => {
                console.log(data)
                setServerDate(data)
            })
    }, [page, size]);

    return(
        <div>
            <h2>Todo List</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>완료 여부</th>
                        <th>마감일</th>
                    </tr>
                </thead>
                <tbody>
                    {serverDate.dtoList.map(todo => (
                        <tr key={todo.tno}>
                            <td>{todo.tno}</td>
                            <td>{todo.title}</td>
                            <td>{todo.writer}</td>
                            <td>{todo.complete ? '완료' : '미완료'}</td>
                            <td>{todo.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PageComponent serverData={serverDate} movePage={moveToList} />

        </div>
    )
}

export default ListComponent;