import Login from './pages/Login'
import './App.css'
import { initializeAuth } from './services/auth.service'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
function App() {

  let initialized = false
  useEffect(() => {
    console.log(window.location.pathname, 'path')

    if (window.location.pathname !== '/login') {
      if (initialized) return;
      initializeAuth();
      initialized = true
    }

  }, []);

  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
