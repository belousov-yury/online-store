import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap';
import {useDeviceAPI} from '../../hooks/api/useDeviceAPI';

const CreateType = ({show, onHide}) => {
  const [typeName, setTypeName] = useState('')
  const {createType} = useDeviceAPI()
  const addType = () => {
    createType({name: typeName}).then(data => {
      if (data.message) {
        alert(data.message)
      } else {
        setTypeName('')
        onHide()
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
            value={typeName}
            placeholder='Введите название типа'
            onChange={e => setTypeName(e.target.value)}
          />
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType;