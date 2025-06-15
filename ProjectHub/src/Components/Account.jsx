import React, { useState } from 'react';

const Account = () => {
  // FAQ data
  const faqs = [
    {
      question: "What is Project Hub?",
      answer: "Project Hub is a centralized platform designed to manage final-year academic projects, making it easier for students, faculty, and administrators to collaborate and track project progress."
    },
    {
      question: "Where can I update my profile information?",
      answer: "Contact your department’s admin team via email at admin@gmail.com or visit the administrative office ."
    },
    {
      question: "How do I contact support?",
      answer: "For Further help email admin@gmail.com"
    },
    {
      question: " Why is this restricted to admins?",
      answer: "To prevent unauthorized changes, ensure data consistency across institutional systems, and comply with academic record-keeping policies."
    },
    {
      question: "What happens after a student submits a project title",
      answer: "The submitted title will appear as “Pending” until it is reviewed and approved or rejected by a supervisor."
    },
    {
      question: "Is my data secure on this platform",
      answer: "Yes. Project Hub uses secure login systems and stores data safely in a protected database to ensure confidentiality."
    },
    {
      question: "How do I know if my title has been approved?",
      answer: "You will receive a status update on your dashboard once your supervisor reviews your submission."
    },
  ];

  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ padding: '15px', maxWidth: '700px', margin: '0 auto', fontSize: '14px' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '40px' }}>FAQs</h1>
      
      <div style={{ marginTop: '25px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '15px' }}>Frequently Asked Questions</h2>
        <div style={{ marginTop: '10px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '8px', 
                border: '1px solid #e0e0e0', 
                borderRadius: '4px',
                overflow: 'hidden',
                fontSize: '13px'
              }}
            >
              <div
                style={{
                  padding: '10px 12px',
                  background: '#f8f8f8',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onClick={() => toggleFAQ(index)}
              >
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{faq.question}</h3>
                <span style={{ fontSize: '14px' }}>
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              
              {activeIndex === index && (
                <div style={{ 
                  padding: '12px 15px', 
                  background: 'white',
                  fontSize: '13px',
                  lineHeight: '1.4'
                }}>
                  <p style={{ margin: 0 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;