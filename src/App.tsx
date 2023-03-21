import React, { useState } from "react";
import "./App.css";
import { generateTemplate } from "./template";

function App() {
  const [slug, setSlug] = useState("");
  const [script, setScript] = useState("");

  const handleScript = () => {
    const scriptTxt = generateTemplate(slug, script);
    const jsFile = new Blob([scriptTxt], { type: "application/javascript" });
    const downloadUrl = window.URL.createObjectURL(jsFile);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "custom-widget.js";
    a.click();

    // window.open(downloadUrl, "_blank");
  };

  return (
    <div className="App">
      <div className="form-group">
        <img src="https://www.happeo.com/hubfs/Universe%20July%202018/modules/happeo-logo-svg-white.svg" />
        <div className="wrapper">
          <label>Enter the app slug : </label>
          <input
            type="text"
            placeholder="Slug"
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="wrapper">
          <label>Enter embed script: </label>
          <textarea
            placeholder="Script"
            onChange={(e) => setScript(e.target.value)}
            rows={20}
          />
        </div>
        <div className="wrapper">
          <button onClick={handleScript}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
