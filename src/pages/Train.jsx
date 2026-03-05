import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MODELS = [
    {
        id: 'neural_network',
        name: 'Neural Network',
        description: 'Deep model for learning complex relationships',
        features: [
            'Learns nonlinear patterns',
            'Flexible architecture',
            'High accuracy for large data'
        ]
    },
    {
        id: 'random_forest',
        name: 'Random Forest Regressor',
        description: 'Ensemble model with strong accuracy for nonlinear patterns',
        features: [
            'Handles complex relationships',
            'Better accuracy',
            'Good for mixed data'
        ]
    },
    {
        id: 'xgboost',
        name: 'XGBoost Regressor',
        description: 'Highly optimized boosting method for best performance',
        features: [
            'Very high accuracy',
            'Handles missing values',
            'Great for large datasets'
        ]
    },
    {
        id: 'svm',
        name: 'Support Vector Machine',
        description: 'Effective for medium-sized regression tasks',
        features: [
            'Works with kernels',
            'Good margin optimization',
            'Stable performance'
        ]
    },
    {
        id: 'linear_regression',
        name: 'Linear Regression',
        description: 'A simple model for continuous values. Fast and interpretable',
        features: [
            'Best for numeric features',
            'Very fast training',
            'Easy to interpret'
        ]
    }
];

const Train = () => {
    const navigate = useNavigate();

    const [datasetId, setDatasetId] = useState('');
    const [datasetSummary, setDatasetSummary] = useState({
        file_name: '',
        rows: '',
        columns: ''
    });
    const [selectedTarget, setSelectedTarget] = useState('');

    const [selectedModel, setSelectedModel] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const dId = localStorage.getItem('dataset_id');
        const dPreviewStr = localStorage.getItem('dataset_preview');
        const st = localStorage.getItem('selected_target') || '';

        if (!dId) {
            navigate('/upload');
            return;
        }

        setDatasetId(dId);

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
    }, [navigate]);

    const handleContinue = async () => {
        if (!selectedModel || !datasetId || isSubmitting) return;

        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.post('/models/select', {
                dataset_id: datasetId,
                model_type: selectedModel
            });

            // ✅ backend بيرجع model_id مباشرة
            const modelId = response.data?.model_id;

            if (!modelId) {
                throw new Error('Model ID not returned from server');
            }

            // خزّن model_id
            localStorage.setItem('model_id', modelId);

            // روح صفحة التدريب
            navigate('/training');

        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            } else {
                setError(
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    err.message ||
                    'Failed to select the model.'
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[100vh] bg-gradient-to-br from-[#1b0a2b] via-[#2d114a] to-[#1b0a2b] font-sans text-white relative overflow-hidden flex flex-col items-center">

            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#9d4edd] opacity-20 blur-[150px] pointer-events-none rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#5a189a] opacity-20 blur-[150px] pointer-events-none rounded-full"></div>

            {error && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-3 rounded-xl shadow-lg">
                    {error}
                </div>
            )}

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center p-6 md:p-10">

                <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-md mb-3 mt-4">
                    Choose a Model
                </h1>

                <p className="text-lg md:text-xl text-purple-200 font-light mb-8 text-center max-w-2xl px-4">
                    Select a machine learning model to train on your dataset
                </p>

                {/* Dataset Summary */}
                <div className="bg-[#4e227a]/40 border border-[#b279e8]/30 rounded-full py-3 px-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md flex flex-col items-center justify-center text-sm md:text-base font-medium tracking-wide mb-12 text-center">
                    <div className="text-white flex flex-wrap justify-center items-center gap-y-1">
                        <span className="font-semibold text-purple-200">Dataset:</span>
                        <span className="ml-1">{datasetSummary.file_name}</span>
                        <span className="text-purple-400 mx-2">|</span>

                        <span className="font-semibold text-purple-200">Rows:</span>
                        <span className="ml-1">{datasetSummary.rows}</span>
                        <span className="text-purple-400 mx-2">|</span>

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

                {/* Models */}
                <div className="w-full flex flex-wrap justify-center gap-6 mb-12">
                    {MODELS.map((model) => {
                        const isSelected = selectedModel === model.id;

                        return (
                            <div
                                key={model.id}
                                className={`w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm rounded-[1.5rem] p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 relative border cursor-pointer group ${
                                    isSelected
                                        ? 'bg-gradient-to-b from-[#7129b1]/80 to-[#501e7a]/80 border-[#d091fc] shadow-[0_0_25px_rgba(182,109,249,0.5)] transform scale-[1.02] -translate-y-1'
                                        : 'bg-gradient-to-b from-[#4e227ab0] to-[#6d2c91b0] border-white/10 hover:border-purple-400/50 hover:bg-[#58258a]/60 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
                                } backdrop-blur-md`}
                                onClick={() => setSelectedModel(model.id)}
                            >
                                <h3 className="text-xl font-bold text-white tracking-wide mb-2 mt-4">
                                    {model.name}
                                </h3>

                                <p className="text-sm text-purple-200/90 leading-relaxed mb-6 font-light h-10 flex items-center justify-center">
                                    {model.description}
                                </p>

                                <ul className="flex-grow flex flex-col items-start gap-4 mb-8 text-[15px] font-medium text-white/90 w-full pl-2">
                                    {model.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 w-full text-left">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#c77dff] mt-2 flex-shrink-0"></div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md mt-auto ${
                                        isSelected
                                            ? 'bg-[#9d4edd] text-white'
                                            : 'bg-[#7b35de] group-hover:bg-[#8e4aef] text-white'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedModel(model.id);
                                    }}
                                >
                                    {isSelected ? 'Selected ✓' : 'Select Model'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Continue */}
                <div className="mb-12">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedModel || isSubmitting}
                        className={`text-white text-xl font-bold py-4 px-16 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(123,53,222,0.4)] ${
                            (!selectedModel || isSubmitting)
                                ? 'bg-[#5a189a] opacity-60 cursor-not-allowed'
                                : 'bg-[#7b35de] hover:bg-[#8e4aef]'
                        }`}
                    >
                        {isSubmitting ? 'Saving...' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Train;