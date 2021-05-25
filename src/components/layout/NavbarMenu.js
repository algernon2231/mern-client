import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutLogo from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
    const { authState : {user : {username}}, logoutUser } = useContext(AuthContext); 

    const handlelogOut = () => logoutUser();

    return (
       <Navbar expand="lg" bg='primary' variant='dark' className='shadow'>
           <Navbar.Brand className="font-weight-bolder text-white">
               <img src={learnItLogo} alt="learnIt" width="32" height="32" className="mr-2" />LearnIt
           </Navbar.Brand>
           <Navbar.Toggle ari-controls="basic-navbar-nav"/>
           <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="font-weight-bolder text-white" to='/dashboard' as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>
                <Nav style= {{ position: 'absolute', right: 0 }} onClick = {handlelogOut}>
                    <Nav.Link className="font-weight-bolder text-white" disabled>
                        Welcome { username } &nbsp;
                        <Button variant="secondary" className="font-weight-bolder text-white" onClick = { handlelogOut }>
                            <img src={logoutLogo} alt="logOutLogo" width="32" height="32" className="me-auto" /> Logout
                        </Button>
        
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse> 
       </Navbar>
    )
}

export default NavbarMenu
