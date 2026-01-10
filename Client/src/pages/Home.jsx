import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Banner from '../components/Banner'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <HeroSection/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home
