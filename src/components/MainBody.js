import { useContext, useEffect, useState } from 'react'
import { TodoListContext } from '../contexts/TodoListContext'
import Navigator from './Navigator'
import ToDoList from './ToDoList'
const MainBody = () => {
    const { lists, dispatch } = useContext(TodoListContext)
    const [title, setTitle] = useState('')
    const [darkMode, setDarkMode] = useState(false)
    const [isDeskScreen, setIsDeskScreen] = useState(false)
    
    const todarkMode = ()=>{
        return(
            document.documentElement.style.setProperty('--body-background', 'var(--Very-Dark-Blue)'),
            document.documentElement.style.setProperty('--list-background', 'var(--Very-Dark-Desaturated-Blue)'),
            document.documentElement.style.setProperty('--mobile-header-back-pic', 'var(--mobile-bg-dark)'),
            document.documentElement.style.setProperty('--desktop-header-back-pic', 'var(--desktop-bg-dark)'),
            document.documentElement.style.setProperty('--border', 'var(--Very-Dark-Grayish-Blue)'),
            document.documentElement.style.setProperty('--text', 'var(--Light-Grayish-Blue)'),
            document.documentElement.style.setProperty('--faded-text', 'var(--Very-Dark-Grayish-Blue)')
        )
    }
    const lightMode = ()=>{
        return(
            document.documentElement.style.setProperty('--body-background', 'var(--Very-Light-Grayish-Blue)'),
            document.documentElement.style.setProperty('--list-background', 'var(--Very-Light-Gray)'),
            document.documentElement.style.setProperty('--mobile-header-back-pic', 'var(--mobile-bg-light)'),
            document.documentElement.style.setProperty('--desktop-header-back-pic', 'var(--desktop-bg-light)'),
            document.documentElement.style.setProperty('--border', 'var(--Light-Grayish-Blue)'),
            document.documentElement.style.setProperty('--text', 'var(--L-Very-Dark-Grayish-Blue)'),
            document.documentElement.style.setProperty('--faded-text', 'var(--Dark-Grayish-Blue)')
            )
    }

    const handleMode = ()=>{
        return darkMode?(
            localStorage.setItem('todo_list_darkMode', false),
            lightMode(),
            setDarkMode(false)):(
                localStorage.setItem('todo_list_darkMode', true),
                todarkMode(),
                setDarkMode(true))
    }
    const [completed, setCompleted] = useState(false)
    const [active, setActive] = useState(false)
    const handleForm = (e)=>{
        e.preventDefault()
        dispatch({type:'ADD_TODO',title})
        setTitle('')
    }
    const handleClear = ()=>{
        dispatch({type:"REMOVE_COMPLETED"})
    }
    const handleSwitch = (e)=>{
        const nav = document.querySelectorAll('.navigator h4')
        const removecolor = (active)=>{
            active.style.color = "var(--Bright-Blue)"
            nav.forEach((e)=>{
                if(e!==active){
                    e.style.color = "var(--Dark-Grayish-Blue)"}
            })
        }
        switch(e.target.innerHTML){
            case 'Active':
                removecolor(e.target)
                return (setActive(true),setCompleted(false))
            case 'Completed':
                removecolor(e.target)
                return (setCompleted(true),setActive(false))
            default:
                removecolor(e.target)
                return (setActive(false),setCompleted(false))
        }
    }
    let filteredActive = lists.filter(list=>list.completed===false)
    let filteredCompleted = lists.filter(list=>list.completed===true)

    useEffect(()=>{
        if(localStorage.getItem("todo_list_darkMode")==='true'){
            todarkMode()
            setDarkMode(true)
        }
    },[])
    
    return ( 
        <div className='mainContext'>
            <div className="header">
                <h1>TODO</h1>
                <div onClick={handleMode} className="mode">
                    {darkMode && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Sunny</title><path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"/></svg>}
                    {!darkMode && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Moon</title><path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"/></svg>}
                </div>
            </div>
            <div className="wrapper">
                <form className="search-wrapper" onSubmit={handleForm}>
                    <label htmlFor="search"></label>
                    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} id='search' type="text" placeholder='Create a new todo...'/>
                </form>
                <div className="list-body">
                    {lists &&!active && !completed && <ToDoList props={lists}/>}
                    {active && <ToDoList props={filteredActive} lists = {lists}/>}
                    {completed && <ToDoList props={filteredCompleted} lists={lists}/>}

                    {!completed && !active  && !lists.length && <div className="listwrapper"><p>You have nothing listed on your todo list...</p> </div>}
                    {active && !filteredActive.length &&  <div className="listwrapper"><p>You have no active todos...</p> </div>}
                    {completed  && !filteredCompleted.length &&  <div className="listwrapper"><p>You have no completed todos...</p> </div>}
                    <div className="monitor-action">
                        <p>{filteredActive.length} items left</p>
                        {isDeskScreen && <Navigator navigator={ handleSwitch } setIsDeskScreen = {setIsDeskScreen}/>}
                        <p onClick={handleClear}>Clear Completed</p>
                    </div>
                </div>
                {!isDeskScreen && <Navigator navigator={ handleSwitch } setIsDeskScreen = {setIsDeskScreen}/>}
            </div>
            <p className="instruction">Drag and drop to reorder list</p>
        </div>
    );
}

export default MainBody;