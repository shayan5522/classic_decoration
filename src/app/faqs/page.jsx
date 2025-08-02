'use client';
import React from 'react';

export default function Page() {
    const faqList = [
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept credit/debit cards, bank transfers, and digital wallets.'
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship worldwide. Delivery times may vary based on location.'
        },
        {
            question: 'Can I return an item?',
            answer: 'Absolutely! Returns are accepted within 14 days of delivery. Terms apply.'
        },
        {
            question: 'How can I track my order?',
            answer: 'Once shipped, you’ll receive a tracking number via email or SMS.'
        }
    ];

    return (
        <section className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h1>
            <div className="space-y-6">
                {faqList.map((faq, index) => (
                    <div key={index} className="p-6 border rounded-lg shadow-sm bg-white">
                        <h3 className="text-xl font-semibold text-yellow-700">{faq.question}</h3>
                        <p className="mt-2 text-gray-700">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
