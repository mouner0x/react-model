import React from 'react';
import aiImage from '../assets/ai.png';

const InfoCard = ({ badge, text, className = '' }) => (
    <div className={`relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(139,49,255,0.2)] hover:bg-white/[0.06] transition-all duration-300 ${className}`}>
        <div className="flex justify-center mb-6">
            <div className="bg-[#7c3aed] text-white px-6 py-1.5 rounded-full text-[15px] font-medium tracking-wide shadow-[0_2px_10px_rgba(124,58,237,0.4)]">
                {badge}
            </div>
        </div>
        <p className="text-[#e2d8ee] text-[1.05rem] leading-[1.8] text-center font-light">
            {text}
        </p>
    </div>
);

const AboutSection = () => {
    return (
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 pb-32">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-[2.75rem] md:text-5xl font-extrabold text-white mb-5 tracking-tight drop-shadow-md">
                    About Modelix
                </h2>
                <p className="text-[1.15rem] text-[#c1b5cf] font-light leading-relaxed px-4">
                    The simple no-code platform for training Machine Learning models.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                {/* Left Side: Images */}
                <div className="flex-1 w-full flex justify-center lg:justify-start relative">
                    <img
                        src={aiImage}
                        alt="AI Concept"
                        className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] object-contain drop-shadow-[0_0_30px_rgba(139,49,255,0.4)] animate-[float_6s_ease-in-out_infinite]"
                    />
                </div>

                {/* Right Side: Cards */}
                <div className="flex-[1.2] w-full flex flex-col gap-8 lg:pr-8 relative">
                    <InfoCard
                        badge="Simple Overview"
                        text="Modelix is a web platform that allows anyone — even without programming experience — to build, train, and use Machine Learning regression models. With an intuitive interface, users can upload their dataset, train different ML models, and generate predictions instantly."
                        className="lg:w-[90%] lg:-ml-12 relative z-20"
                    />
                    <InfoCard
                        badge="Mission"
                        text="Our mission is to make Machine Learning easy, accessible, and practical for everyone. Whether you're a student, data analyst, or business owner, Modelix helps you transform raw data into accurate predictions without writing a single line of code."
                        className="lg:w-[90%] lg:self-end lg:mt-[-40px] relative z-10"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
