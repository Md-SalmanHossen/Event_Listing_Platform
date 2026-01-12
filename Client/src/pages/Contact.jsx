import React from 'react';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react'; // 'lucide-react' icons use kora hoyeche

const Contact = () => {
  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm.",
      contact: "+1 (555) 000-0000"
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Us",
      description: "Our team is here to help.",
      contact: "support@company.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Visit Us",
      description: "Visit our office headquarters.",
      contact: "123 Business Avenue, New York, NY"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Working Hours",
      description: "Available for your support.",
      contact: "9:00 AM - 6:00 PM"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            We’d love to hear from you. Our friendly team is always here to chat.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="p-3 bg-green-50 rounded-lg mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              <p className="mt-4 font-semibold text-green-600">{item.contact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Google Map Placeholder / Location Section */}
      <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-200 rounded-3xl h-96 w-full flex items-center justify-center overflow-hidden relative">
          {/* Placeholder for Map */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"></div>
          <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <Globe className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Global Presence</h2>
            <p className="text-gray-600">Find us at our global offices across the world.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;