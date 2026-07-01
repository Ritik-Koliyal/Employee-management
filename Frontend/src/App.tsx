import Login from './pages/Login'
import './App.css'
import { initializeAuth } from './services/auth.service'
import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Registration from './pages/Registration'
import NotFound from './pages/NotFound'
function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />} >
              <Route path='/' element={<Home />} />
              <Route path='/registration' element={<Registration />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
