'use client';
import React, { useState } from 'react';

export default function FAQPage() {
    const faqList = [
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept credit/debit cards, bank transfers, and digital wallets.',
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship worldwide. Delivery times may vary based on location.',
        },
        {
            question: 'Can I return an item?',
            answer: 'Absolutely! Returns are accepted within 14 days of delivery. Terms apply.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Once shipped, you’ll receive a tracking number via email or SMS.',
        },
        {
            question: 'Do you provide installation services?',
            answer: 'Yes, we offer professional installation services in selected regions.',
        },
        {
            question: 'Can I customize my order?',
            answer: 'Yes, we offer product customization. Please contact support for details.',
        },
        {
            question: 'How do I contact customer service?',
            answer: 'You can reach us via our contact form, email, or WhatsApp.',
        },
        {
            question: 'Are your products covered by warranty?',
            answer: 'Yes, most products come with a 1-year limited warranty.',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-12 text-center">
                Frequently Asked <span className="text-yellow-600">Questions</span>
            </h1>
            <div className="space-y-4">
                {faqList.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg shadow-sm bg-white transition"
                    >
                        <button
                            className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                            onClick={() => toggle(index)}
                        >
                            <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                            <span className="text-yellow-600 text-xl">
                                {activeIndex === index ? '-' : '+'}
                            </span>
                        </button>
                        <div
                            className={`px-5 pb-5 text-gray-600 transition-all duration-300 ease-in-out ${
                                activeIndex === index ? 'block' : 'hidden'
                            }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
