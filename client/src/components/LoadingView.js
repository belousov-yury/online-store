import React from 'react'
import {Spinner} from 'react-bootstrap';

export const LoadingView = () => {
  return(
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Spinner animation={'border'}/>
    </div>
  )
}