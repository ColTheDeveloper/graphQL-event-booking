import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Auth from './pages/Auth/Auth'
import Event from './pages/Event/Event'
import Booking from './pages/Booking/Booking'
import Layout from './components/Layout/Layout'
import AuthProvider from './context/AuthContext'
import ProtectedRoute, { UnAccessableWhileLoggedin } from './components/ProtectedRoute/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_API_URL)

  return (
    <div className='App'>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Event />} />
            <Route element={<UnAccessableWhileLoggedin />} >
              <Route path='/auth' element={<Auth />} />
            </Route>
            <Route element={<ProtectedRoute />} >
              <Route path='/bookings' element={<Booking />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
