import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoPaw } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import faqImg from "../../assets/faq-Photoroom.png";

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
    <div className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="rounded-3xl bg-pink-card px-4 py-8 sm:px-8 lg:px-20 lg:py-0">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="hidden justify-center lg:flex">
            <img
              src={faqImg}
              alt="FAQ Dog"
              className="w-full max-w-md object-contain"
            />
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold uppercase text-primary">
              Quick Help
              <IoPaw />
            </p>

            <p className="mb-8 mt-2 text-3xl font-bold text-heading sm:text-4xl">
              Frequently Asked Questions
            </p>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-pink-100 bg-white"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left font-semibold text-heading transition hover:bg-pink-50"
                  >
                    <span className="min-w-0 flex-1">{faq.question}</span>

                    {openIndex === index ? (
                      <FiMinus className="ml-auto shrink-0 text-xl text-primary" />
                    ) : (
                      <FiPlus className="ml-auto shrink-0 text-xl text-heading" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="px-5 pb-4 leading-relaxed text-text">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-6 flex items-center gap-2 font-bold text-primary transition-all hover:gap-3">
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
