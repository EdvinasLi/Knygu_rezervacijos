import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

//Admino komponentai
import Saloons from './pages/admin/Saloons/Saloons'
import NewSaloon from './pages/admin/Saloons/New'
import EditSaloon from './pages/admin/Saloons/Edit'

//Vartotojo komponentai
import PublicSaloons from './pages/Saloons'

import PublicNewOrder from './pages/NewOrder'


//Autentifikacijos komponentai
import Login from './pages/Login'
import Register from './pages/Register'

//Kontekstas
import MainContext from './context/MainContext'

//Baziniai komponentai
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import './App.css';

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
      .then(resp => {
        setUserInfo(resp.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin keliai */}
            {userInfo.role === 1 &&
              <Route path="admin">
                <Route index element={<Saloons />} />
                <Route path="saloons/new" element={<NewSaloon />} />
                <Route path="saloons/edit/:id" element={<EditSaloon />} />

              </Route>
            }
            {/* Vieši keliai */}
            <Route path="/" element={<PublicSaloons />} />
            {/* Prisijungusio vartotojo keliai */}
            {userInfo.id &&
              <>
                <Route path="new-order/:saloonId" element={<PublicNewOrder />} />

              </>
            }

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
