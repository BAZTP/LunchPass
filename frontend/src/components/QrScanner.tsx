import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useToast } from '../context/ToastContext';

interface QrScannerProps {
  onScan: (code: string) => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const [manualCode, setManualCode] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        // play beep
        const audio = new Audio('/beep.mp3');
        audio.play().catch(() => {});
        onScan(decodedText);
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScan]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode('');
    } else {
      addToast('Ingrese un código válido', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div id="qr-reader" className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-gray-200"></div>
      <div className="mt-4">
        <p className="text-center text-sm text-gray-500 mb-2">O ingrese el código manualmente</p>
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value.toUpperCase())}
            placeholder="LP-2026-XXXXXX"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Validar
          </button>
        </form>
      </div>
    </div>
  );
};
