import React from 'react';
import robImage from '../assets/rob.png';

const FeaturesSection = () => {
    return (
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 pb-32">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative">

                {/* Left Side: Key Features Card */}
                <div className="flex-1 w-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(139,49,255,0.2)] transition-all duration-300 relative z-20">
                    <div className="flex justify-center mb-8">
                        <div className="bg-[#7c3aed] text-white px-6 py-1.5 rounded-full text-[15px] font-medium tracking-wide shadow-[0_2px_10px_rgba(124,58,237,0.4)]">
                            Key Features
                        </div>
                    </div>

                    <ul className="space-y-4 text-[#e2d8ee] text-[1.05rem] font-light">
                        {[
                            "No coding required",
                            "Simple and user-friendly interface",
                            "Upload any dataset (CSV / TXT)",
                            <span key="models">Multiple ML models (Linear Regression,<br className="hidden sm:block" /> Random Forest, Neural Network, etc.)</span>,
                            "Real-time predictions",
                            "Automatic preprocessing",
                            "Clean visual charts and performance metrics"
                        ].map((text, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#ba3bf3] flex-shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(186,59,243,0.6)]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                <span className="leading-[1.7]">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side: Robot Image */}
                <div className="flex-1 w-full flex justify-center relative z-10">
                    <img
                        src={robImage}
                        alt="Robot AI Concept"
                        className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] object-contain drop-shadow-[0_0_40px_rgba(139,49,255,0.4)] animate-[float_6s_ease-in-out_infinite]"
                    />
                </div>
            </div>

            {/* Why we built it Card */}
            <div className="mt-16 lg:mt-[-40px] flex justify-center lg:justify-end w-full">
                <div className="w-full lg:w-[60%] bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(139,49,255,0.2)] transition-all duration-300 relative z-30">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#7c3aed] text-white px-6 py-1.5 rounded-full text-[15px] font-medium tracking-wide shadow-[0_2px_10px_rgba(124,58,237,0.4)]">
                            Why we built it
                        </div>
                    </div>
                    <p className="text-[#e2d8ee] text-[1.05rem] leading-[1.8] text-center font-light">
                        Machine Learning is powerful, but often complicated. We created Modelix to simplify the entire process and help users focus on solving problems — not coding algorithms.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
