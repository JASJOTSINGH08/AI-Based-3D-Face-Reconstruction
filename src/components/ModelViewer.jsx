import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const API_URL = "https://f790-34-148-76-25.ngrok-free.app/download"; // Replace with actual API

const Model = ({ modelUrl, color, brightness }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (modelUrl) {
      const loader = new OBJLoader();
      loader.load(
        modelUrl,
        (obj) => {
          obj.traverse((child) => {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(color),
                emissive: new THREE.Color(color).multiplyScalar(brightness - 1),
              });
            }
          });
          setModel(obj);
        },
        undefined,
        (error) => console.error("Error loading model:", error)
      );
    }
  }, [modelUrl, color, brightness]);

  return model ? <primitive object={model} scale={1.5} /> : null;
};

const ModelViewer = () => {
  const [modelFile, setModelFile] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [brightness, setBrightness] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch the model");

      const blob = await response.blob();
      const file = new File([blob], "downloaded_model.obj", { type: "model/obj" });
      const fileUrl = URL.createObjectURL(blob);

      // ✅ Create download link & trigger download
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // ✅ Save the downloaded URL & set for viewing
      setDownloadUrl(fileUrl);
      setModelUrl(fileUrl);
      setModelFile(file);

      // ✅ Free memory after use
      setTimeout(() => URL.revokeObjectURL(fileUrl), 5000);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* 3D Model Viewer */}
      {modelUrl ? (
        <Canvas camera={{ position: [0, 0, 3] }} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5 * brightness} />
          <directionalLight position={[2, 2, 2]} intensity={1 * brightness} />
          <Model modelUrl={modelUrl} color={color} brightness={brightness} />
          <OrbitControls />
          <Environment preset="sunset" />
        </Canvas>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Download or select a model to view.</p>
      )}

      {/* Fixed Download Button (First) */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          style={{
            padding: "10px 20px",
            background: isDownloading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isDownloading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {isDownloading ? "Downloading..." : "⬇ Download 3D Model"}
        </button>
      </div>

      {/* File Upload (After Download) */}
      {downloadUrl && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <input
            type="file"
            accept=".obj"
            onChange={(event) => {
              if (event.target.files.length > 0) {
                const file = event.target.files[0];
                const url = URL.createObjectURL(file);
                setModelFile(file);
                setModelUrl(url);
              }
            }}
            style={{
              padding: "10px",
              background: "#007bff",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        </div>
      )}

      {/* Editing Controls */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        <h3>Editing Tools</h3>
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Brightness:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default ModelViewer;