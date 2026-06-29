// import React from 'react'

import ContactFormSection from "./components/ContactFormSection"
import ContactHero from "./components/ContactHero"
import ContactInfoCards from "./components/ContactInfoCards"
import FAQSection from "./components/FAQSection"

const Contact = () => {
  return (
    <>
      <ContactHero/>
      <ContactInfoCards/>
      <ContactFormSection/>
      <FAQSection/>
    </>
  )
}

export default Contact
