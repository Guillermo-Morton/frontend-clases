import React, {useState} from 'react';

const Register = () => {
  const [values, setValues] = useState({email: '', password: '', name: ''})
  const axios = require('axios');
  const URL = process.env.URL
  const handleChange = (target) => {
    setValues({...values, [target.name]: target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${URL}/user`, values)
      .then(function (response) {
        console.log('POST USUARIO',response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className='container'>
      <p>register</p>
      <form onSubmit={handleSubmit} className='w-50'>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input onChange={(e) => handleChange(e.target)} name="name" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input onChange={(e) => handleChange(e.target)} name="email"  type="email" className="form-control"/>
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input onChange={(e) => handleChange(e.target)} name="password" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;