import React from 'react'
import {Pagination} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setPage} from '../store/reducers/deviceReducer';

const Pages = () => {
  const dispatch = useDispatch()
  const device = useSelector(state => state.device)
  const pageCount = Math.ceil(device.totalCount / device.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination className='mt-5'>
      {
        pages.map(page =>
          <Pagination.Item
            style={{cursor: 'pointer'}}
            active={device.page === page}
            onClick={() => dispatch(setPage(page))}
            key={page}
          >
            {page}
          </Pagination.Item>
        )
      }
    </Pagination>
  )
}

export default Pages;