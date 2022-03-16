import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
    const params = useParams()
    const axios = require('axios');
    const URL = 'http://localhost:8080/api'
    
    const [photos, setPhotos] = useState([])
    const getPhotos = () => {
        axios.get(`${URL}/photo`).then(response => {
          console.log('GET PHOTO',response.data)
          if(response.data.success) {
            setPhotos(response.data.items.filter(photo => photo.event === params.event_id))
          }
        }).catch(error => {
          console.log(error)
        })
      }
      useEffect(()=> {
        getPhotos()
      },[])
    return (
        <div className='container d-flex flex-wrap'>
            {photos.map(photo => ( 
               <div className='father-photos w-50' key={photo.id}>
                    <img className='w-100 photos' src={photo.url} alt={photo.price}/>
                    <div className='w-100 photo-overlay p-5'>
                        <h2 className='text-light'>{photo.price}</h2>
                        <button onClick={()=> console.log(photo)} className='btn btn-success'>Comprar</button>
                    </div>
               </div>
            ))}
        </div>
    );
};

export default Photos;