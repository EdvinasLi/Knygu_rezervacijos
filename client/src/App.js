import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

//Admino komponentai
import Books from './pages/admin/Books/Books.js'
import NewBook from './pages/admin/Books/New'
import EditBook from './pages/admin/Books/Edit'
import Users from './pages/admin/Users/Users'
import UsersEdit from './pages/admin/Users/Edit'

//Vartotojo komponentai
import PublicBooks from './pages/Books'

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
                <Route index element={<Books />} />
                <Route path="books/new" element={<NewBook />} />
                <Route path="books/edit/:id" element={<EditBook />} />
                <Route path="users" element={<Users />} />
                <Route path="users/edit/:id" element={<UsersEdit />} />

              </Route>
            }
            {/* Vieši keliai */}
            <Route path="/" element={<PublicBooks />} />
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
