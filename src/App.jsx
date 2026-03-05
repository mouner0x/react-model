import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UploadDataset from './pages/UploadDataset';
import UploadReview from './pages/UploadReview';
import Train from './pages/Train';
import Training from './pages/Training';
import ModelsList from './pages/ModelsList';
import Predict from './pages/Predict';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                {/* Models List & Predict (Protected) */}
                <Route
                    path="/models"
                    element={
                        <ProtectedRoute>
                            <ModelsList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/predict/:modelId"
                    element={
                        <ProtectedRoute>
                            <Predict />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Temporary Routes for Dashboard Buttons */}
                <Route path="/upload" element={<ProtectedRoute><UploadDataset /></ProtectedRoute>} />
                <Route path="/upload/review" element={<ProtectedRoute><UploadReview /></ProtectedRoute>} />
                <Route path="/train" element={<ProtectedRoute><Train /></ProtectedRoute>} />
                <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
