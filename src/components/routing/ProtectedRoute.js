import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../../contexts/AuthContext'
import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = ({ component : Component,  ...rest}) => {
    
    const { authState : { authLoading, isAuthenticated }} = useContext(AuthContext);

    if(authLoading)
      return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )

    return (
        <div>
            <Route  {...rest} render = { props => isAuthenticated ? 
                (
                  <>
                    <NavbarMenu />
                    <Component {...rest} {...props}/>
                  </>
                ): 
                (<Redirect to = '/login'/>) } />
        </div>
    )
}

export default ProtectedRoute
