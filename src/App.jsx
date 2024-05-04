import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/HomePage/Homepage'
import Authentication from './Components/Authentication/Authentication'
import "./index.css"

function App() {

  return (
    <>
    <Routes>
      <Route path='/*' element={true? <Homepage/> : <Authentication/>}/>
      {/* <Route path='/home' element={<Homepage/>}/> */}
    </Routes>
    </>
  )
}

export default App
