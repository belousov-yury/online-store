import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';
import {setSelectedType} from '../store/reducers/deviceReducer';

const TypeBar = () => {
  const device = useSelector(state => state.device)
  const dispatch = useDispatch()
  return (
    <ListGroup>
      {device.types.map(type =>
        <ListGroup.Item key={type.id}
                        style={{cursor: 'pointer'}}
                        active={type.id === device.selectedType.id}
                        onClick={() => dispatch(setSelectedType(type))}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default TypeBar