// import React from 'react'
import { useState } from "react";
import faqImg from "../../assets/faq-Photoroom.png";
import { IoPaw } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website or contact us directly by phone.",
    },
    {
      question: "What are your consultation hours?",
      answer: "We are open Monday to Sunday from 9:00 AM to 8:00 PM.",
    },
    {
      question: "Do you provide home delivery for pet food?",
      answer:
        "Yes, we offer home delivery for pet food and other pet supplies within selected locations.",
    },
    {
      question: "How can I adopt a pet?",
      answer:
        "Browse available pets, submit an adoption application, attend a meet-and-greet, and complete the approval process.",
    },
    {
      question: "Do you offer 24/7 emergency services?",
      answer:
        "Currently, emergency services are available only during extended operating hours.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-10 py-16">
      <div className="bg-pink-card rounded-3xl px-20">
        <div className="grid grid-cols-2 gap-10 items-center">

          <div className="flex justify-center">
            <img
              src={faqImg}
              alt="FAQ Dog"
              className="w-full max-w-md object-contain"
            />
          </div>

          <div>
            <p className="text-primary font-bold uppercase flex items-center gap-2">
              Quick Help
              <IoPaw />
            </p>

            <p className="text-4xl font-bold text-heading mt-2 mb-8">
              Frequently Asked Questions
            </p>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-pink-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-heading hover:bg-pink-50 transition"
                  >
                    <span>{faq.question}</span>

                    {openIndex === index ? (
                      <FiMinus className="text-primary text-xl" />
                    ) : (
                      <FiPlus className="text-heading text-xl" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="px-5 pb-4 text-text leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-primary font-bold mt-6 hover:gap-3 transition-all">
              View All FAQs
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
