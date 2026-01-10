import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Events from '../pages/Events'
import EventDetails from '../pages/EventDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'

const AppRouter = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/events' element={<Events/>}/>
     <Route path='/events/:id' element={<EventDetails/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default AppRouter;
