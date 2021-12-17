import { createContext, useEffect, useReducer } from "react";
import { ToDoListReducer } from "../components/reducers/ToDoListReducer";

export const TodoListContext =  createContext()

const TodoListContextProvider = (props) => {
    const [lists, dispatch] = useReducer(ToDoListReducer, [], ()=>{
        const data = localStorage.getItem('to_do_list')
        return data?JSON.parse(data):[]
    })
    useEffect(()=>{
        localStorage.setItem('to_do_list', JSON.stringify(lists))
    }, [lists])
    return ( 
        <TodoListContext.Provider value = {{lists, dispatch}}>
            {props.children}
        </TodoListContext.Provider>
    );
}

export default TodoListContextProvider;