import React, {useState} from 'react'
import {Button, Col, Dropdown, Form, Modal} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {useDeviceAPI} from '../../hooks/api/useDeviceAPI'

const CreateDevice = ({show, onHide}) => {

  const device = useSelector(state => state.device)
  const {createDevice} = useDeviceAPI()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [brand, setBrand] = useState({})
  const [type, setType] = useState({})

  const [info, setInfo] = useState([])

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(prev => prev.map(i => i.number === number ? {...i, [key]: value} : i))

  }
  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('img', file)
    formData.append('brandId', brand.id)
    formData.append('typeId', type.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => {
      if (data.message) {
        alert(data.message)
      }
      onHide()
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
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{type?.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {
                device.types.map(type =>
                  <Dropdown.Item key={type.id}
                                 onClick={() => setType(type)}
                  >
                    {type.name}
                  </Dropdown.Item>)
              }
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{brand?.name || 'Выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {
                device.brands.map(brand =>
                  <Dropdown.Item key={brand.id}
                                 onClick={() => setBrand(brand)}
                  >
                    {brand.name}
                  </Dropdown.Item>)
              }
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className='mt-3'
            value={name}
            placeholder='Введите название устройства'
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            value={price}
            placeholder='Введите стоимость устройства'
            onChange={e => setPrice(e.target.value)}
            type='number'
          />
          <Form.Control
            className='mt-3'
            type='file'
            onChange={selectFile}
          />
          <hr/>
          <Button
            variant='outline-dark'
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>
          {
            info.map(i =>
              <div className='d-flex mt-4' key={i.number}>
                <Col md={4}>
                  <Form.Control
                    value={i.title}
                    onChange={e => changeInfo('title', e.target.value, i.number)}
                    placeholder='Введите название свойства'
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    onChange={e => changeInfo('description', e.target.value, i.number)}
                    placeholder='Введите описание свойства'
                  />
                </Col>
                <Col md={4}>
                  <Button variant='outline-danger'
                          onClick={() => removeInfo(i.number)}
                  >
                    Удалить
                  </Button>
                </Col>
              </div>
            )
          }
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice