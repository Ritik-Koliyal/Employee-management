import Login from './pages/Login'
import './App.css'
import { initializeAuth } from './services/auth.service'
import { useEffect } from 'react'
function App() {

    let initialized = false
    useEffect(() => {
      if (initialized) return;
        initializeAuth();
        initialized = true
    }, []);

  return (
   <>
   <Login/>
   </>
  )
}

export default App
