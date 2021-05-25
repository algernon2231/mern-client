import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext}  from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
  //context 
  const { loginUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    username:'',
    password:''
  });

  const [alert,setAlert] = useState(null);


  const { username,password} = loginForm;

  const onChangeLoginForm = (e) => setLoginForm({...loginForm,[e.target.name]:e.target.value });

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if(loginData.success){
       // history.push('/dashboard')
      } else {
        setAlert({ type:'danger', message: loginData.message  });
        setTimeout(() => {
          setAlert(null);
        },4000)
      }
        
    }
    catch(err){
      console.log(err);
    }
  }
    return <Form onSubmit = {login}>
      <AlertMessage info = {alert} />
      <Form.Group>
        <Form.Control  
          type="text" 
          placeholder="Username" 
          name='username' required 
          value = { username }
          onChange = { onChangeLoginForm }
        />
      </Form.Group>
      <Form.Group>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          name='password' required
          value = {password} 
          onChange = { onChangeLoginForm 
          
          }
        />
      </Form.Group>
      <Button variant="success" type="submit">Login</Button>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant ="info" size="sm" className="ml-2">Register</Button>
        </Link>
      </p>
    </Form>
}

export default LoginForm
