import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HowItWorks from '../components/HowItWorks';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import ContactSection from '../components/ContactSection';
import FooterInfoSection from '../components/FooterInfoSection';
import robot from '../assets/robot.png';

const Landing = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('access_token');

    const handleGetStarted = () => {
        if (token) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('dataset_id');
        localStorage.removeItem('model_id');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#140b1a] relative font-sans text-white pb-32">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-[#1b1525] opacity-50 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[45%] w-[800px] h-[800px] bg-[#ba3bf3] rounded-full opacity-35 blur-[140px] pointer-events-none"></div>

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-6 h-screen flex flex-col md:flex-row items-center justify-center pt-24 md:pt-0">
                <div className="flex-1 flex flex-col items-start gap-8 z-20 mt-10 md:mt-0">
                    <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.15] tracking-tight text-white drop-shadow-lg">
                        Train Machine<br />
                        Learning Models<br />
                        Without Code
                    </h1>

                    <p className="text-[1.1rem] text-gray-300 max-w-md leading-relaxed font-light mt-2">
                        Upload your dataset, train a model, and generate predictions instantly.
                    </p>

                    {!token ? (
                        <button
                            onClick={handleGetStarted}
                            className="group mt-6 flex items-center justify-between gap-6 bg-[#7c3aed] bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#8b5cf6] hover:to-[#7c3aed] text-white pl-8 pr-2 py-2 rounded-full text-lg font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                        >
                            <span>Get Started</span>
                            <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                →
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="group mt-6 bg-gradient-to-r from-[#7b35de] to-[#8e4aef] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5A2.25 2.25 0 0015.75 18.75V15m3-3l-3-3m3 3l-3 3m3-3H9"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex-1 flex justify-center md:justify-end relative z-10 mt-16 md:mt-0">
                    <img
                        src={robot}
                        alt="AI Robot"
                        className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] object-contain drop-shadow-[0_0_40px_rgba(139,49,255,0.3)] animate-float"
                    />
                </div>
            </main>

            <HowItWorks />
            <AboutSection />
            <FeaturesSection />
            <ContactSection />
            <FooterInfoSection />
        </div>
    );
};

export default Landing;