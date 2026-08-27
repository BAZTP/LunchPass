import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Reservation } from '../../types';
import { Badge } from '../../components/Badge';
import { QrDisplay } from '../../components/QrDisplay';
import { Modal } from '../../components/Modal';
import { Calendar, QrCode, Search, Filter, Plus, CheckCircle, XCircle } from 'lucide-react';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [manualForm, setManualForm] = useState({
    employeeName: 'John Doe',
    date: new Date().toISOString().split('T')[0],
    item: 'Pollo a la Plancha',
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reservations');
      setReservations(res.data || []);
    } catch (err) {
      console.error('Error al cargar reservas globales:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock administrative manual reservation creation
      const mockRes: Reservation = {
        id: Date.now(),
        code: `LP-2026-ADM${Math.floor(1000 + Math.random() * 9000)}`,
        date: manualForm.date,
        status: 'CONFIRMED',
        menuItem: { id: '1', name: manualForm.item },
      };
      setReservations([mockRes, ...reservations]);
      setIsManualModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = reservations.filter((r) =>
    `${r.code} ${r.date} ${r.status} ${r.menuItem?.name || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Reservas Globales</h1>
          <p className="text-sm text-gray-500 mt-1">Supervisión administrativa de tickets de almuerzo e impresiones QR.</p>
        </div>
        <button
          onClick={() => setIsManualModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Reserva Manual Admin</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por código de reserva, fecha o plato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-none focus:outline-none text-xs text-gray-800"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase">
                <th className="py-4 px-5">Código</th>
                <th className="py-4 px-5">Fecha</th>
                <th className="py-4 px-5">Plato / Menú</th>
                <th className="py-4 px-5">Estado</th>
                <th className="py-4 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="py-4 px-5 font-mono font-bold text-blue-600">{r.code || `LP-2026-00${r.id}`}</td>
                  <td className="py-4 px-5 font-medium text-gray-900">{r.date}</td>
                  <td className="py-4 px-5 text-gray-700">{r.menuItem?.name || 'Almuerzo Ejecutivo'}</td>
                  <td className="py-4 px-5">
                    <Badge status={r.status} />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedReservation(r);
                        setShowQrModal(true);
                      }}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1"
                    >
                      <QrCode size={14} />
                      <span>Reimprimir QR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Manual */}
      {isManualModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Crear Reserva Manual (Admin)</h2>
            <form onSubmit={handleManualCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Empleado</label>
                <input
                  type="text"
                  required
                  value={manualForm.employeeName}
                  onChange={(e) => setManualForm({ ...manualForm, employeeName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={manualForm.date}
                  onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Plato / Menú</label>
                <input
                  type="text"
                  required
                  value={manualForm.item}
                  onChange={(e) => setManualForm({ ...manualForm, item: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs"
                >
                  Generar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal Popup */}
      <Modal isOpen={showQrModal} onClose={() => setShowQrModal(false)} title="Reimpresión de Código QR">
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
