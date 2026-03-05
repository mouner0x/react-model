import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UploadReview = () => {
    const navigate = useNavigate();
    const [datasetData, setDatasetData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storedPreview = localStorage.getItem('dataset_preview');
        const datasetId = localStorage.getItem('dataset_id');

        if (!storedPreview || !datasetId) {
            navigate('/upload');
            return;
        }

        try {
            setDatasetData(JSON.parse(storedPreview));
        } catch (e) {
            console.error('Invalid dataset_preview in localStorage');
            navigate('/upload');
        }

        setIsLoading(false);
    }, [navigate]);

    const handleContinue = async () => {
        if (!selectedTarget) return;

        setIsSaving(true);
        setError('');

        const datasetId = localStorage.getItem('dataset_id');

        try {
            const response = await api.post(
                `/datasets/${datasetId}/select-target`,
                { target_column: selectedTarget }
            );

            if (response.data && response.data.success) {

                // ✅ خزّن الـ target عشان يظهر في صفحة المودل
                localStorage.setItem('selected_target', selectedTarget);

                // ❌ متحذفش dataset_preview هنا

                navigate('/train');
            } else {
                setError(response.data?.message || 'Failed to select target column.');
                setIsSaving(false);
            }

        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            } else {
                setError(err.response?.data?.message || 'An error occurred selecting target.');
            }
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#140b1a] flex items-center justify-center font-sans text-white">
                <div className="text-xl animate-pulse">Loading dataset details...</div>
            </div>
        );
    }

    if (!datasetData) return null;

    const previewHeaders =
        datasetData.preview?.length > 0
            ? Object.keys(datasetData.preview[0])
            : [];

    return (
        <div className="min-h-screen bg-[#140b1a] font-sans text-white p-6 md:p-10 relative overflow-hidden flex flex-col items-center">

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9d4edd] opacity-20 blur-[150px] rounded-full"></div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md mb-8 text-center mt-4">
                Dataset Details
            </h1>

            <div className="w-full max-w-5xl space-y-6">

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm w-full mb-4">
                        {error}
                    </div>
                )}

                {/* File + Stats */}
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] border border-white/10 rounded-[1.5rem] p-6 lg:p-8 flex-1 flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
                        <div className="flex flex-col items-center mb-6 space-y-1 text-center">
                            <div>
                                <span className="font-semibold">File Name:</span>{' '}
                                <span className="text-purple-200">{datasetData.file_name}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Uploaded on:</span>{' '}
                                <span className="text-purple-200">{datasetData.uploaded_at}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 justify-center">

                        <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] p-6 w-[120px] text-center">
                            <div className="text-sm mb-2">Rows</div>
                            <div className="text-3xl font-bold">{datasetData.rows}</div>
                        </div>

                        <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] p-6 w-[120px] text-center">
                            <div className="text-sm mb-2">Columns</div>
                            <div className="text-3xl font-bold">{datasetData.columns}</div>
                        </div>

                        <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] p-6 w-[140px] text-center">
                            <div className="text-sm mb-2">File Size</div>
                            <div className="text-2xl font-bold">{datasetData.file_size_mb} MB</div>
                        </div>

                    </div>
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] overflow-hidden">

                    <div className="py-4 text-center font-bold text-xl border-b border-white/10">
                        Preview (First 6 Rows)
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead className="bg-[#5c2a8c]/50">
                                <tr>
                                    {previewHeaders.map((header, i) => (
                                        <th key={i} className="py-3 px-4">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {datasetData.preview?.map((row, i) => (
                                    <tr key={i}>
                                        {previewHeaders.map((header, j) => (
                                            <td key={j} className="py-3 px-4">{row[header]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Column Types */}
                <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] overflow-hidden">

                    <div className="py-4 text-center font-bold text-xl border-b border-white/10">
                        Column Types
                    </div>

                    <table className="w-full text-center">
                        <thead className="bg-[#5c2a8c]/50">
                            <tr>
                                <th className="py-3 px-4">Column</th>
                                <th className="py-3 px-4">Type</th>
                                <th className="py-3 px-4">Missing Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datasetData.column_analysis?.map((col, i) => (
                                <tr key={i}>
                                    <td className="py-3 px-4">{col.column}</td>
                                    <td className="py-3 px-4">{col.type}</td>
                                    <td className="py-3 px-4">{col.missing_values}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Select Target */}
                <div className="bg-gradient-to-br from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] p-8">

                    <h2 className="text-xl font-bold text-center mb-6">
                        Select Target Column
                    </h2>

                    <div className="max-w-md mx-auto">
                        <select
                            value={selectedTarget}
                            onChange={(e) => setSelectedTarget(e.target.value)}
                            className="w-full bg-[#1b0d26]/80 text-white border border-purple-400/30 rounded-xl px-4 py-3"
                        >
                            <option value="">-- Select Target Column --</option>
                            {datasetData.column_analysis?.map((col, i) => (
                                <option key={i} value={col.column}>
                                    {col.column} ({col.type})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center">
                    <p className="text-purple-200 mb-6 text-lg">
                        Choose a machine learning model and start training
                    </p>

                    <button
                        onClick={handleContinue}
                        disabled={!selectedTarget || isSaving}
                        className="text-white text-xl font-bold py-3.5 px-12 rounded-xl bg-[#7b35de] hover:bg-[#8e4aef]"
                    >
                        {isSaving ? 'Saving...' : 'Continue..'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UploadReview;