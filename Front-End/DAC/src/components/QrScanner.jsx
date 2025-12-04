import { BrowserQRCodeReader, NotFoundException } from '@zxing/browser';
import { useEffect, useRef, useState } from 'react';

export default function QrScanner({ onResult }) {
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    // Start the video decoding
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        onResult(result.getText());
      } else if (err && !(err instanceof NotFoundException)) {
        // Handle other errors
        setError("Scanning error: " + err.message);
      }
    });

    return () => {
      // Stop the video decoding and release the camera
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
      {error && <p>{error}</p>}
    </div>
  );
}
