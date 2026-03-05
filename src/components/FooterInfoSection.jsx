import React from 'react';

const FooterInfoSection = () => {
    return (
        <section className="relative w-full max-w-6xl mx-auto px-6 py-20 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-16 md:gap-0">

                {/* Left Side: Contact Information */}
                <div className="flex-1 w-full md:pr-16 flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[1.75rem] font-bold text-white mb-10 tracking-wide drop-shadow-sm">
                        Contact Information
                    </h3>

                    <ul className="space-y-8 text-white">
                        <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[1.6rem] h-[1.6rem] mt-0.5 opacity-90 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-[1.15rem] leading-tight mb-1 group-hover:text-[#e0d4f5] transition-colors">Email Support</h4>
                                <p className="text-[#a49ab3] text-[15px] font-light">support@modelix.com</p>
                            </div>
                        </li>

                        <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[1.6rem] h-[1.6rem] mt-0.5 opacity-90 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.217-.266.15-.664-.13-.889l-4.14-3.3m7.65 7.242-2.37-2.91M15.17 11.42l3.053-2.492c.267-.217.665-.15.89-.131l3.3 4.14m-7.242-7.65 2.91 2.37M2.433 13.916 4.346 15.83M3.1 11.2 5.01 13.11M16.5 16.5l2 2" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.184 10.22 3.593-3.61c.404-.403 1.056-.4 1.458.006l4.22 4.256c.402.405.399 1.056-.007 1.459l-3.594 3.61c-.403.404-1.055.402-1.457-.004l-4.22-4.256a1.037 1.037 0 0 1 .007-1.459Z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-[1.15rem] leading-tight mb-1 group-hover:text-[#e0d4f5] transition-colors">Technical Support</h4>
                                <p className="text-[#a49ab3] text-[15px] font-light">tech@modelix.com</p>
                            </div>
                        </li>

                        <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[1.6rem] h-[1.6rem] mt-0.5 opacity-90 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-[1.15rem] leading-tight mb-1 group-hover:text-[#e0d4f5] transition-colors">Business & Collaboration</h4>
                                <p className="text-[#a49ab3] text-[15px] font-light">business@yourproject.com</p>
                            </div>
                        </li>

                        <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[1.6rem] h-[1.6rem] mt-0.5 opacity-90 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-[1.15rem] leading-tight mb-1 group-hover:text-[#e0d4f5] transition-colors">Response Time</h4>
                                <p className="text-[#a49ab3] text-[15px] font-light">Usually within 24 hours</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-[1px] self-stretch bg-white/10 shrink-0 mx-8 mt-12 mb-8"></div>
                <div className="block md:hidden h-[1px] w-full bg-white/10 my-4"></div>

                {/* Right Side: FAQ Quick Links */}
                <div className="flex-1 w-full md:pl-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[1.75rem] font-bold text-white mb-10 tracking-wide drop-shadow-sm">
                        FAQ Quick Links
                    </h3>

                    <ul className="space-y-6 md:space-y-8 w-full max-w-sm">
                        {[
                            "How to upload my dataset?",
                            "How to train a model?",
                            "What is the supported file format?",
                            "How does prediction work?"
                        ].map((link, idx) => (
                            <li key={idx} className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer w-full">
                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] transition-all"></div>
                                <span className="text-white text-[1.1rem] font-medium opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all">
                                    {link}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default FooterInfoSection;
