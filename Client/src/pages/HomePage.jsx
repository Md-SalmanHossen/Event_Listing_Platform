import UpcomingEvent from '../components/UpcommingEvent';
import Hero from '../components/Hero';
import About from './About';
import { Contact } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <UpcomingEvent/>
      <About/>
      <Contact/>
    </div>
  )
}

export default HomePage
