import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    const axios = require('axios');
    const URL = 'http://localhost:8080/api'
    
    const [events, setEvents] = useState([])

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

    useEffect(() => {
        getEvents()
    }, [])
    

    return (
        <div className='container'>
            <p>Home</p>
            {events.map(event => (
                <div className='my-2' key={event.id}>
                    <Link to={`/photos/${event.id}`}>
                        <img className='w-100 events' src={event.url} alt={event.nombre} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Home;