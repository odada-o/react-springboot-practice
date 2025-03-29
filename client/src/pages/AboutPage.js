import BasicLayout from "../layouts/BasicLayout";
import {useEffect, useState} from "react";
import axios from "axios";

const AboutPage = () => {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/todos')
            .then(response => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

  return ( 
    <BasicLayout>
      <div className=" text-3xl">About Page</div>
        <h2 className="text-2xl">Todo List</h2>
        {loading ? (
            <div>loading</div>
        ) : (
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input type={"checkbox"} checked={todo.complete} readOnly />
                        {todo.title} - {todo.dueDate}
                    </li>
                ))}
            </ul>
        )}
    </BasicLayout>
    
   );
}
 
export default AboutPage;
