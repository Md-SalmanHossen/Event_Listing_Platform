import React from "react";
import { Ticket, Calendar, Users, Star } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Events Hosted", value: "1,200+" },
    { label: "Tickets Sold", value: "50K+" },
    { label: "Active Organizers", value: "200+" },
    { label: "Cities Covered", value: "15+" },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-green-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600"
            alt="Concert background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-green-500 rounded-full">
            Connecting Communities
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            The Heart of Every <span className="text-green-400">Great Event.</span>
          </h1>

          <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Amra biswas kori prottekta event-er pichone thake ekta golpo. Amader
            platform-er lokkho holo sei golpo gulo ke sohoje manush-er kache
            pouchiye dewa.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Platform for Your Next Experience?
            </h2>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Seamless Ticketing</h3>
                <p className="text-gray-600">
                  Jhamela-mukto ticket booking system, ja apnar shomoy bachabe.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Curated Experiences</h3>
                <p className="text-gray-600">
                  Music fest theke shuru kore tech workshop—shob dhoroner event ek-i
                  jaygay.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Organizer Friendly</h3>
                <p className="text-gray-600">
                  Event create kora theke shuru kore analytics dekha, shob-i khub
                  shohoj.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
              alt="People at an event"
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-600 rounded-2xl -z-0 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Star className="w-10 h-10 text-amber-400 mx-auto mb-6 fill-amber-400" />
          <h2 className="text-2xl md:text-3xl font-medium italic text-gray-800 leading-relaxed">
            "This platform changed the way we host our annual tech conferences. The
            attendee management is world-class!"
          </h2>
          <div className="mt-8">
            <p className="font-bold text-gray-900">Rahat Chowdhury</p>
            <p className="text-gray-500">Founder, Dhaka Tech Summit</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
