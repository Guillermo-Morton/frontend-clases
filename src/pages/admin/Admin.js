import React, {useState, useEffect} from 'react';
import CrudEventos from './CrudEventos';
import CrudPhotos from './CrudPhotos';



const Admin = () => {
  return (
    <div className='container'>
      <h1>Administracion</h1>
      
      <CrudEventos />

      <CrudPhotos />
    </div>
  );
};

export default Admin;