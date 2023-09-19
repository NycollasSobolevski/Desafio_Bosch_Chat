import './styles.scss'
import logo from '../../logo.svg'
import { NavLink } from './styled';
import { useState } from 'react';
import CreatePost from '../PostComponents/CreatePost';

function ColorSchemesExample() {
    const [seeMenu, setMenu] = useState(false)

    const Logout = () => {
        sessionStorage.clear();
        window.location.reload();
    }
    const toggleCreatePost = () =>{
        document.getElementById("create-post").classList.toggle("show")
        document.getElementById("create-post").classList.toggle("popup")
        document.getElementById("blur-bg").classList.toggle("show")
        document.getElementById("blur-bg").classList.toggle("popup")
    }

    return (
        <>
            <header>
                <div className="main-container">
                    <div className="brand-logo">
                        <div className="logo">
                            <img src={logo} alt="" width={40}/>
                            <span>BOSCH</span>
                        </div>
                        <button className="navlinks-togle-container" onClick={() => setMenu(!seeMenu)}>
                            <div className="button-icon">
                                <span className={seeMenu? "menu-open-icon":""}></span>
                                <span className={seeMenu? "menu-open-icon":""}></span>
                                <span className={seeMenu? "menu-open-icon":""}></span>
                                <span className={seeMenu? "menu-open-icon":""}></span>
                            </div>
                            <div>Menu</div>
                        </button>
                    </div>
                    <div className={`links ${seeMenu? "menu-open":""}`}>
                        <NavLink onClick={() => toggleCreatePost()}>Create Post</NavLink>
                        <NavLink>Posts</NavLink>
                        <NavLink onClick={() => Logout()}>Exit</NavLink>
                    </div>
                </div>
            </header>
            <div id="blur-bg" onClick={() => toggleCreatePost()} className='popup'></div>
            <div className={"create-post popup" } id='create-post'>
                <CreatePost></CreatePost>
            </div>
        </>
    );
}

export default ColorSchemesExample;