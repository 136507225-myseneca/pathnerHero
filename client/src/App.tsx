import React, { FC, useEffect } from 'react'
import { actionCreators } from './state'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import axios from 'axios'

import Header from './componets/Header/Header'
import Home from './pages/Home'
import Libary from './componets/Libary/Libary'
import { getLibary } from './state/action-creators'

const App: FC = () => {
  const dispatch = useDispatch()
  const { setUser } = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    const getUser = async () => {
      const response = await axios
        .get(`/api/users/auth/login`, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(err)
        })

      if (response?.status === 200) {
        setUser(response?.data)
        dispatch(getLibary(response?.data.user.spotifyId))
      }
    }
    getUser()
  }, [dispatch, setUser])

  return (
    <Router>
      <Header />

      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/libary' element={<Libary />} />
      </Routes>
    </Router>
  )
}

export default App
