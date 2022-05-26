import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap';
import {useDeviceAPI} from '../../hooks/api/useDeviceAPI';

const CreateBrand = ({show, onHide}) => {

  const [brandName, setBrandName] = useState('')
  const {createBrand} = useDeviceAPI()

  const addBrand = () => {
    createBrand({name: brandName}).then(data => {
      if (data.message) {
        alert(data.message)
      } else {
        setBrandName('')
        onHide()
        alert('Бренд добавлен')
      }
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder='Введите название бренда'
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
          >

          </Form.Control>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addBrand}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand