import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a session?",
      answer: "You can book a session by navigating to our Sessions page or photogrpahers , selecting your preferred time slot, and clicking the 'Book Now' button. You'll need to create an account or log in to complete your booking."
    },
    {
      question: "What products do you offer?",
      answer: "We offer a range of products including  cameras,Lenses,Lighting Camera Bags and Memory Card. Visit our Products page to browse our full catalog."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Strip. payments is processed securely through our payment gateway."
    },
    {
      question: "Can I book a session before paying?",
      answer: "Yes, you can do that. You can complete the payment process before 24 hours from the profile page, or this session will be made available to other users  "
    },
    {
      question: "How can I save my session or order details after payment?",
      answer: "After completing your payment, you will receive a confirmation email containing all the session or order details, including the photographer's information or order details"
    },
    {
      question: "How many sessions can I book per day?",
      answer: "You can only book one session per day."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6  mt-12  bg-gradient-to-b from-white to-purple-50">
      <h2 className="text-3xl font-bold text-[#704e81] mb-8 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <span className="text-lg font-medium text-[#704e81]">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[#704e81]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#704e81]" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="p-4 bg-white border-t border-gray-200">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;