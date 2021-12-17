import { useContext, useEffect, useRef, useState} from "react"
import { TodoListContext } from "../contexts/TodoListContext"


const ToDoList = ({props, lists}) => {
    const [data, setData] = useState(props)
    const draggingToDoIndex = useRef()
    const draggingToDoNode = useRef()
    const [dragging, setDragging] = useState(false)
    const { dispatch } = useContext(TodoListContext)

    const checkthem = ()=>{
        const el = document.querySelectorAll('.listwrapper input')
        const filtered = props.filter(list=>list.completed===true)
        filtered.map(maped => {
            return el.forEach(e=>{
                if(maped.id === e.getAttribute('id')){
                    e.checked = true
                }})

        })
    }

    const handleDelete = (e)=>{
        dispatch({type:'REMOVE_TODO', id:e.target.parentNode.children[0].id})
    }
    const handleStatus = (e)=>{
        dispatch({type:'UPDATE_STATUS', id:e.target.parentNode.children[0].id})
    }

    useEffect(()=>{
        setData(props)
        setTimeout(() => {
            checkthem()
        }, 0);
    }, [props])
    
    useEffect(()=>{
        checkthem()
        
        if(!navigator.userAgent.match(/Android|Mobile/i)){
            const targets = document.querySelectorAll('.listwrapper svg')
            targets.forEach(target=>{
                target.style.display = 'none'
            })
        } 
    },[])

    const handleMouseOver = (e)=>{
        if(!navigator.userAgent.match(/Android|Mobile/i)){
            const targets = document.querySelectorAll('.listwrapper svg')
            targets.forEach((target)=>{
                if(target === e.target.children[2]){
                    target.style.display = 'unset'
                }
            })
        }
    }
    const handleMouseOut = (e)=>{
        if(!navigator.userAgent.match(/Android|Mobile/i)){
            const targets = document.querySelectorAll('.listwrapper svg')
            targets.forEach((target)=>{
                if(target === e.target.children[2]){
                    target.style.display = 'none'
                }
            })
        }

    }
    const handleDragStart = (e, propIndex)=>{
        draggingToDoIndex.current = propIndex
        draggingToDoNode.current = e.target
        setTimeout(() => {
            setDragging(true)
        }, 0);
    }
    const handleDragEnter = (e, propIndex)=>{
        const currentItemIndex = draggingToDoIndex.current
        if(e.target!==draggingToDoNode.current){
            setData(oldlist =>{
                let newList = JSON.parse(JSON.stringify(oldlist))
                newList.splice(propIndex, 0, newList.splice(currentItemIndex, 1)[0])
                draggingToDoIndex.current = propIndex
                return newList
            })
        }
    }

        const handleDragEnd = ()=>{
            setDragging(false)
            draggingToDoIndex.current=null
            draggingToDoNode.current=null
            if(lists){
                dispatch({type:'REORDER_TODO', info:{data, lists}})
            }else{
                dispatch({type:'REORDER_TODO', info:{data}})
            }
    }
    const draggingStyle = (propIndex)=>{
        const currentDragItem = draggingToDoIndex.current
        if(currentDragItem === propIndex){
            return 'dnd listwrapper'
        }
        return 'listwrapper'
    }
    return data.map((prop, propIndex)=>{
        return ( 
            <div draggable
            onDragStart={(e)=>{handleDragStart(e, propIndex)}} 
            onDragEnter={dragging?(e)=>{handleDragEnter(e, propIndex)}:null}
            onDragEnd={handleDragEnd}
            onMouseOut={handleMouseOut} 
            onMouseOver={handleMouseOver} 
            className={dragging?draggingStyle(propIndex):"listwrapper" }
            key={prop.id}>
                <input type="checkbox" id={prop.id}/>
                <label onClick={handleStatus} htmlFor={prop.id}>{prop.title}</label>
                <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><title>Close</title><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/></svg>
            </div>
        )}
    );
}

export default ToDoList;