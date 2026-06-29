// import React from 'react'

import AdoptionSection from "./components/AdoptionSection"
import Hero from "./components/Hero"
import ServiceSection from "./components/ServiceSection"
import StatsSection from "./components/StatsSection"
import TestimonialSection from "./components/TestimonialSection"
import WhyChooseUs from "./components/WhyChooseUs"

const Home = () => {
  return (
    <>
      <Hero/>
      <ServiceSection/>
      <AdoptionSection/>
      <WhyChooseUs/>
      <TestimonialSection/>
      <StatsSection/>
    </>
  )
}

export default Home
