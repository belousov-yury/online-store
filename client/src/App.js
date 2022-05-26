import React, {useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import AppRouter from './routes/AppRouter'
import NavBar from './components/NavBar'

import 'bootstrap/dist/css/bootstrap.min.css'
import {MessageToast} from './components/MessageToast'
import {useUserAPI} from './hooks/api/useUserAPI'
import {LoadingView} from './components/LoadingView'

function App() {
  const {check, loading} = useUserAPI()

  useEffect(() => {
    check()
  }, [check])

  if (loading) {
    return <LoadingView/>
  }

  return (
    <Router>
      <div className='App'>
        <NavBar/>
        <AppRouter/>
        <MessageToast/>
      </div>
    </Router>
  )
}

export default App
