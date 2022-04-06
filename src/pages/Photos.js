import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
    const params = useParams()
    const axios = require('axios');
    const URL = 'https://sport-photo-app.herokuapp.com/api'
    
    const [photos, setPhotos] = useState([])
    const [user, setUser] = useState({name: '', balance: '', photos: []})
    const [buying, setBuying] = useState(false)

    const uid = JSON.parse(localStorage.getItem('user'))?.uid 
    
    const buyPhoto = (photoId) => {
      setBuying(true)

      const data = {user: uid, photo: photoId}
      axios.patch(`${URL}/photos/buy`, data)
      .then((response) => {
        console.log('BUY PHOTO',response.data)
        if(response.data.success) {
          getUser()
        }
      })
      .then(() => {
        setBuying(false)
      })
      .catch(function (error) {
        console.log(error);
      })
    }
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
      const getUser = () => {
        if(uid) {
          axios.get(`${URL}/user/${uid}`).then(response => {
            console.log('GET USER',response.data)
            if(response.data.success) {
              setUser(response.data.item)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }
      useEffect(()=> {
        getPhotos()
        getUser()
      },[])
    return (
        <div className='container d-flex flex-wrap'>
            {photos.map(photo => ( 
               <div className='father-photos w-50' key={photo.id}>
                    <img className='w-100 photos' src={photo.url} alt={photo.price}/>
                    <div className='w-100 photo-overlay p-5'>
                        <h2 className='text-light'>{photo.price}</h2>
                        <button onClick={()=> buyPhoto(photo.id)} className={`btn btn-success ${(user.photos.includes(photo.id) || buying) && 'disabled'}`}>Comprar</button>
                    </div>
               </div>
            ))}
        </div>
    );
};

export default Photos;