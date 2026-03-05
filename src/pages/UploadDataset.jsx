import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UploadDataset = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef(null);

    const validateFile = (selectedFile) => {
        setError('');
        if (!selectedFile) return false;

        const validExtensions = ['.csv', '.txt'];
        const fileName = selectedFile.name.toLowerCase();
        const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

        if (!isValidExtension) {
            setError('Invalid file type. Only .csv and .txt files are allowed.');
            return false;
        }

        const maxSize = 50 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
            setError('File size exceeds the 50 MB limit.');
            return false;
        }

        return true;
    };

    const handleFile = (selectedFile) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleRemove = () => {
        setFile(null);
        setError('');
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleContinue = async () => {
        if (!file) return;

        setIsUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/datasets/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data && response.data.success) {

                const dataset = response.data.data;

                // ✅ تخزين كل بيانات الرفع
                localStorage.setItem('dataset_id', dataset.dataset_id);
                localStorage.setItem('dataset_preview', JSON.stringify(dataset));

                navigate('/upload/review');
            } else {
                setError('Failed to upload the dataset.');
            }

        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            } else {
                setError(err.response?.data?.message || 'An error occurred during upload.');
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#140b1a] relative font-sans text-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#9d4edd] opacity-20 blur-[150px] rounded-full"></div>

            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">

                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    Upload Your Dataset
                </h1>

                <p className="text-purple-200 text-lg mb-8">
                    Upload your CSV or TXT file to start training your model
                </p>

                {!file && (
                    <div
                        className={`w-full max-w-2xl bg-gradient-to-b from-[#4e227a] to-[#361665] border transition-all duration-300 rounded-[2rem] p-10 md:p-16 flex flex-col items-center justify-center shadow-2xl ${dragActive ? 'border-purple-400' : 'border-white/10'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            accept=".csv, .txt"
                            onChange={handleChange}
                        />

                        <h3 className="text-2xl font-bold mb-4">
                            Drag & Drop your dataset here
                        </h3>

                        <button
                            onClick={onButtonClick}
                            className="text-[#c77dff] text-xl font-bold underline"
                        >
                            Browse files
                        </button>
                    </div>
                )}

                {file && (
                    <div className="w-full max-w-2xl flex flex-col items-center">

                        <div className="w-full bg-gradient-to-r from-[#4e227ab0] to-[#6d2c91b0] rounded-[1.5rem] p-6 flex items-center justify-between mb-10">
                            <span className="text-xl font-bold">{file.name}</span>
                            <button onClick={handleRemove}>Remove</button>
                        </div>

                        <button
                            onClick={handleContinue}
                            disabled={isUploading}
                            className={`text-white text-xl font-bold py-4 px-12 rounded-xl transition-all ${isUploading ? 'bg-[#5a189a]' : 'bg-[#7b35de] hover:bg-[#8e4aef]'}`}
                        >
                            {isUploading ? 'Uploading...' : 'Continue'}
                        </button>

                    </div>
                )}

                {error && <div className="text-red-400 mt-4">{error}</div>}
            </div>
        </div>
    );
};

export default UploadDataset;