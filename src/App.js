import React, { useState } from "react";
import Layout from "./components/Layout";
import FileUpload from "./components/FileUpload";
import ModelViewer from "./components/ModelViewer";
import "./App.css";

function App() {
  const [modelUrl, setModelUrl] = useState(null);

  return (
    <Layout>
      {!modelUrl ? (
        <FileUpload setModelUrl={setModelUrl} />
      ) : (
        <ModelViewer modelUrl={modelUrl} setModelUrl={setModelUrl} />
      )}
    </Layout>
  );
}

export default App;
