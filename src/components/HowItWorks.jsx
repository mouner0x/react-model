import React from 'react';

const Card = ({ icon, title, description, bullets }) => (
    <div className="flex-1 flex flex-col items-center text-center bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 pb-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(139,49,255,0.25)] hover:scale-[1.02] transition-all duration-300">
        <div className="bg-[#51239c] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] text-white">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 tracking-wide">{title}</h3>
        <p className="text-[#c1b5cf] text-[15px] leading-[1.6] mb-8 min-h-[72px]">
            {description}
        </p>
        <ul className="text-left w-full space-y-3.5 text-[#e0e0e0] text-[14.5px]">
            {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 opacity-90">
                    <div className="mt-[6px] w-[5px] h-[5px] rounded-full bg-white flex-shrink-0 shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                    <span className="leading-snug">{bullet}</span>
                </li>
            ))}
        </ul>
    </div>
);

const HowItWorks = () => {
    return (
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-[2.75rem] md:text-5xl font-extrabold text-white mb-5 tracking-tight drop-shadow-md">
                    How It Works
                </h2>
                <p className="text-[1.15rem] text-gray-300 font-light leading-relaxed px-4">
                    A simple 3-step process to train and use Machine Learning<br className="hidden md:block" /> models without writing any code.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch object-center">
                <Card
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    }
                    title="1. Upload Your Dataset"
                    description="Upload your CSV or TXT file. Preview your data and choose the target column you want to predict"
                    bullets={[
                        "Any dataset format (CSV / TXT)",
                        "Automatic column detection",
                        "View first rows instantly"
                    ]}
                />
                <Card
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-9 h-9">
                            <path d="M12 2a2 2 0 0 1 2 2v.5h2a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 16 17.5h-8A2.5 2.5 0 0 1 5.5 15V7A2.5 2.5 0 0 1 8 4.5h2V4a2 2 0 0 1 2-2zM8 6A1.5 1.5 0 0 0 6.5 7v8A1.5 1.5 0 0 0 8 16.5h8a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 16 6H8zm4.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm1.5-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                        </svg>
                    }
                    title="2.Train a Model"
                    description="Choose a model like Linear Regression, Random Forest, or Neural Network. Set hyperparameters and start training with one click"
                    bullets={[
                        "Multiple ML models",
                        "Automatic preprocessing",
                        "Performance metrics + charts"
                    ]}
                />
                <Card
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                    }
                    title="3.Make Predictions"
                    description="After training, enter new values using the dynamic form and get instant predictions based on your trained model"
                    bullets={[
                        "Dynamic form based on your dataset",
                        "Real-time prediction",
                        "Save and reuse your models"
                    ]}
                />
            </div>
        </section>
    );
};

export default HowItWorks;
