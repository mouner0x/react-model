import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import robotImage from '../assets/t.png';
import logo from '../assets/logo.png';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if token exists, redirect to dashboard if true
        const token = localStorage.getItem('access_token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user types
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.full_name || !formData.email || !formData.password || !formData.confirm_password) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/register', formData);

            // On success, show message and redirect after delay
            if (response.data) {
                setSuccessMessage('Account created successfully. Please login.');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.detail || err.response?.data?.message || 'An error occurred during registration');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#140b1a] relative font-sans text-white flex items-center justify-center overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-[#1b1525] opacity-50 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[45%] w-[800px] h-[800px] bg-[#ba3bf3] rounded-full opacity-30 blur-[140px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch min-h-screen lg:min-h-[700px]">

                {/* Left Side: Robot Image */}
                <div className="hidden lg:flex flex-1 justify-start items-center relative">
                    <img
                        src={robotImage}
                        alt="AI Robot Profile"
                        className="w-[90%] max-w-[500px] object-contain drop-shadow-[0_0_30px_rgba(186,59,243,0.3)] animate-float"
                    />
                </div>

                {/* Right Side: Form Content */}
                <div className="flex-1 flex flex-col justify-center items-center lg:items-start px-6 sm:px-12 py-12 relative z-20 w-full max-w-md mx-auto lg:max-w-none">

                    {/* Header */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-md">
                            Sign Up
                        </h1>
                        <img src={logo} alt="Modelix Logo" className="h-8 md:h-10 object-contain ml-2" />
                    </div>

                    {/* Form Card */}
                    <div className="w-full max-w-md bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_0_40px_rgba(139,49,255,0.15)] transition-all duration-300">

                        {successMessage && (
                            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center font-medium">
                                {successMessage}
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-white text-[15px] font-medium tracking-wide">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full bg-[#c8b8dc] text-gray-900 border border-transparent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8b5cf6] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] placeholder-gray-600 font-medium"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-white text-[15px] font-medium tracking-wide">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full bg-[#c8b8dc] text-gray-900 border border-transparent rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8b5cf6] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] placeholder-gray-600 font-medium"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 relative">
                                <label className="text-white text-[15px] font-medium tracking-wide">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full bg-[#c8b8dc] text-gray-900 border border-transparent rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#8b5cf6] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] placeholder-gray-600 font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.746 0 8.957 3.09 10.467 7.5a10.65 10.65 0 0 1-5.952 7.042m0 0H21m-1.5 0-9-9m0 0L6 3m-3 3 9 9m0 0l-3 3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 relative">
                                <label className="text-white text-[15px] font-medium tracking-wide">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full bg-[#c8b8dc] text-gray-900 border border-transparent rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#8b5cf6] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] placeholder-gray-600 font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.746 0 8.957 3.09 10.467 7.5a10.65 10.65 0 0 1-5.952 7.042m0 0H21m-1.5 0-9-9m0 0L6 3m-3 3 9 9m0 0l-3 3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col items-center">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#7c3aed] bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#8b5cf6] hover:to-[#7c3aed] text-white px-8 py-3 rounded-xl text-[1.1rem] font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                <p className="mt-6 text-[#a49ab3] text-[14.5px] font-light">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-white hover:text-[#e0d4f5] transition-colors font-medium">
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;
