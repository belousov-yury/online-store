import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Card, Col, Image} from 'react-bootstrap'
import star from '../assets/img/star.png'
import {DEVICE_ROUTE} from '../utils/consts';

const DeviceItem = ({device}) => {
  const navigate = useNavigate()

  return (
    <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{width: 150, cursor: 'pointer'}} border='light'>
        <Image width={150} height={150} src={device.img}/>
        <div className='text-black-50 d-flex justify-content-between align-items-center mt-2'>
          <div>Samsung...</div>
          <div className='d-flex align-items-center'>
            <div>{device.rating}</div>
            <Image src={star} width={15} height={15} className='mb-1 ms-1'/>
          </div>
        </div>
        <div>
          {device.name}
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;