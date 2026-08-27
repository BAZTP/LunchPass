import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Reservation } from '../../types';
import { Badge } from '../../components/Badge';
import { QrDisplay } from '../../components/QrDisplay';
import { Modal } from '../../components/Modal';
import { Calendar, QrCode, XCircle, Search, Utensils, CheckCircle } from 'lucide-react';

export default function MisReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancellingId, setCancellingId] = useState<string | number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reservations');
      setReservations(res.data || []);
    } catch (err) {
      console.error('Error al obtener reservas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string | number) => {
    if (!window.confirm('¿Estás seguro de cancelar esta reserva de almuerzo?')) return;
    try {
      setCancellingId(id);
      setMessage(null);
      await api.delete(`/reservations/${id}`);
      setMessage('Reserva cancelada exitosamente.');
      fetchReservations();
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error al cancelar la reserva.');
    } finally {
      setCancellingId(null);
    }
  };

  const filteredReservations = reservations.filter((r) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'ACTIVE') return r.status === 'CONFIRMED' || r.status === 'PENDING';
    if (filterStatus === 'DELIVERED') return r.status === 'DELIVERED' || r.status === 'USED';
    if (filterStatus === 'CANCELLED') return r.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Reservas de Almuerzo</h1>
          <p className="text-sm text-gray-500 mt-1">Consulta tu historial de reservaciones, códigos QR y estados de entrega.</p>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-blue-50 text-blue-900 border border-blue-200 rounded-2xl text-xs font-medium flex items-center gap-2">
          <CheckCircle size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'ALL', label: 'Todas' },
          { key: 'ACTIVE', label: 'Activas / Confirmadas' },
          { key: 'DELIVERED', label: 'Entregadas' },
          { key: 'CANCELLED', label: 'Canceladas' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 rounded-2xl font-semibold text-xs transition-all ${
              filterStatus === tab.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table List */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <Utensils size={44} className="mx-auto text-gray-300 mb-3" />
          <h3 className="font-bold text-gray-700 text-base">No tienes reservas registradas en este filtro</h3>
          <p className="text-xs text-gray-500 mt-1">Explora la sección de Menú para hacer tu reservación diaria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase">
                  <th className="py-4 px-5">Fecha</th>
                  <th className="py-4 px-5">Código Reserva</th>
                  <th className="py-4 px-5">Plato / Menú</th>
                  <th className="py-4 px-5">Estado</th>
                  <th className="py-4 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar size={14} className="text-blue-600" />
                      <span>{r.date}</span>
                    </td>
                    <td className="py-4 px-5 font-mono text-gray-700 font-bold">
                      {r.code || `LP-2026-000${r.id}`}
                    </td>
                    <td className="py-4 px-5 text-gray-800 font-medium max-w-xs truncate">
                      {r.menuItem?.name || 'Almuerzo Ejecutivo'}
                    </td>
                    <td className="py-4 px-5">
                      <Badge status={r.status} />
                    </td>
                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedReservation(r);
                          setShowQrModal(true);
                        }}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1"
                      >
                        <QrCode size={14} />
                        <span>Ver QR</span>
                      </button>

                      {r.status === 'CONFIRMED' && (
                        <button
                          disabled={cancellingId === r.id}
                          onClick={() => handleCancel(r.id)}
                          className="bg-red-50 text-red-700 hover:bg-red-100 font-semibold px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1"
                        >
                          <XCircle size={14} />
                          <span>Cancelar</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QR Modal Popup */}
      <Modal isOpen={showQrModal} onClose={() => setShowQrModal(false)} title="Código QR de Reserva">
        {selectedReservation && (
          <QrDisplay
            code={selectedReservation.code || `LP-2026-000${selectedReservation.id}`}
            date={selectedReservation.date}
            status={selectedReservation.status === 'DELIVERED' || selectedReservation.status === 'USED' ? 'USED' : selectedReservation.status}
            menuSummary={selectedReservation.menuItem?.name || 'Almuerzo Ejecutivo'}
          />
        )}
      </Modal>
    </div>
  );
}
