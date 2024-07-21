import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../auth/css/Logout.css'

function Logout() {
  const usenavigate = useNavigate()
  const handleOut = () => {
  sessionStorage.clear()
    usenavigate('/login')
  }

  return (
    <header>
      <button onClick={handleOut} >Logout</button>
    </header>

  )
}

export default Logout