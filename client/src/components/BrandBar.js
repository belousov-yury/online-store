import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {setSelectedBrand} from '../store/reducers/deviceReducer';

const BrandBar = () => {
  const device = useSelector(state => state.device)
  const dispatch = useDispatch()
  return (
    <div className='d-flex flex-wrap'>
      {device.brands.map(brand =>
        <Card key={brand.id}
              className='p-3'
              onClick={()=>dispatch(setSelectedBrand(brand))}
              border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
              style={{cursor: 'pointer'}}
        >
          {brand.name}
        </Card>
      )}
    </div>
  )
}

export default BrandBar