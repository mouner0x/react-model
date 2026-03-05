import React, { useState } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setFormData({ fullName: '', email: '', message: '' });
    };

    return (
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 pb-32">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-[2.75rem] md:text-5xl font-extrabold text-white mb-5 tracking-tight drop-shadow-md">
                    Contact Us
                </h2>
                <p className="text-[1.05rem] md:text-[1.15rem] text-[#c1b5cf] font-light leading-relaxed px-4 mb-4">
                    If you have any questions, feedback, or need help with your dataset<br className="hidden md:block" /> or model training, feel free to contact us using the form below.
                </p>
                <p className="text-[1.1rem] md:text-[1.2rem] text-white font-semibold tracking-wide drop-shadow-sm">
                    Our team will get back to you as soon as possible
                </p>
            </div>

            <div className="flex justify-center w-full">
                <div className="w-full max-w-2xl bg-[#3f2177]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_0_40px_rgba(139,49,255,0.25)] transition-all duration-300 relative z-20">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullName" className="text-white text-[15px] font-medium tracking-wide">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#20103b] text-white border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa] transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] placeholder-gray-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-white text-[15px] font-medium tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#20103b] text-white border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa] transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] placeholder-gray-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-white text-[15px] font-medium tracking-wide">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full bg-[#20103b] text-white border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa] transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] placeholder-gray-400 resize-y"
                            ></textarea>
                        </div>

                        <div className="mt-2 flex flex-col items-center">
                            <button
                                type="submit"
                                className="w-full sm:w-auto min-w-[200px] bg-[#7c3aed] bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#8b5cf6] hover:to-[#7c3aed] text-white px-8 py-3.5 rounded-full text-[1.05rem] font-medium tracking-wide transition-all duration-300 transform hover:scale-[1.03] shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                            >
                                Send Message
                            </button>

                            {showSuccess && (
                                <p className="text-[#a78bfa] mt-4 text-sm font-medium animate-pulse">
                                    Message sent successfully!
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
