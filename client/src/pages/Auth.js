import React, {useEffect, useState} from 'react'
import {Button, Card, Container, Form} from 'react-bootstrap'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useUserAPI} from '../hooks/api/useUserAPI'

export const Auth = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {login, registration, loading} = useUserAPI()
  const isAuth = useSelector(state => state.user.isAuth)
  const isLogin = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clickHandler = async () => {
    if (isLogin) {
      await login(email, password)
    } else {
      await registration(email, password)
    }

  }

  useEffect(() => {
    if (isAuth) {
      navigate(SHOP_ROUTE)
    }
  }, [isAuth, navigate])


  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54}}
      onKeyPress={e => {
        if (e.code === 'Enter') clickHandler()
      }}
    >
      <Card style={{width: 600}} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control className='mt-3'
                        placeholder='Введите ваш email...'
                        autoComplete='on'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
          />
          <Form.Control className='mt-3'
                        placeholder='Введите ваш пароль...'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
          />
          <div className='d-flex justify-content-between align-items-center mt-3'>
            <div className='d-flex al align-items-center'>
              {isLogin ?
                <>Нет аккаунта? <NavLink className='ms-2' to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></>
                :
                <>Есть аккаунт? <NavLink className='ms-2' to={LOGIN_ROUTE}>Войдите!</NavLink></>
              }
            </div>
            <Button variant='outline-success'
                    onClick={clickHandler}
                    disabled={loading}
            >
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </div>

        </Form>
      </Card>
    </Container>
  )
}