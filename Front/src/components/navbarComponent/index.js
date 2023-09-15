import './styles.scss'
import logo from '../../logo.svg'
import { NavLink } from './styled';
import { useState } from 'react';

function ColorSchemesExample() {
    const [seeMenu, setMenu] = useState(false)

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
                        <NavLink>Create Post</NavLink>
                        <NavLink>Posts</NavLink>
                        <NavLink>Exit</NavLink>
                    </div>
                </div>
            </header>
        </>
    );
}

export default ColorSchemesExample;