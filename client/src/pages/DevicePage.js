import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Image} from 'react-bootstrap'
import bigStar from '../assets/img/bigStar.png'
import {useParams} from 'react-router-dom'
import {useDeviceAPI} from '../hooks/api/useDeviceAPI'
import {LoadingView} from '../components/LoadingView'

const DevicePage = () => {
  const [device, setDevice] = useState(null)
  const {id} = useParams()
  const {fetchDeviceById} = useDeviceAPI()

  useEffect(() => {
    let cleanupFunction = false
    const fetchDev = async () => {
      const dev = await fetchDeviceById(id)
      if(!cleanupFunction) setDevice(dev)
    }
    fetchDev()

    return () => cleanupFunction = true
  }, [fetchDeviceById, id])

  if(device) {
    return (
      <Container>
        <div className='mt-3 flex-nowrap d-flex justify-content-around'>
          <Col md={4}>
            <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
          </Col>
          <Col md={4}>
            <div className='d-flex flex-column align-items-center'>
              <h2>{device.name}</h2>
              <div
                className='d-flex align-items-center justify-content-center'
                style={{
                  background: `url(${bigStar}) no-repeat center center`,
                  width: 200,
                  height: 200,
                  backgroundSize: 'cover',
                  fontSize: 64
                }}
              >
                {device.rating}
              </div>
            </div>
          </Col>
          <Col md={4}
               className='d-flex flex-column align-items-center justify-content-around'
               style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
          >
            <h3>От {device.price}</h3>
            <Button variant='outline-dark'>Добавить в корзину</Button>
          </Col>
        </div>

        <div className='d-flex flex-column m-3'>
          <h1>Характеристики</h1>
          {device.info.map((info, index) =>
            <div key={info.id} style={{
              background: index % 2 === 0 ? 'lightgray' : 'transparent',
              padding: 10
            }}>
              {info.title}: {info.description}
            </div>
          )}
        </div>
      </Container>
    )
  } else {
    return (
      <LoadingView/>
    )
  }
}

export default DevicePage