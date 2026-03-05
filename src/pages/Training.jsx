import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Training = () => {
    const navigate = useNavigate();

    const [isTraining, setIsTraining] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [trainingResult, setTrainingResult] = useState(null);
    const [error, setError] = useState('');

    const [datasetSummary, setDatasetSummary] = useState({
        file_name: '',
        rows: '',
        columns: ''
    });
    const [selectedTarget, setSelectedTarget] = useState('');

    useEffect(() => {
        const dPreviewStr = localStorage.getItem('dataset_preview');
        const st = localStorage.getItem('selected_target') || '';

        if (dPreviewStr) {
            try {
                const parsed = JSON.parse(dPreviewStr);
                setDatasetSummary({
                    file_name: parsed.file_name || '',
                    rows: parsed.rows || '',
                    columns: parsed.columns || ''
                });
            } catch (e) {
                console.error('Failed to parse dataset_preview');
            }
        }

        setSelectedTarget(st);
    }, []);

    // Simulated smooth progress until backend responds
    useEffect(() => {
        let interval;
        if (isTraining && progress < 90) {
            interval = setInterval(() => {
                setProgress(prev => {
                    const next = prev + Math.random() * 8;
                    return next > 90 ? 90 : next;
                });
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isTraining, progress]);

    const handleStartTraining = async () => {
        const modelId = localStorage.getItem('model_id');

        if (!modelId) {
            setError('No model selected. Please go back and select a model.');
            return;
        }

        setIsTraining(true);
        setError('');
        setProgress(5);
        setStatusText('Preprocessing ...');
        setTrainingResult(null);

        setTimeout(() => {
            setStatusText('Training in progress — do not close this page');
        }, 2000);

        try {
            const response = await api.post('/models/train', {
                model_id: modelId
            });

            const data = response.data;

            if (data.status !== 'trained') {
                throw new Error('Training failed');
            }

            const metrics = {
                mse: data.mse,
                mae: data.mae,
                r2: data.r2_score
            };

            setProgress(100);
            setStatusText('Training Completed');
            setTrainingResult(metrics);
            setIsTraining(false);

        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            } else {
                setError(
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    err.message ||
                    'An error occurred during training.'
                );
            }
            setIsTraining(false);
            setProgress(0);
            setStatusText('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1b0a2b] via-[#2d114a] to-[#1b0a2b] font-sans text-white relative flex flex-col items-center justify-center p-6 overflow-hidden">

            <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#9d4edd] opacity-20 blur-[150px] pointer-events-none rounded-full"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#5a189a] opacity-20 blur-[150px] pointer-events-none rounded-full"></div>

            {error && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-3 rounded-xl shadow-lg w-[90%] max-w-lg text-center font-medium">
                    {error}
                </div>
            )}

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">

                <div className="bg-[#4e227a]/40 border border-[#b279e8]/30 rounded-full py-3 px-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md flex flex-col items-center justify-center text-sm md:text-base font-medium tracking-wide mb-12 text-center mt-4">
                    <div className="text-white flex flex-wrap justify-center items-center gap-y-1">
                        <span className="font-semibold text-purple-200">Dataset:</span>
                        <span className="ml-1">{datasetSummary.file_name}</span>
                        <span className="text-purple-400 mx-1">|</span>

                        <span className="font-semibold text-purple-200">Rows:</span>
                        <span className="ml-1">{datasetSummary.rows}</span>
                        <span className="text-purple-400 mx-1">|</span>

                        <span className="font-semibold text-purple-200">Columns:</span>
                        <span className="ml-1">{datasetSummary.columns}</span>
                    </div>

                    {selectedTarget && (
                        <div className="text-white mt-1 pt-0.5 border-t border-white/10 w-3/4 max-w-xs text-center border-dashed">
                            <span className="font-semibold text-[#c77dff]">Target:</span>{' '}
                            <span className="text-purple-100">{selectedTarget}</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleStartTraining}
                    disabled={isTraining || trainingResult}
                    className={`text-white text-2xl font-bold py-4 px-12 rounded-2xl shadow-[0_4px_20px_rgba(123,53,222,0.4)] transition-all duration-300 transform mb-16 ${
                        (isTraining || trainingResult)
                            ? 'bg-[#5a189a] opacity-70 cursor-not-allowed scale-100 shadow-none'
                            : 'bg-gradient-to-r from-[#7b35de] to-[#8e4aef] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:-translate-y-1'
                    }`}
                >
                    Start Training
                </button>

                {isTraining && !trainingResult && (
                    <div className="w-full max-w-2xl flex flex-col mb-16 animate-fade-in">
                        <div className="w-full bg-[#1b0a2b]/60 rounded-full h-4 mb-4 border border-white/5 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-[#9d4edd] to-[#c77dff] h-4 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(199,125,255,0.6)] relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-full">
                                    <div className="w-full h-full bg-white/20 animate-shimmer"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 items-start text-purple-200">
                            <p className="text-lg font-medium">{statusText || 'Preparing...'}</p>
                            {progress > 5 && (
                                <p className="text-sm font-light text-purple-300">
                                    Training in progress — do not close this page
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {trainingResult && (
                    <div className="w-full animate-slide-up flex flex-col items-center">

                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                            <h2 className="text-2xl font-bold text-white tracking-wide">
                                Training Result
                            </h2>

                            <div className="flex-1 max-w-2xl bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] border border-white/10 rounded-[1rem] p-6 lg:p-8 flex justify-around items-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">

                                <div className="flex flex-col items-center">
                                    <span className="text-white font-bold text-lg mb-3">MSE</span>
                                    <span className="text-2xl font-bold text-white">
                                        {Number(trainingResult.mse).toFixed(2)}
                                    </span>
                                </div>

                                <div className="w-px h-16 bg-white/20 mx-4"></div>

                                <div className="flex flex-col items-center">
                                    <span className="text-white font-bold text-lg mb-3">MAE</span>
                                    <span className="text-2xl font-bold text-white">
                                        {Number(trainingResult.mae).toFixed(2)}
                                    </span>
                                </div>

                                <div className="w-px h-16 bg-white/20 mx-4"></div>

                                <div className="flex flex-col items-center">
                                    <span className="text-white font-bold text-lg mb-3">R²</span>
                                    <span className="text-2xl font-bold text-white">
                                        {Number(trainingResult.r2).toFixed(2)}
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                            <button
                                onClick={() => navigate('/train')}
                                className="text-purple-300 hover:text-white transition-colors underline underline-offset-4 decoration-purple-500/50 hover:decoration-white font-semibold text-lg"
                            >
                                Back to Models
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="bg-gradient-to-r from-[#7b35de] to-[#8e4aef] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] text-white text-lg font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 ml-auto"
                            >
                                Start Prediction
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Training;