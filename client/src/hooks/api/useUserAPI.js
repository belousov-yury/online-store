import {$host, $authHost} from '../../http/createAxios'
import jwt_decode from 'jwt-decode'
import {useDispatch} from 'react-redux';
import {setIsAuth, setUserData} from '../../store/reducers/userReducer'
import {useCallback, useState} from 'react'
import {setMessage} from '../../store/reducers/messageReducer';

export const useUserAPI = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const registration = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
      localStorage.setItem('token', data.token)
      dispatch(setUserData(jwt_decode(data.token)))
      dispatch(setIsAuth(true))
    } catch (e) {
      dispatch(setMessage(e.response.data.message))
    }
    setLoading(false)
  }, [dispatch])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const {data} = await $host.post('api/user/login', {email, password})
      localStorage.setItem('token', data.token)
      dispatch(setUserData(jwt_decode(data.token)))
      dispatch(setIsAuth(true))
    } catch (e) {
      dispatch(setMessage(e.response.data.message))
    }
    setLoading(false)
  },[dispatch])

  const check = useCallback(async () => {
    setLoading(true)
    try {
      const {data} = await $authHost.get('api/user/auth')
      localStorage.setItem('token', data.token)
      dispatch(setUserData(jwt_decode(data.token)))
      dispatch(setIsAuth(true))

    } catch (e) {
      console.log(e.response.data.message)
      dispatch(setIsAuth(false))
    }
    setLoading(false)
  },[dispatch])

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(setUserData({}))
    dispatch(setIsAuth(false))
  }

  return {login, registration, logout, check, loading}

}
