import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import robotAvatar from '../assets/p.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [summary, setSummary] = useState({
        datasets_count: 0,
        models_count: 0,
        latest_model: { r2_score: 0 }
    });

    const [recentModels, setRecentModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/dashboard/');
                if (res.data && res.data.success) {
                    const dashboardData = res.data.data;

                    setSummary({
                        datasets_count: dashboardData.stats?.datasets_uploaded || 0,
                        models_count: dashboardData.stats?.models_trained || 0,
                        latest_model: dashboardData.stats?.latest_model || { r2_score: 0 }
                    });

                    setRecentModels(dashboardData.recent_models || []);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#140b1a] flex items-center justify-center">
                <div className="text-white text-xl">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#140b1a] text-white p-6">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* HEADER CARD */}
                <div className="relative bg-gradient-to-br from-[#5a189a] to-[#7b2cbf] rounded-3xl p-8 shadow-2xl border border-white/20">

                    {/* LOGOUT ICON TOP LEFT */}
                    <button
                        onClick={handleLogout}
                        className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 
                                   backdrop-blur-md p-3 rounded-full 
                                   transition-all duration-300 hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5A2.25 2.25 0 0015.75 18.75V15m3-3l-3-3m3 3l-3 3m3-3H9"
                            />
                        </svg>
                    </button>

                    <div className="flex flex-col xl:flex-row justify-between items-center gap-8">

                        <div className="flex items-center gap-6">
                            <img src={robotAvatar} alt="robot" className="w-28 h-28" />
                            <div>
                                <h1 className="text-3xl font-bold">
                                    Hi, {user?.full_name?.split(' ')[0] || 'User'} 👋
                                </h1>
                                <p className="text-purple-200 mt-2">
                                    Welcome back to Modelix!
                                </p>
                                <p className="text-purple-200/80 mt-3 max-w-md">
                                    Manage your datasets, train models, and make predictions—all from one place.
                                </p>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="flex gap-6">

                            <StatCard
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth={2} stroke="currentColor"
                                        className="w-7 h-7 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 7.5 12 3l9 4.5-9 4.5L3 7.5Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 12l9 4.5 9-4.5" />
                                    </svg>
                                }
                                value={summary.datasets_count}
                                label="Datasets Uploaded"
                            />

                            <StatCard
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth={2} stroke="currentColor"
                                        className="w-7 h-7 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9.75 3v3m4.5-3v3M4.5 8.25h15M6.75 21h10.5A2.25 2.25 0 0 0 19.5 18.75V8.25H4.5v10.5A2.25 2.25 0 0 0 6.75 21Z" />
                                    </svg>
                                }
                                value={summary.models_count}
                                label="Models Trained"
                            />

                            <StatCard
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth={2} stroke="currentColor"
                                        className="w-7 h-7 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 13.125h4.5v7.875H3V13.125Zm6.75-6h4.5V21h-4.5V7.125Zm6.75-4.5H21V21h-4.5V2.625Z" />
                                    </svg>
                                }
                                value={`R² = ${summary.latest_model?.r2_score?.toFixed(3) || "0.000"}`}
                                label="Latest Model"
                            />

                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <ActionButton
                        onClick={() => navigate('/upload')}
                        label="Upload Dataset"
                    />

                    <ActionButton
                        onClick={() => navigate('/train')}
                        label="Train Model"
                    />

                    <ActionButton
                        onClick={() => navigate('/models')}
                        label="Make Prediction"
                    />

                </div>

                {/* RECENT MODELS */}
                <div className="bg-gradient-to-br from-[#5a189a] to-[#7b2cbf] rounded-3xl shadow-xl overflow-hidden border border-white/20">
                    <div className="py-5 text-center text-2xl font-semibold border-b border-white/20">
                        Recent Models
                    </div>

                    <table className="w-full text-center">
                        <thead className="bg-black/20">
                            <tr>
                                <th className="py-4">Model</th>
                                <th>Type</th>
                                <th>Dataset</th>
                                <th>R²</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentModels.length > 0 ? (
                                recentModels.map((model, index) => (
                                    <tr key={index} className="border-t border-white/10">
                                        <td className="py-4">{model.name}</td>
                                        <td>{model.type}</td>
                                        <td>{model.dataset}</td>
                                        <td>{model.r2_score?.toFixed(3)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-10 text-purple-200">
                                        No recent models found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

const StatCard = ({ icon, value, label }) => (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl px-6 py-5 text-center border border-white/20 w-40">
        <div className="flex justify-center mb-3">{icon}</div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-sm text-purple-200 mt-1">{label}</div>
    </div>
);

const ActionButton = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="bg-gradient-to-r from-[#9d4edd] to-[#c77dff] 
                   hover:scale-105 hover:shadow-[0_0_25px_rgba(199,125,255,0.6)]
                   transition-all duration-300 
                   rounded-2xl py-6 flex items-center justify-center
                   text-xl font-semibold shadow-xl">
        {label}
    </button>
);

export default Dashboard;