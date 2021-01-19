import React from 'react'

const NavbarComponent = ({ id, children }) => (
    <nav id={id} className='navbar navbar-dark bg-dark'>
        {children}
    </nav>
)

export default NavbarComponent
