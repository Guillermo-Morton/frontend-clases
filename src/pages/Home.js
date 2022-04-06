import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    const axios = require('axios');
    const URL = 'https://sport-photo-app.herokuapp.com/api'
    
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
                <div className='my-2  father-event' key={event.id}>
                    <Link to={`/photos/${event.id}`}>
                        <img className='w-100 events' src={event.url} alt={event.nombre} />
                        <div className='w-100 event-overlay p-5'>
                            <h2 className='text-light'>{event.name}</h2>
                        </div>
                    </Link>
                   
                </div>
            ))}
        </div>
    );
};

export default Home;