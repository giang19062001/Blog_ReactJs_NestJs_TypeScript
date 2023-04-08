import React, { Fragment, useState } from 'react'
import { Login } from './components/login'
import { Register } from './components/register'

export interface closeLoginType {
  closeLogin: () => void
}

export interface openLoginType {
  openLogin: () => void
}

export const Index = () => {
  const [openLoginState, setOpenLoginState] = useState(true)

  const closeLogin = () => {
    console.log("close")
    setOpenLoginState(false)
  }
  const openLogin = () => {
    console.log("ohpen")

    setOpenLoginState(true)
  }
  console.log(openLoginState)

  return (
    <Fragment>
      {openLoginState ? <Login closeLogin={closeLogin}></Login> : <Register openLogin={openLogin}></Register>}
    </Fragment>
  )
}
