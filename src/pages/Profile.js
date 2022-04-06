import React, {useEffect, useState} from 'react';

const Profile = () => {
    // const user = 
    const [user, setUser] = useState({name: '', balance: '', photos: []})
    const [photos, setPhotos] = useState([])
    const [selling, setSelling] = useState(false)
    const uid = JSON.parse(localStorage.getItem('user'))?.uid 
    const axios = require('axios');
    const URL = 'https://sport-photo-app.herokuapp.com/api'

    const getUser = (id) => {
        axios.get(`${URL}/user/${id}`).then(response => {
          console.log('GET USER',response.data)
          if(response.data.success) {
            setUser(response.data.item)
            getPhotos(response.data.item.photos)
          }
        }).catch(error => {
          console.log(error)
        })
      }

    const getPhotos = (array) => {
        axios.post(`${URL}/photo/ids`, {ids: array}).then(response => {
            console.log('GET PHOTO',response.data)
            if(response.data.success) {
                setPhotos(response.data.items)
            }
        }).catch(error => {
        console.log(error)
        })       
    }
    const sellPhoto = (photoId) => {
        setSelling(true)
        const data = {user: uid, photo: photoId}
        axios.patch(`${URL}/photos/sell`, data)
        .then(function (response) {
          console.log('BUY PHOTO',response.data)
          if(response.data.success) {
            getUser(uid)
          }
        })
        .then(() => {
          setSelling(false)
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    useEffect(() => {
        getUser(uid)
    }, [])
    return (
        <div className='container'>
            <div className='p-3 d-flex'>
            <p className='mx-2'>{user.name}</p>
            <p className='mx-2'>Balance: {user.balance}</p>
            </div>

            <h2>Photos</h2>
            <div className='d-flex flex-wrap'>
            {photos.length ? photos.map(photo => ( 
               <div className='father-photos w-50' key={photo.id}>
                    <img className='w-100 photos' src={photo.url} alt={photo.price}/>
                    <div className='w-100 photo-overlay p-5'>
                        <h2 className='text-light'>{photo.price}</h2>
                        <button onClick={()=> sellPhoto(photo.id)} className={`btn btn-success ${selling && 'disabled'}`}>Vender</button>
                    </div>
               </div>
            )) : <p>No tienes fotos</p>}
        </div>
        </div>
    );
};

export default Profile;