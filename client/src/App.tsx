import Blog from 'pages/blog/blog'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Index } from 'pages/index'

function App() {
  return (
    <Fragment>
      <ToastContainer position='bottom-left' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
