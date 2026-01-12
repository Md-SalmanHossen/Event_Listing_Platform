import React from 'react'
import Banner from './../components/Banner';
import EventCard from '../components/EventCard';
import UpcomingEvent from '../components/UpcommingEvent';

const HomePage = () => {
  return (
    <div>
      {/* hero section */}
      <EventCard/>
      <UpcomingEvent/>
      <Banner/>
    </div>
  )
}

export default HomePage
