import uuid from 'uuid/dist/v1'
export const ToDoListReducer = (state, action)=>{
    switch(action.type){
        case "ADD_TODO":
            return[...state, {
                title:action.title, 
                completed:false,
                id:uuid()
            }]
        case "REMOVE_TODO":
            return state.filter(todo => todo.id!==action.id)
        case "UPDATE_STATUS":
            let index = state.findIndex(todo => todo.id===action.id)
            let updated = [{
                title:state[index].title,
                completed:!state[index].completed,
                id:state[index].id
            }]
            return state.map(todo=>updated.find(e=>e.id===todo.id)||todo)
        case "REMOVE_COMPLETED":
            return state.filter(todo=>todo.completed===false)
        case "REORDER_TODO":
            if(action.info.lists){
                return action.info.lists.map(list=>action.info.data.find((d, index)=>{
                    if(d.completed===list.completed){
                        let replacement = d
                        action.info.data.splice(index, 1)
                        return replacement
                    }
                    return null
                })||list)
            }
            return action.info.data
        default:
            return state
    }
}