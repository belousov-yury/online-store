import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from './routes'
import {useSelector} from 'react-redux';

const AppRouter = () => {
  const user = useSelector(state => state.user)
  
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component/>} exact/>)}

      {publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component/>} exact/>)}

      <Route path='*' exact element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default AppRouter