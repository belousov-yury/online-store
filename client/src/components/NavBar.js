import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import {NavLink, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {ADMIN_ROUTE, LOGIN_ROUTE} from '../utils/consts';
import {useUserAPI} from '../hooks/api/useUserAPI';

const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {logout} = useUserAPI()
  const user = useSelector(state => state.user)

  const logOut = () => {
    logout()
    navigate(LOGIN_ROUTE)
  }

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <NavLink to='/' style={{color: 'white'}}>КупиДевайс</NavLink>
        <Nav className='ml-auto' style={{color: 'white'}}>
          {user.isAuth && user.userData ?
            <>
              {user.userData.role === 'ADMIN' &&
                <Button variant={'outline-light'}
                        onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Админ панель
                </Button>
              }

              <Button variant={'outline-light'}
                      onClick={() => logOut()} className='ms-2'
              >
                Выйти
              </Button>
            </>
            :
            <>
              {
                location.pathname !== LOGIN_ROUTE &&
                <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
              }
            </>

          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar