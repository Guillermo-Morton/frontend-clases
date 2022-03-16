import React, {useState, useEffect} from 'react';

const CrudEventos = () => {
  const [values, setValues] = useState({name: '', url: '', date: ''})
  const [events, setEvents] = useState([])

  const [editing, setEditing] = useState(false)

  const axios = require('axios');
  const URL = 'http://localhost:8080/api'

  const handleChange = (target) => {
    setValues({...values, [target.name]: target.value})

  }

  const getEvents = () => {
    axios.get(`${URL}/event`).then(response => {
      console.log('GET EVENT',response.data)
      if(response.data.success) {
        setEvents(response.data.items)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const deleteEvents = (id) => {
    axios.delete(`${URL}/event/${id}`).then(response => {
      console.log('DELETE EVENT',response.data)
      if(response.data.success) {
        getEvents()
      }
    }).catch(error => {
      console.log(error)
    })
  }
  
  const editEvents = (id) => {
    axios.get(`${URL}/event/${id}`).then(response => {
      console.log('GET EVENT BY ID',response.data)
      if(response.data.success) {
        setValues(response.data.item)
        setEditing(true)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  const cancelEditing = () => {
    setEditing(false)
    setValues({name: '', url: '', date: ''})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.name.length >= 5 && values.url.length >= 10 && values.date.length >=10)  {
      if(editing) {
        axios.patch(`${URL}/event/${values.id}`, values)
        .then(function (response) {
          console.log('PATCH EVENT',response.data)
          if(response.data.success) {
            setValues({name: '', url: '', date: ''})
            setEditing(false)
            getEvents()
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      } else {
        axios.post(`${URL}/event`, values)
        .then(function (response) {
          console.log('POST EVENT',response.data)
          if(response.data.success) {
            setValues({name: '', url: '', date: ''})
            getEvents()
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    } else {
      console.log('Campos invalidos')
    }
  }


  useEffect(()=> {
    getEvents()
  },[])

  return (
    <div className='p-3'>

      <h2 className='my-2'>Crear eventos</h2>

      <form onSubmit={handleSubmit} className='w-50 mb-5'>
        <div className="mb-3">
          <label className="form-label">Event name</label>
          <input onChange={(e) => handleChange(e.target)} minLength={5} name="name" value={values.name} required type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input onChange={(e) => handleChange(e.target)} minLength={10} name="url" value={values.url} required type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input onChange={(e) => handleChange(e.target)} minLength={10} name="date" value={values.date} required type="date" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">{editing ? 'Edit' : 'Save'}</button>
        {editing && <button className="btn btn-primary mx-2" onClick={cancelEditing}>Cancel</button>}
      </form>

      <h2 className='my-2'>Listado de eventos</h2>
      <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Url</th>
              <th>Date</th>
            </tr>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.url.slice(0,30) + '...'}</td>
                <td>{event.date}</td>
                <td><button onClick={() => deleteEvents(event.id)} className='btn-primary btn mx-3'>Delete</button></td>
                <td><button onClick={() => editEvents(event.id)} className='btn-primary btn mx-3'>Edit</button></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default CrudEventos;