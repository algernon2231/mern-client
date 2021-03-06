import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username:'',
    password:'',
    confirmPassword:''
  });

  const [alert,setAlert] = useState(null);


  const { username,password,confirmPassword} = registerForm;

  const onChangeRegisterForm = (e) => setRegisterForm({...registerForm,[e.target.name]:e.target.value });

  const register = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setAlert({ type: 'danger',message: 'Password do not match'})
        setTimeout(() => {
            setAlert(null);
        },4000)
        return ;
    }
    try {
      const registerData = await registerUser(registerForm);
        if(!registerData.success){
        setAlert({ type:'danger', message: registerData.message  });
        setTimeout(() => {
          setAlert(null);
        },4000)
      }
        
    }
    catch(err){
      console.log(err);
    }
  }
    return(
        <Form onSubmit = { register }>
            <AlertMessage info = { alert } />
            <Form.Group>
                <Form.Control 
                    type="text" 
                    placeholder="Username" 
                    name='username' 
                    required 
                    value = {username}
                    onChange = { onChangeRegisterForm}
            />
            </Form.Group>
            <Form.Group>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name='password' 
                    required 
                    value = {password}
                    onChange = { onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                     type="password"
                      placeholder="Confirm Password" 
                      name='confirmPassword' 
                      required 
                      value = { confirmPassword }
                      onChange = { onChangeRegisterForm }
            />
            </Form.Group>
        <Button variant="success" type="submit">Register</Button>
        <p>
        You already have an account?
        <Link to="/Login">
            <Button variant ="info" size="sm" className="ml-2">Login</Button>
        </Link>
        </p>
    </Form>
    )
}

export default RegisterForm
