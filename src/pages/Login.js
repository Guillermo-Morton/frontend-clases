import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [values, setValues] = useState({email: '', password: ''})
  const axios = require('axios');
  const URL = 'https://sport-photo-app.herokuapp.com/api'
  const [error, setError] = useState(undefined)

  const navigate = useNavigate()

  const handleChange = (target) => {
    setValues({...values, [target.name]: target.value})

  }

  const handleSubmit = e => {
    e.preventDefault()
    if(values.email.length >= 10 && values.password.length >= 5)  {
      axios.post(`${URL}/login`, values)
        .then(function (response) {
          console.log('POST LOGIN',response.data)
          if(response.data.success) {
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('user', JSON.stringify(response.data.item))
            navigate('/')
          } else {
            setError(response.data.msg)
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
      <p>Login</p>
      <form onSubmit={handleSubmit} className='w-50'>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input onChange={(e) => handleChange(e.target)} name="email" minLength={10} required  type="email" className="form-control"/>
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input onChange={(e) => handleChange(e.target)} name="password" minLength={5} required type="password" className="form-control" />
        </div>
        <p>{error}</p>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;