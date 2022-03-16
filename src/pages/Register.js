import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [values, setValues] = useState({email: '', password: '', name: ''})
  const axios = require('axios');
  const URL = 'http://localhost:8080/api'

  const navigate = useNavigate()

  const handleChange = (target) => {
    setValues({...values, [target.name]: target.value})

  }

  const handleSubmit = e => {
    e.preventDefault()
    if(values.name.length >= 5 && values.email.length >= 10 && values.password.length >= 5)  {
      axios.post(`${URL}/user`, values)
        .then(function (response) {
          console.log('POST USUARIO',response.data)
          if(response.data.success) {
            navigate('/login')
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    } else {
      console.log('Campos invalidos')
    }
  }
  return (
    <div className='container'>
      <p>register</p>
      <form onSubmit={handleSubmit} className='w-50'>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input onChange={(e) => handleChange(e.target)} name="name" minLength={5} required type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input onChange={(e) => handleChange(e.target)} name="email" minLength={10} required  type="email" className="form-control"/>
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input onChange={(e) => handleChange(e.target)} name="password" minLength={5} required type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;