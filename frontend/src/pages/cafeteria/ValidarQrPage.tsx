import React, { useState } from 'react';
import api from '../../services/api';
import { QrScanner } from '../../components/QrScanner';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Camera, Search, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

interface ScanValidationResponse {
  valid: boolean;
  status: 'VALID' | 'USED' | 'INVALID' | 'EXPIRED' | 'WRONG_DATE' | 'CANCELLED' | 'DELIVERY_SUCCESS';
  message: string;
  reservationId?: number | string;
  employeeName?: string;
  reservationCode?: string;
  menuItemName?: string;
  usedAt?: string;
  usedBy?: string;
}

export default function ValidarQrPage() {
  const [scanResult, setScanResult] = useState<ScanValidationResponse | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirming, setConfirming] = useState<boolean>(false);
  const [manualCode, setManualCode] = useState<string>('');

  const handleScan = async (codeOrToken: string) => {
    if (!codeOrToken || loading) return;
    try {
      setLoading(true);
      const res = await api.post('/qr/validate', { token: codeOrToken });
      setScanResult(res.data);
      setShowModal(true);
    } catch (err: any) {
      const errorData = err.response?.data;
      setScanResult({
        valid: false,
        status: errorData?.status || 'INVALID',
        message: errorData?.message || 'Código QR no reconocido o inválido.',
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScan(manualCode.trim());
      setManualCode('');
    }
  };

  const handleConfirmDelivery = async () => {
    if (!scanResult || !scanResult.reservationId) {
      setShowModal(false);
      return;
    }
    try {
      setConfirming(true);
      await api.post('/deliveries', {
        reservationId: scanResult.reservationId,
      });
      // Set SUCCESS state for current flow (DO NOT SET TO USED ERROR)
      setScanResult({
        ...scanResult,
        status: 'DELIVERY_SUCCESS',
        valid: true,
        message: '¡Entrega de almuerzo confirmada y registrada en el sistema!',
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al confirmar entrega.');
    } finally {
      setConfirming(false);
    }
  };

  const renderResultModalContent = () => {
    if (!scanResult) return null;

    // 1. CONFIRMED DELIVERY SUCCESS (Current Transaction Completed)
    if (scanResult.status === 'DELIVERY_SUCCESS') {
      return (
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <div className="p-4 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-200 animate-bounce">
            <CheckCircle2 size={56} />
          </div>
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase flex items-center gap-1 w-fit mx-auto">
              <Sparkles size={14} /> ¡ENTREGA REALIZADA CON ÉXITO!
            </span>
            <h2 className="text-xl font-extrabold text-gray-900 mt-2">{scanResult.employeeName || 'Empleado Corporativo'}</h2>
            <p className="text-xs font-mono text-gray-500 mt-0.5">{scanResult.reservationCode || 'LP-2026-000001'}</p>
          </div>

          <div className="w-full bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left space-y-1">
            <p className="text-[11px] text-emerald-800 font-bold uppercase">Plato Entregado:</p>
            <p className="text-sm font-bold text-gray-900">{scanResult.menuItemName || 'Almuerzo Ejecutivo'}</p>
            <p className="text-[11px] text-emerald-700 mt-1">✓ Registro guardado correctamente en la base de datos.</p>
          </div>

          <button
            onClick={() => {
              setShowModal(false);
              setScanResult(null);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <span>Siguiente Escaneo / Continuar</span>
            <ArrowRight size={18} />
          </button>
        </div>
      );
    }

    // 2. VALID RESERVATION (Ready for Delivery)
    if (scanResult.valid && scanResult.status === 'VALID') {
      return (
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <CheckCircle2 size={56} />
          </div>
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              🔵 RESERVA VÁLIDA
            </span>
            <h2 className="text-xl font-extrabold text-gray-900 mt-2">{scanResult.employeeName || 'Empleado Corporativo'}</h2>
            <p className="text-xs font-mono text-gray-500 mt-0.5">{scanResult.reservationCode || 'LP-2026-X8F92A'}</p>
          </div>

          <div className="w-full bg-blue-50/70 p-4 rounded-2xl border border-blue-100 text-left space-y-1">
            <p className="text-xs text-blue-800 font-bold uppercase">Plato Reservado:</p>
            <p className="text-sm font-bold text-gray-900">{scanResult.menuItemName || 'Menú Especial de Hoy'}</p>
          </div>

          <button
            disabled={confirming}
            onClick={handleConfirmDelivery}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-base transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95"
          >
            {confirming ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <UserCheck size={22} />
                <span>CONFIRMAR ENTREGA DE ALMUERZO</span>
              </>
            )}
          </button>
        </div>
      );
    }

    // 3. QR ALREADY USED BEFORE (Second Scan Warning)
    if (scanResult.status === 'USED') {
      return (
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <div className="p-4 bg-red-100 text-red-600 rounded-full">
            <XCircle size={56} />
          </div>
          <div>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              🔴 CÓDIGO QR YA UTILIZADO
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-2">Este almuerzo ya fue entregado previamente</h2>
            <p className="text-xs text-red-600 mt-1">
              {scanResult.message || 'No es posible realizar una segunda entrega sobre el mismo ticket.'}
            </p>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-2xl text-sm"
          >
            Cerrar
          </button>
        </div>
      );
    }

    // 4. CANCELLED OR INVALID
    return (
      <div className="flex flex-col items-center text-center p-4 space-y-4">
        <div className="p-4 bg-amber-100 text-amber-600 rounded-full">
          <AlertTriangle size={56} />
        </div>
        <div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            🔴 RECHAZADO: {scanResult.status}
          </span>
          <p className="text-sm font-semibold text-gray-800 mt-2">{scanResult.message}</p>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-2xl text-sm"
        >
          Cerrar
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-12">
      {/* Card Scanner */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-blue-600 font-bold text-lg">
          <Camera size={22} />
          <h1>Escáner QR Comedor</h1>
        </div>
        <p className="text-xs text-gray-500">
          Enfoca la cámara del celular hacia el código QR impreso o en la pantalla del empleado.
        </p>

        {loading ? (
          <div className="flex flex-col items-center p-8 space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-xs font-semibold text-gray-500">Validando en base de datos...</span>
          </div>
        ) : (
          <QrScanner onScan={handleScan} />
        )}
      </div>

      {/* Manual Input Fallback */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3">
        <h3 className="font-bold text-gray-900 text-xs uppercase flex items-center gap-2">
          <Search size={16} className="text-blue-600" />
          <span>Ingreso Manual de Código QR</span>
        </h3>
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ej. LP-2026-000001 o Token LP"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-blue-200"
          >
            Validar
          </button>
        </form>
      </div>

      {/* Validation Result Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Verificación de Almuerzo">
        {renderResultModalContent()}
      </Modal>
    </div>
  );
}
