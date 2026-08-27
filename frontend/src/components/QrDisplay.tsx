import React from 'react';
import { Badge } from './Badge';

interface QrDisplayProps {
  code: string;
  date: string;
  status: any;
  menuSummary: string;
}

export const QrDisplay: React.FC<QrDisplayProps> = ({ code, date, status, menuSummary }) => {
  // Using a simple API to generate QR code image for the demo
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${code}`;

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Tu Código de Almuerzo</h3>
      <Badge status={status} className="mb-6 text-sm" />
      
      <div className="bg-white p-2 border-2 border-gray-100 rounded-lg shadow-sm mb-4">
        <img src={qrUrl} alt={`QR Code ${code}`} className="w-48 h-48 object-contain" />
      </div>
      
      <p className="font-mono text-xl tracking-wider text-gray-800 font-bold mb-4">{code}</p>
      
      <div className="w-full text-center text-sm text-gray-500 border-t pt-4">
        <p><strong>Fecha:</strong> {date}</p>
        <p className="mt-1">{menuSummary}</p>
      </div>
    </div>
  );
};
