import React from 'react'
import HeroSection from './../components/HeroSection';
import Banner from './../components/Banner';
import EventCard from '../components/EventCard';
import UpcomingEvent from '../components/UpcommingEvent';

const HomePage = () => {
  return (
    <div>
      <EventCard/>
      <UpcomingEvent/>
      <Banner/>
    </div>
  )
}

export default HomePage
