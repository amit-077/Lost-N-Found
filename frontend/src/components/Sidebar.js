import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Sidebar() {
    const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(false);
    return (
        <div>
        
        <nav className={'nav-menu active'}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
              </Link>
                </li>
            <a onClick={showSidebar}>X</a>
            <ul>
                <li>Hi</li> 
            </ul>
          
        </nav>
    
        </div>
    )
}

export default Sidebar
