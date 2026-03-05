import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Predict = () => {
    const { modelId } = useParams();
    const navigate = useNavigate();

    const [modelMeta, setModelMeta] = useState(null);
    const [formData, setFormData] = useState({});
    const [predictionResult, setPredictionResult] = useState(null);
    const [featureImportance, setFeatureImportance] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isPredicting, setIsPredicting] = useState(false);
    const [error, setError] = useState('');

    // ==============================
    // Fetch Model Metadata
    // ==============================
    useEffect(() => {
        const fetchModelMetadata = async () => {
            try {
                const response = await api.get(`/models/${modelId}`);

                if (response.data?.success) {
                    const data = response.data.data;
                    setModelMeta(data);

                    const initialForm = {};
                    data.training_features.forEach((feature) => {
                        initialForm[feature] = '';
                    });

                    setFormData(initialForm);
                }

            } catch (err) {

                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError(
                        err.response?.data?.detail ||
                        err.message ||
                        'Error loading model metadata.'
                    );
                }

            } finally {
                setIsLoading(false);
            }
        };

        if (modelId) fetchModelMetadata();

    }, [modelId, navigate]);

    // ==============================
    // Handle Input Change
    // ==============================
    const handleInputChange = (field, value) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));

    };

    // ==============================
    // Handle Predict
    // ==============================
    const handlePredict = async (e) => {

        e.preventDefault();

        for (const [key, val] of Object.entries(formData)) {
            if (val === '') {
                setError(`Please fill out the field: ${key}`);
                return;
            }
        }

        setIsPredicting(true);
        setError('');
        setPredictionResult(null);
        setFeatureImportance([]);

        try {

            const formattedData = {};

            modelMeta.training_features.forEach((feature) => {
                formattedData[feature] = Number(formData[feature]);
            });

            const response = await api.post(
                `/models/${modelId}/predict`,
                formattedData
            );

            let predValue = null;

            if (typeof response.data === "number") {
                predValue = response.data;
            } else if (response.data?.prediction !== undefined) {
                predValue = response.data.prediction;
            } else if (response.data?.data?.prediction !== undefined) {
                predValue = response.data.data.prediction;
            }

            if (predValue !== null) {
                setPredictionResult(predValue);

                if (response.data?.feature_importance) {
                    setFeatureImportance(response.data.feature_importance);
                }

            } else {
                throw new Error("Prediction not returned correctly.");
            }

        } catch (err) {

            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            } else {
                setError(
                    err.response?.data?.detail ||
                    err.message ||
                    'Prediction failed.'
                );
            }

        } finally {
            setIsPredicting(false);
        }

    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#140b1a] flex items-center justify-center text-white">
                Loading model layout...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1b0a2b] via-[#2d114a] to-[#1b0a2b] text-white flex flex-col items-center justify-center p-6">

            {error && (
                <div className="mb-6 text-red-400 text-center">
                    {error}
                </div>
            )}

            <div className="w-full max-w-4xl bg-[#2a1142] rounded-2xl p-10 shadow-lg">

                {/* MODEL INFO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div>
                        <div className="text-sm text-purple-300">Model</div>
                        <div className="text-xl font-bold">
                            {modelMeta?.model_name}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-purple-300">Dataset</div>
                        <div className="text-xl font-bold">
                            {modelMeta?.dataset_name}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-purple-300">Target</div>
                        <div className="text-xl font-bold text-purple-400">
                            {modelMeta?.target_column}
                        </div>
                    </div>

                </div>

                <h2 className="text-3xl font-bold text-center mb-8">
                    Predict
                </h2>

                {/* INPUT FORM */}
                <form onSubmit={handlePredict}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                        {modelMeta?.training_features?.map((feature, idx) => (

                            <div key={idx} className="flex flex-col">

                                <label className="mb-2 capitalize">
                                    {feature.replace(/_/g, ' ')}
                                </label>

                                <input
                                    type="number"
                                    step="any"
                                    value={formData[feature] || ''}
                                    onChange={(e) =>
                                        handleInputChange(feature, e.target.value)
                                    }
                                    className="bg-[#1b0a2b] border border-purple-500/30 rounded-xl px-4 py-3"
                                />

                            </div>

                        ))}

                    </div>

                    <div className="flex justify-center">

                        <button
                            type="submit"
                            disabled={isPredicting}
                            className="bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-4 rounded-xl text-xl font-bold"
                        >
                            {isPredicting ? 'Calculating...' : 'Predict'}
                        </button>

                    </div>

                </form>

                {/* RESULT */}
                {predictionResult !== null && (

                    <div className="mt-12">

                        <div className="text-center mb-10">

                            <div className="text-purple-300 mb-2">
                                Predicted Value
                            </div>

                            <div className="text-5xl font-extrabold text-white">
                                {Number(predictionResult).toFixed(2)}
                            </div>

                        </div>

                        {/* XAI */}
                        <div className="bg-purple-800/30 p-6 rounded-xl">

                            <h3 className="text-xl font-bold mb-6 text-center">
                                Model Explanation (XAI)
                            </h3>

                            <div className="space-y-4">

                                {featureImportance.map((f, index) => {

                                    const positive = f.impact >= 0;

                                    return (

                                        <div key={index} className="flex items-center">

                                            <div className="w-40 capitalize">
                                                {f.feature.replace(/_/g, ' ')}
                                            </div>

                                            <div className="flex-1 mx-4 bg-purple-900 rounded-full h-4 overflow-hidden">

                                                <div
                                                    className={`h-4 ${positive ? 'bg-green-400' : 'bg-red-400'}`}
                                                    style={{
                                                        width: `${Math.min(Math.abs(f.impact) * 100, 100)}%`
                                                    }}
                                                />

                                            </div>

                                            <div className={`ml-2 ${positive ? 'text-green-400' : 'text-red-400'}`}>
                                                {positive ? '↑' : '↓'}
                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-center gap-6 mt-10">

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-purple-600 px-6 py-3 rounded-xl"
                                >
                                    Save Prediction
                                </button>

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-purple-500 px-6 py-3 rounded-xl"
                                >
                                    Try Another Model
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Predict;