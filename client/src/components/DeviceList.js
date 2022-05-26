import React from 'react'
import {useSelector} from 'react-redux';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
  const device = useSelector(state => state.device)
  return (
    <div className='d-flex flex-wrap'>
      {device.devices.map(dev =>
        <DeviceItem key={dev.id} device={dev}/>
      )}
    </div>
  )
}

export default DeviceList