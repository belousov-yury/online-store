import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-bootstrap';
import {setMessage} from '../store/reducers/messageReducer';

export const MessageToast = () => {
  const message = useSelector(state => state.message.message)
  const [showMessage, setShowMessage] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (message) {
      setShowMessage(true)
    }
  }, [message])

  const clearMessage = () => {
    dispatch(setMessage(''))
    setShowMessage(false)
  }

  return (
    <Toast show={showMessage} className='position-absolute bottom-0 end-0'
           style={{marginBottom: 20, marginRight: 20}}
           bg={'danger'}
           delay={3000}
           autohide
           onClose={() => clearMessage()}>
      <Toast.Body className={'Primary text-white'}>
        {message}
      </Toast.Body>
    </Toast>
  )
}