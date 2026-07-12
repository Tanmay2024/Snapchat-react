import { useEffect, useRef, useState } from "react";
import { FaBolt, FaCamera, FaRedo, FaSyncAlt } from "react-icons/fa";
import "./Camera.css";

function Camera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState("");
  const [facingMode, setFacingMode] = useState("user");
  const [flash, setFlash] = useState(false);
  const [filter, setFilter] = useState("Natural");

  useEffect(() => () => stream?.getTracks().forEach((track) => track.stop()), [stream]);

  const startCamera = async () => {
    try {
      stream?.getTracks().forEach((track) => track.stop());
      const nextStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: false });
      videoRef.current.srcObject = nextStream;
      setStream(nextStream);
      setCaptured("");
    } catch {
      alert("Camera permission is unavailable. Please allow camera access and try again.");
    }
  };

  const capture = () => {
    if (!videoRef.current?.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setCaptured(canvas.toDataURL("image/jpeg"));
  };

  const flipCamera = () => {
    setFacingMode((mode) => mode === "user" ? "environment" : "user");
    if (stream) setTimeout(startCamera, 0);
  };

  return <main className="cameraPage"><section className="cameraTop"><div><p>CREATE A SNAP</p><h1>Camera</h1></div><button onClick={startCamera}><FaCamera /> {stream ? "Restart Camera" : "Enable Camera"}</button></section><section className="cameraPreview">{captured ? <img src={captured} alt="Captured snap" /> : <video ref={videoRef} autoPlay playsInline />}{!stream && !captured && <div className="cameraPlaceholder"><FaCamera /><h2>Frame your moment</h2><span>Enable your browser camera to start creating.</span></div>}<div className="cameraTools"><button onClick={() => setFlash(!flash)} className={flash ? "selected" : ""} aria-label="Flash"><FaBolt /></button><button onClick={flipCamera} aria-label="Flip camera"><FaSyncAlt /></button></div><div className="cameraFilters">{["Natural","Warm","Vivid"].map((name)=><button key={name} className={filter===name?"active":""} onClick={()=>setFilter(name)}>{name}</button>)}</div><button className="captureButton" onClick={captured ? () => setCaptured("") : capture} disabled={!stream}>{captured ? <FaRedo /> : <span />}</button></section><p className="cameraHint">{captured ? "Snap captured locally. Tap the capture button to take another." : `${filter} filter selected. Flash and filters are visual controls for this frontend demo.`}</p></main>;
}

export default Camera;
