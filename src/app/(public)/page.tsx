import React from 'react';
import Hero from "@/components/modules/home/Hero";
import EventSlider from "@/components/modules/home/EventSlider";
import EventCategories from "@/components/modules/home/EventCategories";
import CTA from "@/components/modules/home/CTA";


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      <main className="flex-grow">

        <Hero />

        <div className="bg-gray-50/50">
          <EventSlider />
        </div>

        <EventCategories />

        <CTA />
      </main>

    </div>
  );
};

export default HomePage;






