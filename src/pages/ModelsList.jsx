import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ModelsList = () => {
    const navigate = useNavigate();
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await api.get('/dashboard/');
                
                if (res.data && res.data.success) {
                    const recentModels = res.data.data.recent_models || [];
                    setModels(recentModels);
                } else {
                    throw new Error('Failed to fetch models data');
                }

            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError('Error loading models. Please try again.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchModels();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#140b1a] text-white p-6 md:p-12 relative overflow-hidden font-sans">

            {/* Background glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#9d4edd] opacity-20 blur-[150px] pointer-events-none rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#5a189a] opacity-20 blur-[150px] pointer-events-none rounded-full"></div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

                <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-md mb-4 mt-8">
                    Select a Model for Prediction
                </h1>

                <p className="text-lg md:text-xl text-purple-200 font-light mb-12 text-center max-w-2xl px-4">
                    Choose one of your trained models below to generate new predictions.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl shadow-lg w-full max-w-2xl text-center font-medium mb-8">
                        {error}
                    </div>
                )}

                <div className="w-full max-w-5xl flex flex-col gap-6">
                    {isLoading ? (
                        <div className="text-center text-purple-200 text-xl py-12 animate-pulse">
                            Loading your models...
                        </div>
                    ) : models.length === 0 ? (
                        <div className="bg-gradient-to-br from-[#4e227a]/30 to-[#371556]/30 border border-white/10 rounded-[1.5rem] p-12 text-center shadow-lg backdrop-blur-md">
                            <h3 className="text-2xl font-semibold mb-4 text-white">No Models Found</h3>
                            <p className="text-purple-200 mb-8">You haven't trained any models yet.</p>
                            <button
                                onClick={() => navigate('/train')}
                                className="bg-gradient-to-r from-[#9d4edd] to-[#c77dff] hover:shadow-[0_0_25px_rgba(199,125,255,0.6)] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Train a New Model
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {models.map((model) => (
                                <div
                                    key={model.model_id}
                                    className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] border border-white/10 rounded-[1.5rem] p-6 flex flex-col transition-all duration-300 hover:border-purple-400/50 hover:bg-[#58258a]/60 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(157,78,221,0.4)] backdrop-blur-md hover:-translate-y-1 group"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-2 truncate group-hover:text-[#e4beff] transition-colors" title={model.name}>
                                        {model.name}
                                    </h3>

                                    <div className="text-purple-200 text-sm mb-6 flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-purple-300 w-16">Type:</span>
                                            <span className="truncate">{model.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-purple-300 w-16">Dataset:</span>
                                            <span className="truncate">{model.dataset}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="font-bold text-white text-lg rounded bg-black/20 px-3 py-1 border border-white/10">
                                                R² : {model.r2_score?.toFixed(3) || 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/predict/${model.model_id}`)}
                                        className="mt-auto w-full py-3 rounded-xl font-bold text-lg tracking-wide transition-all shadow-md bg-gradient-to-r from-[#7b35de] to-[#8e4aef] text-white group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                                    >
                                        Predict
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-16">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-purple-300 hover:text-white transition-colors underline underline-offset-4 decoration-purple-500/50 hover:decoration-white font-semibold text-lg"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelsList;