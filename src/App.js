import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Table from './component/todo/Table'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
       <ToastContainer theme='colored' position='top-center'>
       </ToastContainer>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Table/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
