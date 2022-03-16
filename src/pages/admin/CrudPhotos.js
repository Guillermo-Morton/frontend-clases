import React, {useState, useEffect} from 'react';

const CrudPhotos = () => {
  const [values, setValues] = useState({url: '', price: '', event: ''})
  const [photos, setPhotos] = useState([])
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

  const getPhotos = () => {
    axios.get(`${URL}/photo`).then(response => {
      console.log('GET EVENT',response.data)
      if(response.data.success) {
        setPhotos(response.data.items)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const deletePhotos = (id) => {
    axios.delete(`${URL}/photo/${id}`).then(response => {
      console.log('DELETE EVENT',response.data)
      if(response.data.success) {
        getPhotos()
      }
    }).catch(error => {
      console.log(error)
    })
  }
  
  const editPhotos = (id) => {
    axios.get(`${URL}/photo/${id}`).then(response => {
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
    setValues({url: '', price: '', event: ''})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.event.length > 0 && values.url.length >= 10 )  {
      if(editing) {
        axios.patch(`${URL}/photo/${values.id}`, values)
        .then(function (response) {
          console.log('PATCH EVENT',response.data)
          if(response.data.success) {
            setValues({url: '', price: '', event: ''})
            setEditing(false)
            getPhotos()
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      } else {
        axios.post(`${URL}/photo`, values)
        .then(function (response) {
          console.log('POST EVENT',response.data)
          if(response.data.success) {
            setValues({url: '', price: '', event: ''})
            getPhotos()
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
    getPhotos()
    getEvents()
  },[])

  return (
    <div className='p-3'>
      <h2 className='my-2'>Crear photos</h2>
      <form onSubmit={handleSubmit} className='w-50 mb-5'>
        <div className="mb-3">
          <label className="form-label">Url</label>
          <input onChange={(e) => handleChange(e.target)} minLength={5} name="url" value={values.url} required type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input onChange={(e) => handleChange(e.target)} name="price" value={values.price} required type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Event</label>
          <select onChange={(e) => handleChange(e.target)} value={values.event} className="form-control" name="event">
              <option value="">Select an event</option>
              {events.map(event => (
                  <option key={event.id + event.name} value={event.id}>{event.name}</option>
              ))}
          </select>
          {/* <input onChange={(e) => handleChange(e.target)} minLength={10} name="event" value={values.event} required type="text" className="form-control" /> */}
        </div>
        <button type="submit" className="btn btn-primary">{editing ? 'Edit' : 'Save'}</button>
        {editing && <button className="btn btn-primary mx-2" onClick={cancelEditing}>Cancel</button>}
      </form>

      <h2 className='my-2'>Listado de photos</h2>
      <table>
          <tbody>
            <tr>
              <th>Url</th>
              <th>Price</th>
              <th>Event</th>
            </tr>
            {photos.map(photo => (
              <tr key={photo.id}>
                <td>{photo.url.slice(0,30) + '...'}</td>
                <td>{photo.price}</td>
                <td>{photo.event}</td>
                <td><button onClick={() => deletePhotos(photo.id)} className='btn-primary btn mx-3'>Delete</button></td>
                <td><button onClick={() => editPhotos(photo.id)} className='btn-primary btn mx-3'>Edit</button></td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default CrudPhotos;