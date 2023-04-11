import React, { useState } from "react";
import "./App.css";
import { generateIframeTemplate } from "./templat-iframe";
import { generateTemplate } from "./template";

function App() {
  const [slug, setSlug] = useState("");
  const [script, setScript] = useState("");
  const [shouldUseIframe, setShouldUseIframe] = useState(false);

  const handleScript = () => {
    const scriptTxt = shouldUseIframe
      ? generateIframeTemplate(slug, script)
      : generateTemplate(slug, script);
    const jsFile = new Blob([scriptTxt], { type: "application/javascript" });
    console.log("🚀 ~ file: App.tsx:16 ~ handleScript ~ scriptTxt:", scriptTxt)
    const downloadUrl = window.URL.createObjectURL(jsFile);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "custom-widget.js";
    a.click();
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
          <label>Injects a script tag: </label>
          <input
            type="checkbox"
            onChange={(e) => setShouldUseIframe(e.target.checked)}
          ></input>
        </div>
        <div className="wrapper">
          <button onClick={handleScript}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
