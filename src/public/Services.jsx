// import React from 'react'

import CTASection from "./components/CTASection"
import HowItWorks from "./components/HowItWorks"
import ServicesGrid from "./components/ServicesGrid"
import ServicesHero from "./components/ServicesHero"

const Services = () => {
  return (
    <>
      <ServicesHero/>
      <ServicesGrid/>
      <HowItWorks/>
      <CTASection/>
    </>
  )
}

export default Services
