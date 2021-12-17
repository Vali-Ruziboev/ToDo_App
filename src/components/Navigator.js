import { useEffect } from "react";

const Navigator = ({ navigator, setIsDeskScreen}) => {
    const changeNav = ()=>{
        if(document.body.clientWidth>500){
            const nav = document.querySelector('.navigator')
            const navChildren = document.querySelectorAll('.navigator h4')
                navChildren.forEach((e)=>{
                    e.style.margin = '0 0.5rem'
                })
                nav.style.margin = 0
                nav.style.padding = 0
                setIsDeskScreen(true)
        }else{
            const nav = document.querySelector('.navigator')
            const navChildren = document.querySelectorAll('.navigator h4')
                navChildren.forEach((e)=>{
                    e.style.margin = 0
                })
                nav.style.margin = '1rem auto'
                nav.style.padding = '15px'
                setIsDeskScreen(false)
        }
    }
    useEffect(()=>{
        changeNav()
    },[])
    document.body.onresize = ()=>{
        changeNav()
    }
    return ( 
        <div className="navigator">
            <h4 onClick={navigator}>All</h4>
            <h4 onClick={navigator}>Active</h4>
            <h4 onClick={navigator}>Completed</h4>
        </div>
    );
}
 
export default Navigator;