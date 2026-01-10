import React from "react";
const Banner = () => {
   return (
      <div className='flex flex-col md:flex-row md:items-start items-center justify-between mt-10 px-8 md:pl-14 pt-10 bg-green-500 max-w-7xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>
      <div className='text-white mb-5'>
         <h2 className='text-3xl font-medium'>Do you want to check out event host?</h2>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
         <p className='max-w-130'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quod nostrum eum corrupti eveniet dignissimos distinctio.</p>

         <button className='px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>Events</button>
      </div>
      <img src="" alt="event" className='max-h-45 mt-10' />
    </div>
   );
};

export default Banner;
