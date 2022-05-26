import React, {useEffect} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import {useSelector} from 'react-redux'
import {useDeviceAPI} from '../hooks/api/useDeviceAPI'

const Shop = () => {
  const device = useSelector(state => state.device)
  const {fetchAll} = useDeviceAPI()

  useEffect(()=> {
    fetchAll()
  }, [fetchAll])

  useEffect(()=>{
    // console.log(device)
  }, [device])

  return (
    <Container>
      <Row className='mt-2'>
        <Col md={3}>
          <TypeBar/>
        </Col>
        <Col md={9}>
          <BrandBar/>
          {device.totalCount > 0 ?
            <DeviceList/> :
            <div className='h-100 d-flex justify-content-center align-items-center'
            >
              Нет товаров по данному фильтру...
            </div>
          }
          <Pages/>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop