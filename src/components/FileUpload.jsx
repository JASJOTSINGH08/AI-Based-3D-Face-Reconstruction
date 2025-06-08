import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ setModelUrl }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const API_URL = "https://f790-34-148-76-25.ngrok-free.app";

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first!");
            return;
        }

        setLoading(true);
        setError(null);
        setProgress(0);
        
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                }
            });

            if (response.data.obj_file) {
                setModelUrl(`${API_URL}${response.data.obj_file}`);
                setProgress(100);
            } else {
                setError("Error processing file. Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setError("Upload failed. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2 className="upload-title">Upload 3D Model</h2>
                <p className="upload-description">
                    Upload an image to convert it to a 3D model. Supported formats: JPG, PNG, WEBP.
                </p>
                
                <div className="file-input-container">
                    <input 
                        type="file" 
                        id="file-upload" 
                        className="file-input" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                    <label htmlFor="file-upload" className="file-label">
                        <div className="file-icon">
                            <span className="plus">+</span>
                        </div>
                        <span>{file ? file.name : "Choose a file"}</span>
                    </label>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                {loading && (
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        <span className="progress-text">{progress}% Complete</span>
                    </div>
                )}
                
                <button 
                    className="upload-button" 
                    onClick={handleUpload} 
                    disabled={loading || !file}
                >
                    {loading ? "Processing..." : "Upload and Convert"}
                </button>
            </div>
        </div>
    );
};

export default FileUpload;